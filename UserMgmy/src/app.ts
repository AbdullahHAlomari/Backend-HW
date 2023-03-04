import express, {Application} from 'express';
import useRoute from './routes/userRouter'
import connectDB from './config/db'
const app:Application = express()
app.use(express.json())
connectDB()
app.use('/', useRoute)
let port:number = 3010
app.listen(port,()=> console.log(`Express started ${port}`))