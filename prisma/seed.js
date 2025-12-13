import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // HAPUS DATA (urutan child → parent)
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.user.deleteMany();

  // USERS
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin Inventory',
      email: 'admin@inventory.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  const users = await prisma.user.createMany({
    data: [
      {
        name: 'User One',
        email: 'user1@mail.com',
        password: userPassword,
        role: 'USER'
      },
      {
        name: 'User Two',
        email: 'user2@mail.com',
        password: userPassword,
        role: 'USER'
      }
    ]
  });

  // CATEGORIES
  const elektronik = await prisma.category.create({
    data: { name: 'Elektronik' }
  });

  const makanan = await prisma.category.create({
    data: { name: 'Makanan' }
  });

  // SUPPLIERS
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'PT Supplier Jaya',
      contact: '08123456789'
    }
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'CV Makmur Sentosa',
      contact: '08987654321'
    }
  });

  // PRODUCTS
  const products = await prisma.product.createMany({
  data: [
    {
      name: 'Keyboard Mechanical',
      description: 'RGB Keyboard',
      price: 750000,
      quantity: 10,
      categoryId: elektronik.id,
      supplierId: supplier1.id,
      ownerId: admin.id
    },
    {
      name: 'Mouse Wireless',
      description: 'Mouse Bluetooth',
      price: 250000,
      quantity: 20,
      categoryId: elektronik.id,
      supplierId: supplier2.id,
      ownerId: admin.id
    },
    {
      name: 'Snack Ringan',
      description: 'Cemilan',
      price: 15000,
      quantity: 50,
      categoryId: makanan.id,
      supplierId: supplier1.id,
      ownerId: admin.id
    }
  ]
});

  console.log('Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
