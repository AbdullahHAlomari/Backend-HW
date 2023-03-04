import { createUser, getAllUser, getRoleCount, getUserByAge, getUserByEmail, getUserById, login } from '../controller/userCont'
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


export default router