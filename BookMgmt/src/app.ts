import express, {Application} from 'express';
import useRoute from './Routes/allRoutes'
import connectDB from './config/db'
const app:Application = express()
app.use(express.json())
connectDB()
app.use('/', useRoute)
let port:number = 3011
app.listen(port,()=> console.log(`Express started ${port}`))