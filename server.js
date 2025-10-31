const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./src/routes/product-route");
const cartRoutes = require("./src/routes/cart-route");

const app = express();

const dbQueriesRouter = require('./src/routes/dbQueries');

app.use(express.json());        
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", productRoutes);
app.use("/", cartRoutes);

app.get("/", (req, res) => {
  res.send("Simple REST API running 🚀");
});

app.use('/db', dbQueriesRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
