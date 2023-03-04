import {PrismaClient} from '@prisma/client'
import { error } from 'console';
const prisma = new PrismaClient();
import express, {Request,Response} from 'express';
import {} from 'bcrypt';
import argon2 from 'argon2'
import { buffer } from 'stream/consumers';
import { randomBytes } from 'crypto';



export const createUser = async(req:Request, res:Response)=>{
    try {
        const {username, password, email, joiningyear, age} = req.body
    
        const EmailExist = await prisma.users.findUnique({
            where: {email}
        })
        if (EmailExist){
            return res.status(400).json({Error: "Email is already exist."})
        }
        
        const user = await prisma.users.create({
            data:{
                username,
                password,
                email,
                joiningyear,
                role: "User",
                age,
            }
        })
        
        res.json(user)
        
    } catch (error) {
        console.log(error);   
    }
}

    

export const getAllUser = async(req:Request, res:Response)=>{
    try {
    const user = await prisma.users.findMany({
    })
    res.json(user)
    } catch (error) {
        console.log(error);        
    }
}


export const getUser = async(req:Request, res:Response)=>{
    try {
    const {email} = req.body
    const user = await prisma.users.findMany({
        where: {email}
    })
    res.json(user)
    } catch (error) {
        console.log(error);        
    }
}
