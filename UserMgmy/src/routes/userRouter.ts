import { createUser, getAllUser, getUser } from '../controller/userCont'
import {RegisterTypes} from './../zodSchema/zodUser'
import validate  from './../middleware/validate'

import express from 'express'
let router = express.Router()

// Create user
router.post("/create", validate(RegisterTypes), createUser)

// Get user
router.get("/getuser", getUser)

// Get all users
router.get("/getAll", getAllUser)


export default router