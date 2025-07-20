// Card.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RxCrossCircled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

function Card({ selectedPlan, showModal, setShowModal }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  const { updatePlan, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const unformatCardNumber = (value) => value.replace(/\s+/g, '');
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D+/g, '');
    return cleaned.match(/.{1,4}/g)?.join(' ') ?? '';
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const closeModal = () => setShowModal(false);

  const cardData = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;

    if (currentUser?.role === selectedPlan.role) {
      toast.error("You are already subscribed to this plan.");
      return;
    }

    try {
      const payload = {
        amount: selectedPlan.amount,
        cardNumber: unformatCardNumber(cardNumber),
        cardName,
        cvv,
        expiry,
        role: selectedPlan.role,
      };

      const response = await axios.post(
        '${import.meta.env.VITE_SITE_URL}/api/payment/fake-payment',
        payload,
        { withCredentials: true }
      );

      toast.success('Subscribed to the plan successfully!');
      updatePlan(response.data.role);
      setShowModal(false);

      setCardNumber('');
      setCardName('');
      setExpiry('');
      setCvv('');

      // Redirect to homepage after 1.5 seconds
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  if (!showModal || !selectedPlan) return null;

  return (
    <div className='relative font-sans'>
      <div className='absolute bottom-0 right-0 w-96 h-[626px] bg-white p-6 shadow-2xl border-l border-gray-200 rounded-tl-xl'>
        <RxCrossCircled
          onClick={closeModal}
          className='cursor-pointer text-3xl text-gray-500 hover:text-red-500 transition mb-6'
        />
        <h2 className='text-lg font-semibold text-gray-800 mb-6'>Enter your card details</h2>

        <form onSubmit={cardData} className='space-y-5'>
          {/* Cardholder Name */}
          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1'>Cardholder Name</label>
            <input
              type='text'
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder='John Doe'
              className='p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              required
            />
          </div>

          {/* Card Number */}
          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1'>Card Number</label>
            <input
              type='text'
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder='1234 5678 9012 3456'
              maxLength={19}
              className='p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              required
            />
          </div>

          {/* Expiry */}
          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1'>Expiration Date</label>
            <input
              type='text'
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder='MM/YY'
              maxLength={5}
              className='p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              required
            />
          </div>

          {/* CVV */}
          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1'>CVV</label>
            <input
              type='text'
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder='123'
              maxLength={4}
              className='p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              required
            />
          </div>

          {/* Pay Button */}
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md font-medium hover:from-blue-600 hover:to-indigo-700 transition'
          >
            Pay ₹{selectedPlan.amount}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Card;
