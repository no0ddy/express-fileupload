const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const filesPayloadExists = require("./middleware/filesPayloadExists");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");
const fileExtLimiter = require("./middleware/fileExtLimiter");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg", ".pdf", ".xlsx"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "files", files[key].name);
      //Automatically creates the directory path specified in .mv(filePathName)
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    return res.json({ status: "logged", message: "logged" });
  }
);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
