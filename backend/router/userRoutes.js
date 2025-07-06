const express = require('express');
const router = express.Router();
const {protect, adminOnly} = require('../middleware/authMiddleware');
const {registerUser, createAdmin, loginUser} = require('../controller/authController');


router.post('/register', registerUser);

router.get('/profile', protect, (req,res) => {
    res.json({user: req.user})
})

router.get('/admin', protect, adminOnly, (req,res) => {
    res.json({message: "Welcome Admin!"})
})

router.post('/create-admin', protect,adminOnly, createAdmin);

router.post('/loginUser', loginUser);

router.get('/check-auth', protect, (req, res) => {
    res.status(200).json({
        loggedIn: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});



module.exports = router;