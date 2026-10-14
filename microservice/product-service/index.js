const express = require("express");

const app = express();
const PORT = 3002;

app.use(express.json());

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Keyboard", price: 1500 }
];

// Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Get product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find(
    (p) => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Product Service is running" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Product Service running on port ${PORT}`);
});