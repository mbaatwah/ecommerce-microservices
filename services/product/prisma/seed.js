const prisma = require('../src/lib/db');

async function main() {
  const productCount = await prisma.product.count();
  if(productCount > 0) {
    console.log('Product Database has already been seeded.');
    return;
  }

  const product1 = await prisma.product.create({
    data: {
      name: 'Product 1',
      price: 1000,
      description: 'This is product 1.',
      stock: 10,
    },
  });

  console.log('Product Database has been seeded.', 'total = ', );
}

main()
  .catch((e) => {
    console.error('Could not seed the product database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });