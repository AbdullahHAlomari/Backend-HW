import {PrismaClient} from '@prisma/client'
import { error } from 'console';
const prisma = new PrismaClient();
import express, {Request,Response} from 'express';


// create users
export const createBook = async(req:Request, res:Response)=>{
    try {
        const {name, genre} = req.body
        const book = await prisma.books.create({
            data:{
                name,
                genre
            }
        })
        res.json(book)
    } catch (error) {
        console.log(error);
        
        
    }
}

// get All users
export const getAllBooks = async(req:Request, res:Response)=>{
try {
    const user = await prisma.books.findMany({
    })
    res.json(user)
    
} catch (error) {
    console.log(error);    
}
}