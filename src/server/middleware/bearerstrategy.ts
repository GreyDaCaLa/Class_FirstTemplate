import * as passport from "passport"
import * as BearerStrategy from "passport-http-bearer"
import { nextTick } from "process";
import db from "../db/queries/users";
import {ValidToken} from "../utils/security/tokens";
import { IPayload } from "../utils/types";


passport.use(new BearerStrategy.Strategy(async (token,next)=>{
    try{
        let payload: IPayload = await ValidToken(token);
        let [user]: any = await db.findOneUserById (payload.userid)
        if(user){
            next(null, user);
        }
        else{
            next(null, false)
        }

    }catch (error){
        next(error);

    }
}))


