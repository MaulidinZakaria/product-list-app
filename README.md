# Instalasi Proyek Laravel + React

Panduan ini menjelaskan langkah instalasi untuk menjalankan backend Laravel dan frontend React secara lokal.

---

## Requirement

- PHP >= 8.0
- Composer
- Node.js versi 22 dan npm versi 11
- MySQL Versi 8
- Git (opsional, untuk clone repo)

---

## Instalasi Backend Laravel

1. **Masuk ke folder backend**
   ```bash
   cd <folder-frontend>
   
2. **Install dependencies Laravel dengan Composer**
   ```bash
   composer install

3. **Konfigurasi database di .env**
   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nama_database
   DB_USERNAME=user_database
   DB_PASSWORD=password_database

4. **Generate aplikasi key jika belum ada**
   ```bash
   php artisan key:generate

5. **php artisan migrate --seed**
   ```bash
   php artisan migrate --seed

6. **Jalankan server Laravel**
   ```bash
   php artisan serve

**Pastikan server berjalan di http://127.0.0.1:8000**

---

## Instalasi Frontend React

1. **Masuk ke folder frontend**
   ```bash
   cd <folder-frontend>

2. **Install dependencies**
   ```bash
   npm install

3. **Jalankan aplikasi React**
   ```bash
   npm start

**Pastikan request mengarah di http://127.0.0.1:8000**

---

## Kontak

**Nama : Maulidin Zakaria**

**No HP : 085236183248**

**Email : maulidinzakaria123@gmail.com**
