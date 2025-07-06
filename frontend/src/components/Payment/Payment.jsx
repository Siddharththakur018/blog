import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

function Payment() {
    const [showModal, setShowModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    // Card input states
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const { updatePlan } = useContext(AuthContext);

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
        setSelectedPlan(plan);
        setShowModal(true);
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!selectedPlan) return;

        setLoading(true);

        const payload = {
            amount: selectedPlan.amount,
            cardNumber,
            cardName,
            expiry,
            cvv,
            role: selectedPlan.role,
        };

        try {
            const response = await axios.post(
                'http://localhost:3000/api/payment/fake-payment',
                payload,
                { withCredentials: true }
            );

            const data = response.data;
            alert(`✅ ${data.message}\nYour new role is: ${data.role}`);
            updatePlan(data.role);
            setShowModal(false);

            // Reset form
            setCardNumber('');
            setCardName('');
            setExpiry('');
            setCvv('');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Payment failed';
            alert(`❌ ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`flex flex-col justify-between border rounded-lg p-6 shadow-sm hover:shadow-md transition ${plan.color}`}
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                            <p className="text-2xl font-bold mb-4">{plan.price}</p>
                            {plan.tag && (
                                <span className="inline-block bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded mb-3">
                                    {plan.tag}
                                </span>
                            )}
                            <ul className="space-y-2 text-sm text-gray-700">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>
                                        {feature.startsWith('❌') ? feature : `✅ ${feature}`}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className="mt-6 cursor-pointer w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                            onClick={() => handleSubscribe(plan)}
                        >
                            Subscribe Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Payment Modal */}
            {showModal && selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                            Enter Payment Details ({selectedPlan.name} Plan)
                        </h2>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name on Card
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiry (MM/YY)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="08/26"
                                        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="123"
                                        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {loading ? 'Processing...' : `Pay ₹${selectedPlan.amount}`}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 underline text-center"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment;
