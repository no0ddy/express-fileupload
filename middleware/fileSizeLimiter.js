const MB = 5; // size specificied to 5 MB

const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
  const files = req.files;

  const filesOverLimit = []; //which files are over the size limit

  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });
  if (filesOverLimit.length) {
    return res
      .status(413)
      .json({
        status: "error",
        message: `Upload failed. ${filesOverLimit.join(
          ","
        )} are larger than ${MB} MB`,
      });
  }
  next();
};

module.exports = fileSizeLimiter;
