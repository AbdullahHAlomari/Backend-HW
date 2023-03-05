import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
import express, {Request,Response} from 'express';

// Create new movie
export const createMovie = async (req: Request, res: Response) => {
    try {

      const { name, genre, rating, duration } = req.body
      const isExist = await prisma.movie.findUnique({
        where: { name },
    })
    if (isExist) {
        return res.status(400).json({ error: "Movie name is already exist" })
    }

      const movie = await prisma.movie.create({
        data: {
          name,
          genre,
          rating,
          duration,
        },
      })
      res.json({ message: 'movie created', movie })
      
    } catch (error) {
      console.log(error);     
    }
}

// Get all movies
export const gettAllMovies = async(req:Request, res:Response)=>{
  const movies = await prisma.movie.findMany()
    res.json(movies)
}


// Update movies
export const updateMovie = async(req:Request, res:Response)=>{
try {
  const {id, name, genre, rating, duration} = req.body
  const movie = await prisma.movie.update({
    where: {id},
    data:{
      name,
      genre,
      rating,
      duration,
    }
  })
  res.json(movie)
} catch (error) {
  console.log(error);
  
}
}

// Delete movie
export const deleteMovie = async (req:Request, res:Response)=>{
  const {name} = req.body
  const movie = await prisma.movie.delete({
    where: {name},

  })
  res.json(movie)
}

// Get movie by name
export const getByName = async (req:Request, res:Response)=>{
  const {name} = req.body
  const movie = await prisma.movie.findMany({
    where: {name}
  })
  res.json(movie)
}

// Get movie by genre
export const getByGenre = async (req:Request, res:Response)=>{
  const {genre} = req.body
  const movie = await prisma.movie.findMany({
    where: {genre}
  })
  res.json(movie)
}

export const getRatingMovie = async (req: Request, res: Response) => {
  const { rating } = req.body;
  const ratings = await prisma.movie.findMany({
    where: {
      rating: {
        gte: rating,
      },
    },
  });
  res.json(ratings);
};
