import Query from "../models";

const findToken = (tokenid: number, token:string)=>{
    return Query("select * from AccessTokens where TokenID =? and Token = ?",[tokenid,token]);
}

const addToken = (userid: number) =>{
    return Query("insert into AccessTokens SET UserID = ?", [userid])
}

const updateToken = (TokenID: number, token: string)=>{
    return Query("update AccessTokens SET token = ? WHere TokenID =?", [token,TokenID]);
}

export default {
    findToken,
    addToken,
    updateToken,
}

