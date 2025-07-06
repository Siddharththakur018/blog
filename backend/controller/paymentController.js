const Payment = require('../model/paymentModel');
const User = require('../model/userModel');

const fakePayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount, cardNumber, cardName, expiry, cvv } = req.body;

    // Basic validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid payment amount' });
    }
    if (!cardNumber || !cardName || !cvv) {
      return res.status(400).json({ message: 'Missing card details' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    let newRole = 'normal';
    let level = 1;

    if (amount >= 499) {
      newRole = 'premium';
      level = 10;
    } else if (amount >= 199) {
      newRole = 'medium';
      level = 5;
    }

    user.role = newRole;
    user.level = level;
    await user.save();

    await Payment.create({
      user: userId,
      amount,
      cardNumber, 
      cardName,
      cvv,
      status: 'success',
      role: newRole 
    });

    res.status(200).json({
      message: `Payment successful. Upgraded to ${newRole} plan.`,
      role: user.role,
      level: user.level
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fakePayment };
