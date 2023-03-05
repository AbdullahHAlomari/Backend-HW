import {PrismaClient} from '@prisma/client'
import { error } from 'console';
const prisma = new PrismaClient();
import express, {Request,Response} from 'express';
import argon2 from 'argon2'

// create users
export const createUser = async(req:Request, res:Response)=>{
    try {
        const {username, password} = req.body
        const userExist = await prisma.user.findUnique({
            where: {
              username
            },
          });
          if (userExist) {
            return res.status(400).json({ Error: "Username is already exist." });
          }
        const hashed = await argon2.hash(password)
        const user = await prisma.user.create({
            data:{
                username,
                password: hashed,
            }
        })
        res.json(user)
    } catch (error) {
        console.log(error);        
    }
}

// get All users
export const getAllUser = async(req:Request, res:Response)=>{
try {
    const user = await prisma.user.findMany({
    })
    res.json(user)
    
} catch (error) {
    console.log(error);    
}
}