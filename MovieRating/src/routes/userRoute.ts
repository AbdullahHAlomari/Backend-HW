import {createMovie, deleteMovie, getByGenre, getByName, getRatingMovie, gettAllMovies, updateMovie} from '../controller/movieCont'
import {RegisterTypes} from './../zodSchema/zodUser'
import validate  from './../middleware/validate'

import express from 'express'
let router = express.Router()

// Create movie
router.post('/create', validate(RegisterTypes), createMovie)

// GET All Movies
router.get("/", gettAllMovies)

// Update Movie
router.put("/", updateMovie)

// Delete movie
router.delete("/", deleteMovie)

// Get movie by name
router.get("/getbyname", getByName)

// Get movie by genre
router.get("/getbygenre", getByGenre)

// Get by rating 
router.get("/getbyrating", getRatingMovie)

export default router