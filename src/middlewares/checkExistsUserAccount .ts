import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req : Request, res : Response, next : NextFunction) => {
    const reqUsername : string | undefined = req.header('username')?.toString();
    if(reqUsername === undefined) return res.status(400).json({
        error: "username is undefined"
    });

    const exists = await prisma.user.findUnique({
        where: {
            username: reqUsername
        }
    })
    if(exists === null) return res.status(404).json({
        error: "User does not exists"
    });
    next();
}