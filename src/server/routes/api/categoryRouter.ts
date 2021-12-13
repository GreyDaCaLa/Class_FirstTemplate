import * as express from "express";
import db from "../../db/queries/categories";

const router = express.Router();

router.get("/:id?", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let id: number = parseInt(req.params.id);
    let data: any;
    try {
      if (id) {
        data = await db.getOneCategory(id);
      } else {
        data = await db.getAllCategories();
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;