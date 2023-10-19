import * as data from "../data";
import { Request, Response, NextFunction } from "express";
import {UUID, randomUUID} from 'crypto';
import User from "../types/User";
import Technology from "../types/Technology";
import BaseError from '../types/BaseError';

const getUserTechnologies = (req: Request, res : Response, next : NextFunction) =>{
    let username = req.header('username')?.toString();
    const user : User | undefined = data.users.find((user)=> {return user.username == username});

    res.status(200).json(user?.technologies);
}

const createTech = (req: Request, res : Response, next : NextFunction)=>{
    let tech : Technology = req.body;
    tech.id = randomUUID();
    tech.created_at = new Date();
    tech.studied = false;

    data.users.find((user)=>{return user.username == req.header("username")})?.technologies.push(tech);
    res.status(201).json(tech);
}

const updateTech = (req: Request, res : Response, next : NextFunction)=>{
    let username : String | undefined = req.header("username");
    let newTech : Technology = req.body;
    let techId : string = req.params.id;

    let user : User | undefined = data.users.find((user)=> {return user.username == username});
    let tech : Technology | undefined = user?.technologies.find((tech)=>{
        return techId == tech.id
    });

    if(tech === undefined) return next({message: "Technology not found", status: 404});

    tech.deadline = new Date(newTech.deadline);
    tech.title = newTech.title; 
    res.status(200).json(tech);
}

const markStudied = (req: Request, res : Response, next : NextFunction)=>{
    let username : String | undefined = req.header("username");
    let techId : string = req.params.id;

    let user : User | undefined = data.users.find((user)=> {return user.username == username});
    let tech : Technology | undefined = user?.technologies.find((tech)=>{
        return techId == tech.id
    });

    if(tech === undefined) return next({message: "Technology not found", status: 404});

    tech.studied = true; 
    res.status(200).json(tech);
}

const deleteTech = (req: Request, res : Response, next : NextFunction)=>{
    let username : String | undefined = req.header("username");
    let techId : string = req.params.id;

    let user : User | undefined = data.users.find((user)=> {return user.username == username});
    if(user === undefined) return next({message:"User not found", status: 404});
    user.technologies = user.technologies.filter((tech)=>{ return tech.id !== techId});

    res.status(204).send();
}

export {getUserTechnologies, createTech, updateTech, markStudied, deleteTech};