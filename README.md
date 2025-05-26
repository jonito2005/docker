# Panduan Deployment Aplikasi JavaScript dengan Docker dan NGINX

## Daftar Isi
1. [Pengantar](#pengantar)
2. [Prasyarat](#prasyarat)
3. [Instalasi Docker Secara Offline](#instalasi-docker-secara-offline)
4. [Persiapan Aplikasi](#persiapan-aplikasi)
5. [Konfigurasi Docker](#konfigurasi-docker)
6. [Menjalankan Container](#menjalankan-container)
7. [Konfigurasi NGINX sebagai Reverse Proxy](#konfigurasi-nginx-sebagai-reverse-proxy)
8. [Konfigurasi DNS Resolver Lokal](#konfigurasi-dns-resolver-lokal)
9. [Backup Volume Docker](#backup-volume-docker)
10. [Troubleshooting](#troubleshooting)

## Pengantar

Panduan ini menjelaskan langkah-langkah untuk melakukan deployment aplikasi JavaScript modern (React.js, Next.js, atau Express.js) menggunakan Docker dengan NGINX sebagai reverse proxy pada server Ubuntu Proxmox. Panduan ini dirancang untuk lingkungan offline.

## Prasyarat

- Server Ubuntu (terpasang di Proxmox)
- Akses administratif (sudo) ke server
- Paket instalasi Docker yang sudah diunduh
- Aplikasi JavaScript yang sudah siap di-deploy

## Instalasi Docker Secara Offline

1. Unduh paket-paket berikut pada komputer yang terhubung internet:
   - `docker-ce`
   - `docker-ce-cli`
   - `containerd.io`
   - `docker-buildx-plugin`
   - `docker-compose-plugin`

   Anda dapat mengunduhnya dari [situs resmi Docker](https://download.docker.com/linux/ubuntu/dists/).

2. Transfer file-file `.deb` ke server Ubuntu offline menggunakan USB atau metode transfer file lainnya.

3. Instal paket-paket Docker:
   ```bash
   sudo dpkg -i docker-ce*.deb
   sudo dpkg -i docker-ce-cli*.deb
   sudo dpkg -i containerd.io*.deb
   sudo dpkg -i docker-buildx-plugin*.deb
   sudo dpkg -i docker-compose-plugin*.deb
   ```

4. Mulai dan aktifkan layanan Docker:
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

5. Verifikasi instalasi Docker:
   ```bash
   sudo docker --version
   sudo docker compose version
   ```

## Persiapan Aplikasi

1. Siapkan aplikasi JavaScript Anda di server.
   ```bash
   # Contoh untuk clone repository (jika menggunakan Git)
   git clone https://github.com/username/react-app.git
   cd react-app
   ```

2. Pastikan struktur aplikasi Anda sudah sesuai dan aplikasi dapat dijalankan secara lokal.

## Konfigurasi Docker

### Dockerfile

Buat `Dockerfile` di direktori root aplikasi Anda:

```dockerfile
# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

Buat file `docker-compose.yml` di direktori root aplikasi Anda:

```yaml
version: '3.8'

services:
  # Development environment
  app-dev:
    build:
      context: .
      target: build
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
    stdin_open: true
    tty: true

  # Production environment
  app-prod:
    build:
      context: .
    ports:
      - "4000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## Menjalankan Container

1. Build dan jalankan container dalam mode production:
   ```bash
   sudo docker compose up app-prod -d
   ```

2. Periksa status container:
   ```bash
   sudo docker ps
   ```

3. Periksa logs container jika diperlukan:
   ```bash
   sudo docker logs <container_id>
   ```

## Konfigurasi NGINX sebagai Reverse Proxy

1. Instal NGINX:
   ```bash
   sudo apt-get update
   sudo apt-get install nginx
   ```

2. Buat file konfigurasi virtual host:
   ```bash
   sudo nano /etc/nginx/sites-available/project.localhost
   ```

3. Tambahkan konfigurasi berikut:
   ```nginx
   server {
       listen 80;
       server_name project.localhost;

       location / {
           proxy_pass http://localhost:4000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. Buat symbolic link ke direktori sites-enabled:
   ```bash
   sudo ln -s /etc/nginx/sites-available/project.localhost /etc/nginx/sites-enabled/
   ```

5. Periksa konfigurasi NGINX:
   ```bash
   sudo nginx -t
   ```

6. Mulai ulang NGINX:
   ```bash
   sudo systemctl restart nginx
   ```

## Konfigurasi DNS Resolver Lokal

1. Instal dnsmasq:
   ```bash
   sudo apt-get install dnsmasq
   ```

2. Konfigurasi dnsmasq untuk mengarahkan domain lokal:
   ```bash
   sudo nano /etc/dnsmasq.conf
   ```

3. Tambahkan baris berikut (ganti IP dengan IP server Anda):
   ```
   address=/project.localhost/192.168.100.10
   ```

4. Mulai ulang dnsmasq:
   ```bash
   sudo systemctl restart dnsmasq
   ```

5. Konfigurasi resolver pada client:
   - Untuk Linux/Mac: Edit `/etc/resolv.conf` dan tambahkan `nameserver 192.168.100.10` (IP server)
   - Untuk Windows: Atur DNS server di Network Adapter ke IP server

## Backup Volume Docker

1. Identifikasi volume yang ingin di-backup:
   ```bash
   sudo docker volume ls
   ```

2. Buat backup volume:
   ```bash
   sudo docker run --rm -v <volume_name>:/source -v $(pwd):/backup alpine tar -czf /backup/<nama_backup>.tar.gz -C /source .
   ```

3. Restore volume dari backup:
   ```bash
   sudo docker run --rm -v <volume_name>:/target -v $(pwd):/backup alpine sh -c "cd /target && tar -xzf /backup/<nama_backup>.tar.gz"
   ```

## Troubleshooting

### Menggunakan IP Publik

Secara default, Docker mengikat port ke alamat `0.0.0.0` (semua antarmuka jaringan), tetapi kadang-kadang ini tidak cukup untuk mengekspos layanan ke IP publik. Berikut cara mengatasinya:

1. Menggunakan format binding IP eksplisit di `docker-compose.yml`:
   ```yaml
   ports:
     - "0.0.0.0:4000:80"  # Bind ke semua antarmuka jaringan termasuk publik
   ```

2. Jika menggunakan server di belakang NAT (seperti di AWS, Digital Ocean, dll), pastikan:
   - Grup keamanan/firewall mengizinkan traffic pada port yang digunakan (4000)
   - IP elastis/publik ditetapkan ke instance server

3. Jika menggunakan Docker dalam VM (seperti Proxmox):
   ```bash
   # Periksa konfigurasi jaringan Docker
   sudo docker network inspect bridge
   
   # Konfigurasikan default-address-pools di /etc/docker/daemon.json
   sudo nano /etc/docker/daemon.json
   ```
   
   Tambahkan konfigurasi berikut:
   ```json
   {
     "default-address-pools": [
       {"base":"192.168.0.0/16", "size":24}
     ]
   }
   ```
   
   Restart Docker:
   ```bash
   sudo systemctl restart docker
   ```

### Masalah Port

Jika terjadi konflik port, ubah port mapping di `docker-compose.yml`:
```yaml
ports:
  - "4001:80"  # Ubah dari 4000:80 menjadi port lain
```

### Masalah Permission

Jika terjadi masalah permission pada volume Docker:
```bash
sudo chown -R 1000:1000 <direktori_aplikasi>
```

### Melihat Logs

Untuk melihat logs container:
```bash
sudo docker logs <container_id>
```

---

© 2025 React Docker Deployment Guide
