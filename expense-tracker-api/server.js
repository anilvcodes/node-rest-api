const express = require("express");
const app = express();
const PORT = 3000;
//middleware
const mymiddleware = (req, res, next) => {
  console.log("mymiddleware executed");
  next();
};

const accessControl=(req,res,next)=>{
    const isLoggedIn = true;
    if (isLoggedIn) {
    next(); 
  } else {
    res.send("Please login first");
  }
}

//register middleware

app.use(mymiddleware);

//routings
app.get("/", (req, res) => {
  res.send("hello expense -tracker ");
  console.log("hello express");
});
 app.get("/profile",accessControl, (req, res) => {
  res.send("welcome to profile");
});

app.get("/about", (req, res) => {
  res.send("about page");
});


app.get("/contact", (req, res) => {
  res.send("constact page");
});






app.post("/user", (req, res) => {
  res.send("new user created ");
});








//error handling middleware
app.get("/error", (req, res, next) => {
  const err = new Error("Something went wrong");
  next(err);
});
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).send("somthings went wrong");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
