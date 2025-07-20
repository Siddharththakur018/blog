const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// ✅ Allow credentials and multiple origins
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://blog-frontend-hxk8.onrender.com'
  ],
  credentials: true
}));

// ✅ Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Cookie parsing
app.use(cookieParser());

// ✅ Your routes
const userRoutes = require('./router/userRoutes');
const postRoutes = require('./router/postRoutes');
const contactRoutes = require('./router/contactRoutes');
const paymentRoutes = require('./router/paymentRoutes');
const commentRoutes = require('./router/commentRouter');

app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/comment', commentRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
