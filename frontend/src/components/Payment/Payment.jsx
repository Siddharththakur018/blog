// Payment.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Card from './Card';

function Payment() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { updatePlan, currentUser } = useContext(AuthContext);

  const plans = [
    {
      name: 'Normal',
      role: 'normal',
      price: '₹0/month',
      amount: 0,
      features: [
        'Access to limited blog posts (2–3 per week)',
        'Limited archive access (last 7 days)',
        '1 newsletter per month',
        'Can comment on posts',
        '❌ No AI-assisted content access',
        '❌ No downloads or premium posts',
      ],
      color: 'border-gray-300',
    },
    {
      name: 'Medium',
      role: 'medium',
      price: '₹199/month',
      amount: 199,
      tag: 'Most Popular',
      features: [
        'Full access to regular blog posts',
        'Archive access (last 3 months)',
        'Weekly newsletter',
        'Ad-free experience',
        'AI-generated summaries (max 300 words)',
        '2 exclusive posts per month',
        'Download PDFs/templates',
        'Priority comment visibility',
      ],
      color: 'border-yellow-400 bg-yellow-50',
    },
    {
      name: 'Premium',
      role: 'premium',
      price: '₹499/month',
      amount: 499,
      features: [
        'Everything in Medium Plan',
        'Full archive access (all time)',
        'Unlimited exclusive content',
        'Full AI-generated articles (long-form)',
        'Early access to new posts',
        'Monthly live Q&A/Webinar',
        'Private community access (Telegram/Discord)',
        'Personalized newsletter',
        'Direct email support',
        'Vote on future content',
      ],
      color: 'border-red-400 bg-red-50',
    },
  ];

  const handleSubscribe = (plan) => {
    if (currentUser?.role === plan.role) return; // Prevent opening modal
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 py-10'>
        <h2 className='text-3xl font-bold text-center mb-10'>Choose Your Plan</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between border rounded-lg p-6 shadow-sm hover:shadow-md transition ${plan.color}`}
            >
              <div>
                <h3 className='text-xl font-semibold mb-2'>{plan.name}</h3>
                <p className='text-2xl font-bold mb-4'>{plan.price}</p>
                {plan.tag && (
                  <span className='inline-block bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded mb-3'>
                    {plan.tag}
                  </span>
                )}
                <ul className='space-y-2 text-sm text-gray-700'>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      {feature.startsWith('❌') ? feature : `✅ ${feature}`}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-6 w-full py-2 rounded text-white font-medium ${
                  currentUser?.role === plan.role
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800'
                }`}
                onClick={() => handleSubscribe(plan)}
                disabled={currentUser?.role === plan.role}
              >
                {currentUser?.role === plan.role ? 'Already Subscribed' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && selectedPlan && (
        <Card selectedPlan={selectedPlan} showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
}

export default Payment;
