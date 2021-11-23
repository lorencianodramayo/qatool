const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");

//multer setup
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 150 * 1024 * 1024,
    },
});
//storage setup
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY,
    },
});
//bucket name
const bucket = storage.bucket(process.env.GCS_BUCKET);
//timeout
const extendTimeout = (req, res, next) => {
  res.setTimeout(48000000, function () {});
  next();
}

module.exports = { multer, bucket, extendTimeout };
