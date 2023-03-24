const express = require("express");
const tableRoutes = express.Router();
const {usersValidate} = require("../validation/joi")

const {
  getApi,
  signupApi,
  signinApi,
  updateApi,
  deleteApi,
} = require("../controller/controller");

const path = require("path");
const multer = require("multer");
const app = express();
app.use(express.static(path.join(__dirname + "/uploads")));

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

tableRoutes.get("/get", getApi);
tableRoutes.post("/signup", upload.single("image"), usersValidate, signupApi);
tableRoutes.post("/signin", signinApi);
tableRoutes.put("/update/:id", updateApi);
tableRoutes.delete("/delete/:id", deleteApi);

module.exports = tableRoutes;
