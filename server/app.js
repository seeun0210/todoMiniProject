const express = require("express");
const session = require("express-session");
const app = express();
const port = 8000;
const cors = require("cors");
const { sequelize } = require("./models");

// 세션 옵션 객체
app.use(
  session({
    secret: "MySessionSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000, // 3시간
      name: "userID",
    },
  })
);

// header session을 넣는 미들웨어
app.use((req, res, next) => {
  res.locals.Id = 0;

  if (req.session.userId) {
    const userId = req.session.userId;

    res.locals.Id = userId;
  }

  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 주소
    credentials: true, // 세션 쿠키를 보낼 수 있도록 허용
  })
);
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
app.use("/", todoRouter);
app.use("/", userRouter);
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
