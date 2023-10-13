const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const { sequelize } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const todoRouter = require("./routes/todo");
app.use("/", todoRouter); // 기본주소: localhost:PORT/api

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
