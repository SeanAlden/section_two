const express = require("express");
const router = express.Router();
const products = require("../data/product-data");
const carts = require("../data/cart-data");

router.post("/cart", (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);

  if (!product) return res.status(404).json({ message: "Product not found" });
  if (!quantity || quantity < 1) return res.status(400).json({ message: "Invalid quantity" });

  const newCart = {
    id: carts.length + 1,
    product: product.name,
    quantity,
  };

  carts.push(newCart);
  res.status(201).json(newCart);
});

router.get("/carts", (req, res) => {
  res.json(carts);
});

module.exports = router;
