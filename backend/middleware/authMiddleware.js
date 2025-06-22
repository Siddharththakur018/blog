const jwt = require('jsonwebtoken');
const User = require('../model/userModel');


const protect = async(req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Not Autorized. Invalid token!"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
}




module.exports = {protect,adminOnly}