import * as express from 'express'
import db from '../../db/queries/users'
import { CreateToken } from '../../utils/security/tokens'
import { hashPassword } from '../../utils/security/passwords'


const router = express.Router();

router.post("/", async (req: any,res: express.Response)=>{
    try {
        let {password} = req.body
        // console.log("The req body pass word",req.body.password)
        req.body.password = hashPassword(password)
        // console.log("Made it this far boii --- register router / -")
        let result: any = await db.insertUser(req.body);
        let token = await CreateToken({userid: result.insertId});
        res.json({token, role: "admin", user: result.insertId})
    } catch (error) {
        console.log(error);
        res.json(false);
    }

})



export default router;