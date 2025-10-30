// src/routes/dbQueries.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 1. Users who had any order with total > 1,000,000
 */
router.get('/rich-users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        orders: {
          some: {
            total: { gt: 1000000 }
          }
        }
      },
      include: { orders: true }
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal' });
  }
});

/**
 * 2. Average order per user
 * Using prisma.order.groupBy (Prisma supports groupBy)
 */
router.get('/avg-order-per-user', async (req, res) => {
  try {
    const groups = await prisma.order.groupBy({
      by: ['user_id'],
      _avg: {
        total: true
      }
    });

    // join with user names (map user_id -> user)
    const result = await Promise.all(groups.map(async g => {
      const user = await prisma.user.findUnique({ where: { id: g.user_id }});
      return {
        user_id: g.user_id,
        userName: user?.name,
        avgOrder: Number(g._avg.total || 0)
      };
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal' });
  }
});

/**
 * 3. Update status order to 'completed' if total > 500000
 */
router.post('/complete-high-orders', async (req, res) => {
  try {
    const updated = await prisma.order.updateMany({
      where: { total: { gt: 500000 } },
      data: { status: 'completed' }
    });
    res.json({ updatedCount: updated.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal' });
  }
});

module.exports = router;
