# Inventory System API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require JWT access token.

**Header:**

```
Authorization: Bearer <access_token>
```

---

## Auth Endpoints

### Register User

**POST** `/auth/register`

**Body:**

```json
{
  "name": "Angelica",
  "email": "angelica@mail.com",
  "password": "Password123"
}
```

**Response 201:**

```json
{
  "success": true,
  "message": "User registered",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@mail.com"
  }
}
```
<img width="1920" height="1080" alt="POST auth register" src="https://github.com/user-attachments/assets/4c7820ab-fee2-40a8-891a-c4b5771f04da" />

---

### Login

**POST** `/auth/login`

**Body:**

```json
{
  "email": "admin@inventory.com",
  "password": "admin123"
}
```

**Response 200:**

```json
{
  "success": true,
  "message": "Login success",
  "data": {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token"
  }
}
```
<img width="1920" height="1080" alt="POST auth login" src="https://github.com/user-attachments/assets/f1c106b2-567e-4e75-b6b9-f2077fe385eb" />

---

### Get Current User

**GET** `/auth/me`

**Auth:** Required

**Response 200:**

```json
{
  "success": true,
  "data": {
    "id": 10,
    "name": "Admin",
    "email": "admin@mail.com",
    "role": "ADMIN"
  }
}
```
<img width="1920" height="1080" alt="GET auth me" src="https://github.com/user-attachments/assets/9ef0615e-699e-40e6-b00d-43358a25395d" />

---

## Category Endpoints

### Get Categories

**GET** `/categories`

**Response 200:**

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Elektronik" }
  ]
}
```
<img width="1920" height="1080" alt="GET categories" src="https://github.com/user-attachments/assets/261d84ea-e55e-4403-801e-77f02f8276b3" />

---

### Create Category (ADMIN)

**POST** `/categories`

**Auth:** Required (ADMIN)

**Body:**

```json
{ "name": "Furniture" }
```
<img width="1920" height="1080" alt="POST categories" src="https://github.com/user-attachments/assets/8b89a2a6-0d00-43dc-983a-f87f0ce8d3c2" />

---

## Supplier Endpoints

### Get Suppliers

**GET** `/suppliers`

**Query Params:**

* page (default 1)
* limit (default 10)
* search
<img width="1920" height="1080" alt="GET suppliers" src="https://github.com/user-attachments/assets/c4d74af0-a0d8-4b40-bece-600144f22e66" />

---

### Create Supplier (ADMIN)

**POST** `/suppliers`

**Body:**

```json
{
  "name": "PT Indo Makmur",
  "contact": "08534490985"
}
```
<img width="1920" height="1080" alt="POST suppliers" src="https://github.com/user-attachments/assets/824ac6ec-ae3a-4dbf-928f-580ec23b9a92" />

---

## Product Endpoints

### Get Products

**GET** `/products`

**Features:** Pagination, relations
<img width="1920" height="1080" alt="GET product1" src="https://github.com/user-attachments/assets/afda0f5f-cc11-4b53-9b5d-0b24a5b47b75" />
<img width="1920" height="1080" alt="GET product2" src="https://github.com/user-attachments/assets/bce8b410-190c-4a02-bf56-b06a1a9273d2" />
<img width="1920" height="1080" alt="GET product3" src="https://github.com/user-attachments/assets/7c86eb71-fab8-4295-b7da-86ce37d1ccb4" />

---

### Get Product By ID

**GET** `/products/:id`

**Response 200:**

```json
{
  "success": true,
  "data": {
    "id": 7,
    "name": "Keyboard Mechanical",
    "category": { "name": "Elektronik" },
    "supplier": { "name": "PT Supplier Jaya" }
  }
}
```
<img width="1920" height="1080" alt="GET products id1" src="https://github.com/user-attachments/assets/9c8ec87b-86b8-478b-b609-1d93b70aa8da" />
<img width="1920" height="1080" alt="GET products id2" src="https://github.com/user-attachments/assets/897a80f6-3e29-4d47-9a6c-f39aa4ffb1f6" />

---

### Create Product (ADMIN)

**POST** `/products`

**Body:**

```json
{
  "name": "Sofa",
  "description": "Warna coklat tua",
  "price": 160000,
  "quantity": 23,
  "categoryId": 12,
  "supplierId": 11
}
```

---

### Update Product (ADMIN)

**PUT** `/products/:id`
<img width="1920" height="1080" alt="PUT products id" src="https://github.com/user-attachments/assets/767665e6-ae39-475a-9abd-59e56a116757" />

---

### Delete Product (ADMIN)

**DELETE** `/products/:id`

**Response:** 204 No Content
<img width="1920" height="1080" alt="DELETE products id" src="https://github.com/user-attachments/assets/c8db925f-111e-497a-8e9e-b100a5127049" />

---

## Health Check

**GET** `/health`

**Response:**

```json
{
  "status": "ok",
  "message": "Inventory API running"
}
```
<img width="1920" height="1080" alt="GET health" src="https://github.com/user-attachments/assets/5ed7a499-c7f1-4fec-98ab-538add0adc34" />

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Test Credentials

**Admin Account:**

* Email: [admin@mail.com](mailto:admin@mail.com)
* Password: admin123

**Regular User:**

* Email: [user1@inventory.com](mailto:user1@inventory.com)
* Password: user123

