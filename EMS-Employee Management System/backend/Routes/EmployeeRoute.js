import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employee Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err)
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          // Record attendance
          const id = result[0].id;
          const loginTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
          const sql =
            "INSERT INTO attendance (employee_id, login_time) VALUES (?, ?)";
          con.query(sql, [id, loginTime], (err, result) => {
            if (err)
              console.log(err);

            console.log(result);
          });
          // const attendanceSql =
          //   "INSERT INTO attendance (employee_id) VALUES (?)";
          // const id = result[0].id;
          // console.log(id);
          // con.query(attendanceSql, [id], (err, attendanceResult) => {
          //   if (err) console.log("Error recording attendance:", err);
          //   // console.log(attendanceResult);
          //   console.log("Attendance recorded for employee:", id);
          // });
          return res.json({ loginStatus: true, id: result[0].id });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

// Fetch employee attendance
router.get("/employee_attendance/:id", (req, res) => {
  console.log("aa gaya tu");
  const id= req.params.id;
  console.log(id);
  const sql =
    "SELECT * FROM attendance WHERE employee_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return console.log("data nahi mila")
    console.log(result);
    return res.status(200).json({ attendance: result });
  });
});

router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as EmployeeRouter };
