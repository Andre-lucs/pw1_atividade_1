import { PrismaClient, Technology } from '@prisma/client';
import { Request, Response, NextFunction } from "express";
import { TechInput } from '../types/TechInput';

const prisma = new PrismaClient();

// Fetches all technologies for a user
const getUserTechnologies = async (req: Request, res : Response, next : NextFunction) =>{
    // Ensure username is a string
    let username : string | undefined = req.header('username')?.toString();
    try{
        const technologies : Array<Technology> = await prisma.technology.findMany({
            where: {
                user: {
                    username: username
                }
            }
        })
        res.status(200).json(technologies);
    }catch(err){
        next(err);
    }
}

// Creates a new technology for a user
const createTech = async (req: Request, res : Response, next : NextFunction)=>{
    // Get the input data
    let input : TechInput = req.body;
    // Ensure deadline is not in the past
    if (pastDate(new Date(input.deadline))) {
        return res.status(400).json({ error: "Given deadline is on the past" });
    }
    try{
        let newtech : Technology = await prisma.technology.create({
            data: {
                title: input.title,
                deadline: input.deadline,
                studied: false,
                user: {
                    connect: {
                        username: req.header("username")
                    }
                }
            }
        })
        res.status(201).json(newtech);
    }catch(err){
        next(err);
    }
}

// Updates a technology for a user by id
const updateTech = async (req: Request, res : Response, next : NextFunction)=>{
    let newTech : TechInput = req.body; // Get the input data
    let techId : string = req.params.id; // Get the id of the technology to update

    let updateData: Partial<TechInput> = {}; // Create an empty object to store the data to update
    // If the title is given, add it to the update data
    if (newTech.title) {
        updateData.title = newTech.title;
    }
    // If the deadline is given, and it is not in the past, add it to the update data
    if (newTech.deadline) {
        if (pastDate(new Date(newTech.deadline))) {
            return res.status(400).json({ error: "Given deadline is on the past" });
        }
        updateData.deadline = newTech.deadline;
    }
    try{
        const updated : Technology = await prisma.technology.update({
            where:{
                id: techId
            },
            data: updateData
        })
        // If the technology is not found, return 404
        if(updated === null) return next({message: "Technology not found", status: 404});

        res.status(200).json(updated);
    }catch(err){
        next(err);
    }
}

// Marks a technology as studied
const markStudied = async (req: Request, res : Response, next : NextFunction)=>{
    let techId : string = req.params.id; // Get the id of the technology to mark as studied
    try{
        let updated : Technology = await prisma.technology.update({
            where:{
                id: techId
            },
            data: {
                studied: true
            }
        })
        if(!updated) return next({message: "Technology not found", status: 404});

        res.status(200).json(updated);
    }catch(err){
        next(err);
    }
}
// Deletes a technology for a user by id
const deleteTech = async (req: Request, res : Response, next : NextFunction)=>{
    let techId : string = req.params.id;

    try{
        let deleted : Technology = await prisma.technology.delete({
            where:{
                id: techId
            }
        })
        res.status(204).send();
    }
    catch(err:any){
        err.status=404;
        next(err);
    }
}

export {getUserTechnologies, createTech, updateTech, markStudied, deleteTech};

// Checks if a date is in the past
function pastDate(date : Date){
    return date < new Date();
}