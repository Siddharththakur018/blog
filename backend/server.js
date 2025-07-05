const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors(
    { origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true   }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());


const userRoutes = require('./router/userRoutes');
const postRoutes = require('./router/postRoutes');
const contactRoutes = require('./router/contactRoutes');

app.use('/api/users', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/contact', contactRoutes);



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected")
}).catch((error) => {
    console.log("Not Connectd")
})

app.listen(process.env.PORT || 3000, () => {
    try {
        console.log('Server started')
    } catch (error) {
        crossOriginIsolated.log('Server Error')
    }
})
