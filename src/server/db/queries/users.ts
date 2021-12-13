import Query from '../models'

const findOneUserById = (userid: number)=>{
    return Query("select * from Users Where UserID=?",[userid])
}

const findOneUserByEmail = (email: string)=>{
    return Query("select * from Users Where Email = ?",[email]);
}

const insertUser = (user: any) =>{
    return Query("insert into Users set ?",[user]);
}

const updateUser = (userid: number, user: any) =>{
    return Query("update Users set ? where UserId = ?", [user, userid]);
}

const removeUser = (userid: number) => {
    return Query("delete from Users where UserID = ?",[userid])
}

export default {
    findOneUserByEmail,
    findOneUserById,
    insertUser,
    updateUser,
    removeUser,
};