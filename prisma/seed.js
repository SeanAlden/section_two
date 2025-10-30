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
  const u3 = await prisma.user.create({
    data: { name: 'John', email: 'john@example.com' }
  });
  const u4 = await prisma.user.create({
    data: { name: 'Harley', email: 'harley@example.com' }
  });
  const u5 = await prisma.user.create({
    data: { name: 'Tim', email: 'tim@example.com' }
  });

  await prisma.order.createMany({
    data: [
      { user_id: u1.id, total: 1500000.00, status: 'pending' },
      { user_id: u1.id, total: 300000.00, status: 'pending' },
      { user_id: u2.id, total: 600000.00, status: 'pending' },
      { user_id: u2.id, total: 1200000.00, status: 'pending' },
      { user_id: u3.id, total: 220000.00, status: 'pending' },
      { user_id: u3.id, total: 300000.00, status: 'pending' },
      { user_id: u4.id, total: 200000.00, status: 'pending' },
      { user_id: u4.id, total: 800000.00, status: 'pending' },
      { user_id: u5.id, total: 1300000.00, status: 'pending' },
      { user_id: u5.id, total: 110000.00, status: 'pending' },
      { user_id: u5.id, total: 200000.00, status: 'pending' },
      { user_id: u5.id, total: 1500000.00, status: 'pending' },
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
