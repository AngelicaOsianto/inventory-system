# Deployment Guide: Inventory System API

Dokumen ini menjelaskan langkah-langkah deployment **Inventory System API** ke **AWS EC2 (Ubuntu)** hingga aplikasi dapat diakses publik.

---

## 1. Prerequisites

* Akun AWS aktif
* EC2 Instance (Ubuntu 20.04 / 22.04)
* Security Group membuka port:

  * **22** (SSH)
  * **80** (HTTP)
  * **443** (HTTPS – opsional)
* Domain (opsional)

---

## 2. Setup EC2 Server

### 2.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Install Node.js (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

Cek versi:

```bash
node -v
npm -v
```

---

## 3. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

---

## 4. Clone Repository

```bash
git clone https://github.com/<username>/inventory-system.git
cd inventory-system
```

---

## 5. Environment Configuration

### 5.1 Buat File `.env`

```bash
cp .env.example .env
nano .env
```

Contoh isi `.env`:

```env
PORT=3000
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
```

> ⚠️ **Jangan commit file `.env`**

---

## 6. Install Dependencies

```bash
npm install
```

---

## 7. Prisma Setup

### 7.1 Generate Prisma Client

```bash
npx prisma generate
```

### 7.2 Jalankan Migration

```bash
npx prisma migrate deploy
```

### 7.3 (Opsional) Jalankan Seeder

```bash
node prisma/seed.js
```

---

## 8. Run Application

### 8.1 Jalankan dengan PM2

```bash
pm2 start src/index.js --name inventory-api
```

### 8.2 Simpan Konfigurasi PM2

```bash
pm2 save
pm2 startup
```

---

## 9. Setup Nginx (Reverse Proxy)

### 9.1 Install Nginx

```bash
sudo apt install nginx -y
```

### 9.2 Konfigurasi Server Block

```bash
sudo nano /etc/nginx/sites-available/inventory-api
```

Isi:

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktifkan config:

```bash
sudo ln -s /etc/nginx/sites-available/inventory-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 10. Health Check

Akses endpoint:

```
http://<EC2_PUBLIC_IP>/health
```

Response:

```json
{
  "status": "ok",
  "message": "Inventory API running"
}
```

---

## 11. Update Deployment

Jika ada update code:

```bash
git pull origin main
npm install
npx prisma migrate deploy
pm2 restart inventory-api
```

---

## 12. Log & Monitoring

```bash
pm2 logs inventory-api
pm2 status
```

---

## 13. Production URL

* Base URL: `http://<EC2_PUBLIC_IP>/api`
* Health Check: `/health`

---

## 14. Notes

* Gunakan **Postman** untuk testing production API
* Screenshot Postman disertakan di `API-DOCS.md`
* Pastikan `.env` tidak pernah di-commit

---

✅ Deployment berhasil jika API dapat diakses secara publik dan endpoint `/health` merespons 정상.
