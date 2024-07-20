const prisma = require('../src/lib/db');

async function main() {
    await prisma.product.upsert({
        where: { name: 'Product 1' },
        update: { price: 100, description: 'This is product 1', stock: 10 },
        create: { name: 'Product 1', price: 100, description: 'This is product 1', stock: 10 },
    });

    await prisma.product.upsert({
        where: { name: 'Product 2' },
        update: { price: 200, stock: 0 },
        create: { name: 'Product 2', price: 200, stock: 0 },
    });
  console.log('Product Database has been seeded.');
}

main()
  .catch((e) => {
    console.error('Could not seed the product database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });