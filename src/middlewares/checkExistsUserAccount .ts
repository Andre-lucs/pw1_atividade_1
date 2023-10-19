import { Request, Response, NextFunction } from "express";
import User from "../types/User";
import * as data from "../data";

export default (req : Request, res : Response, next : NextFunction) => {
    const username : String | undefined = req.header('username')?.toString();
    if(username === undefined) return res.status(400).json({
        error: "username is undefined"
    });

    const exists : User | undefined = data.users.find((u)=>{ return username == u.username});
    
    if(exists === undefined) return res.status(404).json({
        error: "User does not exists"
    });
    next();
}