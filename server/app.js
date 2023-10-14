const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const { sequelize } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 주소 (포트 번호 포함)
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
