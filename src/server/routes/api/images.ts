
import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import * as fileupload from "express-fileupload";

const router = express.Router();

router.use(fileupload());

router.post(
  "/",
  async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
      if (!req.files) {
        res.status(500).json({ msg: "No file detected" });
        return;
      }

      const newImage: any = req.files.image;

      const buffer = Buffer.from(newImage.data, "base64");

      fs.writeFile(
        path.join(
          __dirname,
          `../public/assets/productImages/${newImage.name}`
        ),
        buffer,
        (err) => {
          if (err) {
            console.log(err.message);
            next(err);
          } else {
            res.status(200).json({ msg: "Image saved!" });
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

export default router;