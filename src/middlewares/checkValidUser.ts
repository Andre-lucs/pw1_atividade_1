import { Request, Response, NextFunction } from "express";
import User from "../types/User";
import * as data from "../data";

export default (req : Request, res : Response, next : NextFunction) => {

    const requestBody : User = req.body as User;
    const repeated : boolean = data.users.find((user)=> user.username == requestBody.username)?.username == requestBody.username;

    if(repeated){
        return res.status(400).json({
            error: 'Esse usuario ja esta cadastrado'
        });
    }
    if(!requestBody.technologies) requestBody.technologies = [];

    if(requestBody.name && requestBody.username && requestBody.technologies){
       return next();
    }

    return res.status(400).json({
        error: "Invalid User: Object passed is missing a atributte has a null atributte",
        requestBody
    });
};