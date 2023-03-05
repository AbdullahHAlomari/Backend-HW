import {PrismaClient} from '@prisma/client'
import { error } from 'console';
const prisma = new PrismaClient();
import express, {Request,Response} from 'express';


export const createLoan = async(req:Request, res:Response)=>{
    try {
        const {BookID, userID} = req.body
        const usercheck = await prisma.user.findUnique({
            where: {
                id: userID,
            },
        });
        if (!usercheck) {
            return res.status(400).json("Invalid userID");
        }
        const user = await prisma.loan.create({
            data:{
                userID,
                BookID,
                
            }
        })
        res.json(user)
        
    } catch (error) {
        console.log(error);    
    }
    }

// Get lended by BookID
export const getLoan = async(req:Request, res:Response)=>{
    try {
        const {BookID} = req.body
        const bookIdCheck = await prisma.books.findUnique({
            where: {
                id: BookID,
            },
        });
        if (!bookIdCheck) {
            return res.status(400).json("Invalid BookID");
        }
        const user = await prisma.loan.findMany({
            where: {BookID},
            select:{
                id: true,
                userID: true
            }
        })
        res.json(user)
        
    } catch (error) {
        console.log(error);    
    }
    }