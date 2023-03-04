import { createUser, deleteAllUsers, getAllUser, getRoleCount, getUserByAge, getUserByEmail, getUserById, getUserByJoined, joinedYear, login, updatePassword } from '../controller/userCont'
import {RegisterTypes} from './../zodSchema/zodUser'
import validate  from './../middleware/validate'

import express from 'express'
let router = express.Router()

// Create user
router.post("/create", validate(RegisterTypes), createUser)

// Get user by id
router.get("/byid", getUserById)

// get user by email
router.get('/byemail', getUserByEmail)

// Get all users
router.get("/getAll", getAllUser)

// get user by age
router.get('/byage', getUserByAge)

// get role count
router.get('/count', getRoleCount)

// Login
router.get('/login', login)

//Delete all users
router.delete('/delete', deleteAllUsers)

// update password
router.put('/updatepwd', updatePassword)

// if joined year is matched
router.get('/matching', joinedYear)

// Get all users by joining year
router.get('/joining', getUserByJoined)


export default router