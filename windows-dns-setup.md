# Panduan Konfigurasi DNS di Windows untuk Akses Domain Lokal

## Metode 1: Mengubah DNS Server pada Adapter Jaringan

1. **Buka Network Connections**
   - Tekan `Win + X` dan pilih "Network Connections"
   - Atau buka Control Panel > Network and Internet > Network Connections

2. **Pilih Adapter Jaringan**
   - Klik kanan pada adapter jaringan yang Anda gunakan (Wi-Fi atau Ethernet)
   - Pilih "Properties"

3. **Konfigurasi TCP/IPv4**
   - Dalam daftar item, cari "Internet Protocol Version 4 (TCP/IPv4)"
   - Pilih item tersebut dan klik "Properties"

4. **Atur DNS Server**
   - Pilih "Use the following DNS server addresses"
   - Masukkan alamat IP server Ubuntu Anda sebagai "Preferred DNS server" (misalnya 192.168.100.10)
   - Anda bisa menggunakan DNS Google (8.8.8.8) sebagai "Alternate DNS server"
   - Klik "OK" untuk menyimpan perubahan

   ![Konfigurasi DNS Windows](https://i.imgur.com/example.png)

5. **Bersihkan DNS Cache**
   - Buka Command Prompt sebagai Administrator
   - Ketik perintah: `ipconfig /flushdns`
   - Tekan Enter

## Metode 2: Menggunakan File Hosts (Alternatif)

Jika metode di atas tidak berfungsi, Anda dapat menggunakan file hosts:

1. **Buka Notepad sebagai Administrator**
   - Cari "Notepad" di menu Start
   - Klik kanan dan pilih "Run as administrator"

2. **Buka File Hosts**
   - Pilih File > Open
   - Navigasi ke `C:\Windows\System32\drivers\etc\`
   - Ubah filter file dari "Text Documents (*.txt)" menjadi "All Files (*.*)"
   - Pilih file "hosts" dan klik "Open"

3. **Edit File Hosts**
   - Tambahkan baris berikut di bagian bawah file (ganti IP dengan IP server Ubuntu Anda):
     ```
     192.168.100.10    project.localhost
     ```
   - Simpan file dengan Ctrl+S

4. **Bersihkan DNS Cache**
   - Buka Command Prompt sebagai Administrator
   - Ketik perintah: `ipconfig /flushdns`
   - Tekan Enter

## Metode 3: Menggunakan Aplikasi Dnsmasq untuk Windows

Untuk solusi yang lebih mirip dengan dnsmasq di Linux:

1. **Instal Acrylic DNS Proxy**
   - Unduh dari [situs resmi Acrylic](https://mayakron.altervista.org/support/acrylic/Home.htm)
   - Instal aplikasi dengan mengikuti panduan instalasi

2. **Konfigurasi Acrylic**
   - Buka file konfigurasi Acrylic (biasanya di `C:\Program Files\Acrylic DNS Proxy\AcrylicHosts.txt`)
   - Tambahkan baris berikut:
     ```
     192.168.100.10 project.localhost
     ```
   - Simpan file

3. **Atur Adapter Jaringan untuk Menggunakan Acrylic**
   - Ikuti langkah 1-3 dari Metode 1
   - Atur "Preferred DNS server" ke 127.0.0.1
   - Klik "OK" untuk menyimpan perubahan

4. **Restart Layanan Acrylic**
   - Buka Services (tekan `Win + R`, ketik `services.msc`, tekan Enter)
   - Cari "Acrylic DNS Proxy"
   - Klik kanan dan pilih "Restart"

## Verifikasi Konfigurasi

Untuk memverifikasi bahwa konfigurasi DNS berfungsi:

1. **Buka Command Prompt**
   - Tekan `Win + R`, ketik `cmd`, tekan Enter

2. **Uji dengan Ping**
   - Ketik: `ping project.localhost`
   - Anda seharusnya melihat respons dari IP server Ubuntu Anda

3. **Uji dengan Browser**
   - Buka browser web
   - Ketik: `http://project.localhost`
   - Aplikasi JavaScript Anda seharusnya muncul

## Troubleshooting

Jika Anda masih mengalami masalah:

1. **Pastikan Server Berjalan**
   - Verifikasi bahwa server Ubuntu, Nginx, dan container Docker berjalan dengan baik

2. **Periksa Firewall Windows**
   - Pastikan Windows Firewall tidak memblokir koneksi ke server Ubuntu
   - Buka Windows Defender Firewall > Advanced Settings > Inbound Rules
   - Tambahkan aturan baru jika diperlukan

3. **Periksa Konektivitas Jaringan**
   - Pastikan komputer Windows dan server Ubuntu berada dalam jaringan yang sama
   - Coba ping IP server Ubuntu untuk memastikan konektivitas dasar

4. **Gunakan nslookup untuk Debugging**
   - Buka Command Prompt
   - Ketik: `nslookup project.localhost`
   - Periksa apakah hasilnya menunjukkan IP server Ubuntu yang benar
