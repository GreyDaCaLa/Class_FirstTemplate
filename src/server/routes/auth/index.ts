import * as express from "express";
import loginRouter from './loginRouter';
import registerRouter from "./registerRouter"


const router = express.Router();

router.get(
    "/test",
    (req: express.Request, res:express.Response , next: express.NextFunction)=>{
        try{
            res.status(200).json({msg: "Auth Test"})
        }catch (error){
            next(error);
        }
    }
)

router.use("/login",loginRouter);
router.use("/register",registerRouter);

export default router;
