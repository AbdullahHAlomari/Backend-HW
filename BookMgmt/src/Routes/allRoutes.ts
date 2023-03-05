import { createUser, getAllUser } from '../controller/userController'
import { createLoan, getLoan } from '../controller/LoanController'
import { createBook, getAllBooks } from '../controller/bookController'
import {RegisterTypes} from './../zodSchema/zodValidate'
import validate  from '../middleware/validate'

import express from 'express'
let router = express.Router()

// Users
router.post('/createuser', createUser)
router.get('/getalluser', getAllUser)

// Books
router.post('/createbook', createBook)
router.get('/getallbook', getAllBooks)

// Loans
router.post('/createloan', createLoan)
router.get('/getloan', getLoan)


export default router