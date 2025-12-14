# Inventory Management System API 

> **Final Project Pemrograman Web** > Fakultas Teknik - Departemen Teknik Informatika  
> Universitas Hasanuddin, 2025

Sistem backend berbasis REST API yang dirancang untuk menangani manajemen inventaris barang secara sistematis. Aplikasi ini mencakup pengelolaan stok produk, pemasok (supplier), dan kategori, serta dilengkapi dengan sistem autentikasi dan otorisasi yang aman.

---

## Daftar Isi
- [Tentang Proyek](#-tentang-proyek)
- [Live Demo](#-live-demo-deployment)
- [Teknologi](#-teknologi-yang-digunakan)
- [Fitur Utama](#-fitur-utama)
- [Instalasi Lokal](#-instalasi--menjalankan-lokal)
- [Dokumentasi API](#-dokumentasi-api)
- [Akun Testing](#-akun-testing-credentials)
- [Author](#-author)

---

## Tentang Proyek

Sistem ini dibangun untuk menggantikan pencatatan inventaris manual yang rentan kesalahan. Aplikasi berfokus pada layanan backend (REST API) yang menerapkan arsitektur **MVC (Model-View-Controller)**.

Aplikasi ini telah di-deploy ke infrastruktur cloud **AWS EC2** menggunakan **Nginx** sebagai reverse proxy dan **PM2** sebagai process manager, memastikan aplikasi dapat diakses secara publik dan berjalan stabil (production-ready).

---

## Live Demo (Deployment)

Aplikasi saat ini dapat diakses secara publik melalui URL berikut:

* **Base URL:** `http://107.23.18.215`
* **Health Check:** [http://107.23.18.215/health](http://107.23.18.215/health)

**Status Infrastruktur:**
* **Server:** AWS EC2 (Ubuntu 22.04 LTS)
* **Web Server:** Nginx (Port 80)
* **Database:** SQLite (via Prisma)

---

## Teknologi yang Digunakan

* **Runtime:** Node.js (v18)
* **Framework:** Express.js
* **Database & ORM:** SQLite & Prisma ORM
* **Authentication:** JSON Web Token (JWT) & Bcrypt
* **Deployment:** AWS EC2, Nginx, PM2
* **Version Control:** Git & GitHub

---

## Fitur Utama

1.  **Authentication & Authorization:**
    * Registrasi dan Login pengguna.
    * Role-Based Access Control (RBAC): Admin vs Regular User.
2.  **Product Management (CRUD):**
    * Pencatatan data stok dan harga.
    * Relasi ke Kategori dan Supplier.
3.  **Category Management:**
    * Relasi *One-to-Many* dengan Produk.
4.  **Supplier Management:**
    * Relasi *Many-to-Many* dengan Produk.
5.  **Validasi Data:**
    * Perlindungan integritas data (Foreign Key constraints).

---

## Instalasi & Menjalankan Lokal

Ikuti langkah-langkah ini untuk menjalankan proyek di komputer lokal:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/AngelicaOsianto/inventory-system.git](https://github.com/AngelicaOsianto/inventory-system.git)
    cd inventory-system
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment (.env)**
    Buat file `.env` di root folder dan sesuaikan isinya:
    ```env
    PORT=3000
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="rahasia_super_aman"
    ```

4.  **Setup Database (Prisma)**
    ```bash
    npx prisma generate
    npx prisma db push
    node prisma/seed.js  # Untuk mengisi data awal (seeding)
    ```

5.  **Jalankan Server**
    ```bash
    npm run dev
    ```

---

## Dokumentasi API

Berikut adalah daftar endpoint utama yang tersedia:

### Autentikasi
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Mendaftar akun baru |
| `POST` | `/api/auth/login` | Login & mendapatkan Token |

### Produk (Products)
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Melihat semua produk |
| `POST` | `/api/products` | Menambah produk (Admin) |
| `PUT` | `/api/products/:id` | Update data produk |
| `DELETE`| `/api/products/:id` | Hapus produk |

### Supplier & Kategori
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/suppliers` | Melihat daftar supplier |
| `POST` | `/api/suppliers` | Menambah supplier |
| `PUT` | `/api/suppliers/:id` | Edit supplier |
| `DELETE`| `/api/suppliers/:id` | Hapus supplier* |
| `GET` | `/api/categories` | Melihat daftar kategori |
| `POST` | `/api/categories` | Menambah kategori |
| `DELETE`| `/api/categories/:id` | Hapus kategori* |

*> **Catatan:** Penghapusan data Supplier/Kategori hanya dapat dilakukan jika data tersebut tidak sedang digunakan/tertaut pada Produk tertentu (Foreign Key Constraint).*

---

## Akun Testing (Credentials)

Gunakan akun berikut untuk pengujian di Postman:

### 1. Admin Account (Full Access)
* **Email:** `admin@mail.com`
* **Password:** `admin123`
* *(Alternatif)* Email: `angel@mail.com` / Pass: `admin123`

### 2. Regular User (Read Only)
* **Email:** `user1@mail.com`
* **Password:** `user123`

---

## Author

**Angelica Osianto** NIM: D121231017  
Departemen Teknik Informatika, Universitas Hasanuddin.

[GitHub Profile](https://github.com/AngelicaOsianto)
