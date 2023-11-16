import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { UserInput } from "../types/UserInput";
const prisma = new PrismaClient();


const findAll = async (req : Request, res : Response, next : NextFunction) => {
    try{
        let users : Array<User> = await prisma.user.findMany();
        res.json(users);
    }catch(err){
        next(err);
    }
};

const insert = async (req : Request, res : Response, next : NextFunction) => {
    let input : UserInput = req.body;
    try{
        let newUser : User = await prisma.user.create({
        data: {
            name: input.name,
            username: input.username
        }
        })
        res.json(newUser);
    }catch(err){
        next(err);
    }
};

export {findAll, insert};