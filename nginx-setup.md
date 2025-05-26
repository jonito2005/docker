# Panduan Migrasi dari Apache ke Nginx untuk Docker Project

## 1. Menghentikan dan Menonaktifkan Apache

```bash
# Hentikan layanan Apache
sudo systemctl stop apache2

# Nonaktifkan Apache agar tidak berjalan saat startup
sudo systemctl disable apache2

# Pastikan Apache sudah berhenti
sudo systemctl status apache2
```

## 2. Instalasi Nginx

```bash
# Update repository package
sudo apt update

# Install Nginx
sudo apt install nginx -y

# Mulai layanan Nginx
sudo systemctl start nginx

# Aktifkan Nginx agar berjalan saat startup
sudo systemctl enable nginx

# Periksa status Nginx
sudo systemctl status nginx
```

## 3. Konfigurasi Firewall (jika digunakan)

```bash
# Izinkan HTTP traffic (port 80)
sudo ufw allow 'Nginx HTTP'

# Izinkan HTTPS traffic jika diperlukan (port 443)
sudo ufw allow 'Nginx HTTPS'

# Periksa status firewall
sudo ufw status
```

## 4. Konfigurasi Virtual Host untuk Docker Project

1. Buat file konfigurasi untuk project.localhost:

```bash
sudo nano /etc/nginx/sites-available/project.localhost
```

2. Tambahkan konfigurasi berikut:

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

    # Logging
    access_log /var/log/nginx/project.localhost.access.log;
    error_log /var/log/nginx/project.localhost.error.log;
}
```

3. Aktifkan konfigurasi dengan membuat symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/project.localhost /etc/nginx/sites-enabled/
```

4. Periksa konfigurasi Nginx untuk memastikan tidak ada kesalahan sintaks:

```bash
sudo nginx -t
```

5. Muat ulang Nginx untuk menerapkan konfigurasi baru:

```bash
sudo systemctl reload nginx
```

## 5. Konfigurasi DNS Lokal dengan dnsmasq

1. Install dnsmasq jika belum terpasang:

```bash
sudo apt install dnsmasq -y
```

2. Konfigurasi dnsmasq untuk domain lokal:

```bash
sudo nano /etc/dnsmasq.conf
```

3. Tambahkan baris berikut (ganti dengan IP server Anda):

```
address=/project.localhost/192.168.100.10
```

4. Restart dnsmasq:

```bash
sudo systemctl restart dnsmasq
```

## 6. Menjalankan Docker Container

Pastikan Docker container berjalan dengan port yang benar:

```bash
# Jalankan container dengan docker-compose
cd /path/to/your/project
docker-compose up -d app-prod
```

## 7. Pengujian

1. Dari mesin lokal, pastikan Anda menggunakan server DNS yang benar (IP server Anda)
2. Buka browser dan akses http://project.localhost
3. Pastikan aplikasi JavaScript Anda berjalan dengan baik

## 8. Troubleshooting

### Jika halaman tidak dapat diakses:

1. Periksa status Nginx:
   ```bash
   sudo systemctl status nginx
   ```

2. Periksa log Nginx:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/project.localhost.error.log
   ```

3. Periksa status container Docker:
   ```bash
   docker ps
   docker logs <container_id>
   ```

4. Pastikan port tidak diblokir:
   ```bash
   sudo netstat -tulpn | grep nginx
   sudo lsof -i :80
   ```

5. Periksa resolusi DNS:
   ```bash
   dig project.localhost @192.168.100.10
   ```
