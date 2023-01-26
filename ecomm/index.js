// to run the process execute command npm run dev
const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");
const cookieSession = require("cookie-session");
const users = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//add aditional property to our req object req.session
app.use(
  cookieSession({ keys: ["akusfdh298y2jk4ntew394thuihe102ru3ijpiqdfns97"] })
);

app.get("/signup", (req, res) => {
  res.send(`
  <div>
  Your id is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="email" type="text">
            <input name="password" placeholder="password" type="text">
            <input name="passwordConfirmation" placeholder="password confirmation" type="text">
            <button>Sign Up</button>
        </form>
    </div>
  `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  const user = await usersRepo.create({ email, password });

  //store id into users cookie
  req.session.userId = user.id;

  res.send("account created");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

app.get("/signin", (req, res) => {
  res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="email" type="text">
      <input name="password" placeholder="password" type="text">
      <button>Sign In</button>
    </form>
  </div>
  `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email not found");
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send("Incorrect password");
  }

  req.session.userId = user.id;

  res.send("You are signed in");
});

app.listen(3000, () => {
  console.log("listening");
});