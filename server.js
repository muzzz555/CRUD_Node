const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const connection = require('./database')
require("dotenv").config();

const saltRounds = 10;
const port = process.env.PORT_SERVER;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/users", async (req, res) => {
  let sql = "SELECT * FROM users";

  await connection.execute(sql, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
      return;
    }
    res.status(200).json({
      message: "เรียกข้อมูลสำเร็จ",
      data: result,
    });
  });
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;
  let role = "member";

  await bcrypt.genSalt(saltRounds, async (err, salt) => {
    await bcrypt.hash(password, salt, async (err, hash) => {
      let sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
      await connection.execute(sql, [email, hash, role], (err, result) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
          return;
        }
        res.status(201).json({
          message: "เพิ่มข้อมูลสำเร็จ",
          data: result,
        });
      });
    });
  });
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM users WHERE id = ?";
  await connection.execute(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
      return;
    }
    res.status(200).json({
      message: "เรียกข้อมูลสำเร็จ",
      data: result,
    });
  });
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  await bcrypt.genSalt(saltRounds, async (err, salt) => {
    await bcrypt.hash(password, salt, async (err, hash) => {
      let sql = "UPDATE users SET email = ?, password = ? WHERE id = ?";
      await connection.execute(sql, [email, hash, id], (err, result) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
          return;
        }
        res.status(201).json({
          message: "แก้ไขข้อมูลสำเร็จ",
          data: result,
        });
      });
    });
  });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM users WHERE id = ?";

  connection.execute(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
      return;
    }
    res.status(200).json({
      message: "ลบข้อมูลสำเร็จ",
      data: result,
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
