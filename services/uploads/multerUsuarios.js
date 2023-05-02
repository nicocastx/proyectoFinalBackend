import multer from "multer";
import path from 'path'

const userStorage = multer.diskStorage({
  destination: "public/avatars",
  filename: function (req, file, cb) {
    cb(null, req.body.username + path.extname(file.originalname));
  },
});

const multerUsuarios = multer({
  storage: userStorage,
});

export default multerUsuarios