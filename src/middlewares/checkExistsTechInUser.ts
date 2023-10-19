import { Request, Response, NextFunction } from "express";
import User from "../types/User";
import Technology from "../types/Technology";
import * as data from "../data";

export default (req : Request, res : Response, next : NextFunction) => {
    const idParam : string = req.params.id;
    const username : String | undefined = req.header('username')?.toString();

    const user : User | undefined = data.users.find((u)=>{ return username == u.username});

    const exists : Technology | undefined = user?.technologies.find((tech)=>{return tech.id == idParam});
    if(exists === undefined) return res.status(404).json({
        error:"Technology not found in that user"
    });
    next();
}