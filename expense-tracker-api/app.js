
const express = require("express");

const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Rahul", age: 22 },
  { id: 2, name: "Aman", age: 25 }
];

// GET - Read all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// GET - Read one user
app.get("/users/:id", (req, res) => {
  const user = users.find(
    u => u.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json(user);
});

// POST - Create user
app.post("/users", (req, res) => {
  const newUser = {
    id: Date.now(),
    name: req.body.name,
    age: req.body.age
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// PUT - Replace user
app.put("/users/:id", (req, res) => {
  const index = users.findIndex(
    u => u.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users[index] = {
    id: Number(req.params.id),
    name: req.body.name,
    age: req.body.age
  };

  res.status(200).json(users[index]);
});

// PATCH - Update selected fields
app.patch("/users/:id", (req, res) => {
  const user = users.find(
    u => u.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  Object.assign(user, req.body);

  res.status(200).json(user);
});

// DELETE - Delete user
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(
    u => u.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
