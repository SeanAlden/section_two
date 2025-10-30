const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./src/routes/product-route");
const cartRoutes = require("./src/routes/cart-route");

const app = express();

app.use(express.json());        
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/carts", cartRoutes);

app.get("/", (req, res) => {
  res.send("Simple REST API running 🚀");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
