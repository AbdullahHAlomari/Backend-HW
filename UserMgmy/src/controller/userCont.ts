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

        if (email == "Ab95@gmail.com"){
            const admin = await prisma.users.create({
                data:{
                    username,
                    password,
                    email,
                    joiningyear,
                    role: "Admin",
                    age,
                }
            })
            res.json(admin)   
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

    
// Get All users
export const getAllUser = async(req:Request, res:Response)=>{
    try {
    const user = await prisma.users.findMany({
    })
    res.json(user)
    } catch (error) {
        console.log(error);        
    }
}
export const getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
  
      if (!id) {
        return res.status(400).json({ message: "Please provide an id parameter." });
      }
      const user = await prisma.users.findUnique({
        where: { id: id },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
// get one user by email
export const getUserByEmail = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
  
      if (!email) {
        return res.status(400).json({ message: "Please provide an email parameter." });
      }
      const user = await prisma.users.findUnique({
        where: { email: email },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// get one user by age
export const getUserByAge = async(req:Request, res:Response)=>{
    try {
        const {age} = req.body
        const user = await prisma.users.findMany({
            where:{
                age:{
                    gte: age
                }
            }
        })
        res.json(user)

        
    } catch (error) {
        console.log(error);
        
        
    }
}

// get role count
export const getRoleCount = async(req:Request, res:Response)=>{
    try {
        const {role} = req.body
        const user = await prisma.users.count({
            where:{
                role: role
            }
        })
        res.json({Count: user})

        
    } catch (error) {
        console.log(error);
        
        
    }
}

// login check 
// export const Login = async(req:Request, res:Response)=>{
//     try {
//         const {username, password} = req.body
//         const user = await prisma.users.findUnique({
//             where:{username},
//         })
        
//     } catch (error) {
        
//     }
// }

// login endpoint
// login endpoint

export const login = async (req: Request, res: Response) => {
  const { id, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email: id },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // password is correct, do something
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

