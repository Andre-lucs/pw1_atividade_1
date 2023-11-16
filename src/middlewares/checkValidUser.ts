import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req : Request, res : Response, next : NextFunction) => {

    const requestBody : User = req.body as User;
    const repeated : boolean = await prisma.user.findUnique({
        where: {
            username: requestBody.username
        }
    }) !== null;

    if(repeated){
        return res.status(400).json({
            error: 'Invalid User: username already exists'
        });
    }

    if(requestBody.name && requestBody.username){
        return next();
    }

    return res.status(400).json({
        error: "Invalid User: Object passed is missing a atributte has a null atributte",
        requestBody
    });
};