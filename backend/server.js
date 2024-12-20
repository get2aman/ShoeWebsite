const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv= require('dotenv');
dotenv.config();
app.use(express.json())

const PORT=process.env.PORT
const URL = process.env.URL

const userRouter=require('./routes/userRoutes')
const shoeRouter=require('./routes/shoeRoutes')
const adminRouter=require('./routes/adminRoute')

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(URL)
.then(() => {console.log('MongoDB connected');
})
.catch(err => console.error(err));




app.listen(PORT ||8000, () => console.log(`Server listening on port ${PORT}`));

app.use(userRouter)
app.use(shoeRouter)
app.use(adminRouter)