const con = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;


//Get Api Creation//
let getApi = async (req, res) => {
  try {
    await con.query("SELECT * FROM users", (err, result, fields) => {
      if (err) {
        res.send(err.sqlMessage);
      }
      res.send(result);
    });
  } catch (err) {
    res.send(err.sqlMessage);
  }
};

///////////////////////////////////////////////////////////////////////////////////////

//Signup Api Creation//
let signupApi = async (req, res) => {
  const { user_name, email_id, image, password, id } = req.body;
  const salt = await bcrypt.genSalt(8);
  console.log("salt", salt);
  const pass = await bcrypt.hash(password, salt);
  console.log("pass", pass);

  const data = {
    user_name,
    email_id,
    image: req.file.path,
    id: uuid(),
    password: pass,
  };
  con.query("INSERT INTO users SET ?", data, (err, result) => {
    if (err) {
      return res.send(err.sqlMessage);
    } else {
      res.send(result);
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////////

let signinApi = async (req, res) => {
  const { email_id, password } = req.body;

  con.query(
    "SELECT * FROM users  WHERE email_id=?",
    email_id,
    async (err, result) => {
      if (err) {
        res.json({ error: err.sqlMessage });
      }

      const pass = result[0].password;
      const id = result[0].id;
      const passcheck = await bcrypt.compare(password, pass);
      if (!passcheck) {
        res.send("password not matched");
      }
      const token = await jwt.sign({ id }, "asdf");
      res.json({ respone: 200, token });
    }
  );
};

///////////////////////////////////////////////////////////////////////////////////////

let updateApi = async (req, res) => {
  try {
    const data = [req.body, req.params.id];
    await con.query(
      "UPDATE users SET ? WHERE id = ?",
      data,
      (err, result, fields) => {
        if (err) {
          res.send(err.sqlMessage);
        }
        res.send(result);
      }
    );
  } catch (err) {
    res.send(err.sqlMessage);
  }
};

///////////////////////////////////////////////////////////////////////////////////////

let deleteApi = async (req, res) => {
  try {
    const data = [req.params.id];
    await con.query(
      "DELETE FROM users WHERE id = ?",
      data,
      (err, result, fields) => {
        if (err) {
          res.send(err.sqlMessage);
        }
        res.send(result);
      }
    );
  } catch (err) {
    res.send(err.sqlMessage);
  }
};

module.exports = { getApi, signupApi, signinApi, updateApi, deleteApi };
