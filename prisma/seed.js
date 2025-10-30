const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();

  const u1 = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com' }
  });
  const u2 = await prisma.user.create({
    data: { name: 'Bob', email: 'bob@example.com' }
  });

  await prisma.order.createMany({
    data: [
      { user_id: u1.id, total: 1500000.00, status: 'pending' },
      { user_id: u1.id, total: 300000.00, status: 'pending' },
      { user_id: u2.id, total: 600000.00, status: 'pending' },
      { user_id: u2.id, total: 1200000.00, status: 'pending' }
    ]
  });

  console.log('Seeded data ✅');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
