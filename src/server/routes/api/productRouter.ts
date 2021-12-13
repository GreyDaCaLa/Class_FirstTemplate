import * as express from 'express'
import passport from 'passport';
import db from '../../db/queries/products'
import filterByCategory from '../../db/queries/filtered_products';

const router = express.Router()

const isAdmin = (req: any, res: express.Response, next: express.NextFunction) => {
    if (!req.user || req.user.Role !== "admin") {
      return res.status(401).json({ msg: "You are not authorized to make this request." });
    }
    return next();
  };

router.get("/:id?", async (req: express.Request, res:express.Response , next: express.NextFunction)=>{
    let id: number = parseInt(req.params.id);
    let data: any;
    console.log("this is where we should be---------------------------------")
    try {
        if(id){
            data = await db.getOneProduct(id)
        }else{
            data = await db.getAllProduct()
        }

        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

router.get("/filter_category/:id", async (req: express.Request, res:express.Response , next: express.NextFunction) =>{
    try {
        let id = parseInt(req.params.id);
        let data: any;
        if(id){
            data = await filterByCategory(id);
        } else {
            data = await db.getAllProduct();
        }

        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})


router.use((req,res,next)=>{
    passport.authenticate("bearer", {session: false}, (err, user, info)=>{
        if(user){
            req.user = user
        }
        return next();
    })(req,res,next);
})



router.post("/", isAdmin, async ( req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try {
        console.log("WE MADE IT THIS FAR WITH -- PRODUCT POST")
        let { body } = req;
        let data = await db.addProduct(body);
        res.status(200).json(data);
    } catch (error) {
        next(error)
    }
})

router.put("/:id", isAdmin, async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try {
        let id = parseInt(req.params.id);
        let {body} = req;
        let data = await db.updateProduct(body, id);
        res.status(200).json(data)
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", isAdmin, async ( req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        let id = parseInt(req.params.id);
        let data = await db.removeProduct(id);
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

export default router




   