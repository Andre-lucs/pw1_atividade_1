import User from "../types/User";
import * as data from "../data";
import { Request, Response, NextFunction } from "express";
import {randomUUID} from 'crypto';

const findAll = (req : Request, res : Response, next : NextFunction) => {
    let lista : User[] = data.users;
    res.json(lista);
};

const insert = (req : Request, res : Response, next : NextFunction) => {
    let obj : User = req.body as User;
    obj.id = randomUUID();
    data.users.push(obj);
    res.json(obj);
};

export {findAll, insert};