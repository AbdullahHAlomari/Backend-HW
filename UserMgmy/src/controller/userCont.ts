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

        const usernameExist = await prisma.users.findUnique({
            where:{username}
        })
        if (usernameExist){
            return res.status(400).json({Error: "Username is already exist."})
        }


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

// get user by id
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
  const { username, password } = req.body;
//   const username = req.body.username

  try {
    const user = await prisma.users.findUnique({
      where: {username},
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


// Get All users
export const deleteAllUsers = async(req:Request, res:Response)=>{
    try {
    const user = await prisma.users.deleteMany({
    })
    res.json(user)
    } catch (error) {
        console.log(error);        
    }
}

// update passsword 
// Get All users
export const updatePassword = async(req:Request, res:Response)=>{
    try {
    const {id, password} = req.body
    const usernameExist = await prisma.users.findUnique({
        where:{id}
    })
    if (!usernameExist) {
        return res.status(400).json({Err: "User not found"})        
    }

    const updatePwd = await prisma.users.update({
        where: {id},
        data:{
            password
        }

    })
    res.json(updatePwd)
    } catch (error) {
        console.log(error);        
    }
}

// check the joined year
export const joinedYear = async(req:Request, res:Response)=>{
    try {
        const { id, joiningyear } = req.body;
    
        const user = await prisma.users.findUnique({
          where: { id },
        });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        if (user.joiningyear !== joiningyear) {
          return res.status(400).json({ error: 'User did not join in the specified year' });
        }
    
        res.json({ message: 'User joined in the specified year' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
      }
}

// get all user by joining year
export const getUserByJoined = async(req:Request, res:Response)=>{
    try {
        const {joiningyear} = req.body;
        const user = await prisma.users.findMany({
            where:{
                joiningyear:{
                    equals: joiningyear
                }
            }
        })
        res.json(user)
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
      }
}