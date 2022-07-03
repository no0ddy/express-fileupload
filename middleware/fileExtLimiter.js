const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    // Check if file extensions are allowed
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      return res.status(422).json({
        status: "error",
        message: `Upload failed. Only ${allowedExtArray.join(
          ","
        )} files allowed.`,
      });
    }

    next();
  };
};

module.exports = fileExtLimiter;
