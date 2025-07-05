import React, { useEffect, useState } from 'react';
import { Phone, Envelope, MapPinLine, User, Buildings, PhoneCall } from 'phosphor-react';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { IoIosArrowDropdown } from "react-icons/io";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function ContactUs() {
  const [inquiryOption, setInquiryOption] = useState([]);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState('');
  const [desciptionOption, setDesciptionOption] = useState([]);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [organisation, setOrganisation] = useState('');

  const optionData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/contact/dropdown-options');
      setInquiryOption(response.data.inquiryOption);
      setDesciptionOption(response.data.desciptionOption);
    } catch (error) {
      console.error('Error occurred', error);
    }
  };

  useEffect(() => {
    optionData();
  }, []);

  const validateForm = () => {
    if (!selectedInquiry || !selectedDescription || !name || !mail || !organisation || !number || !message) {
      toast.error("Please fill in all the fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      toast.error("Enter a valid email address.");
      return false;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      toast.error("Enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };


  const submitForm = async() => {
    try {
      const payload = {
        inquiryPurpose: selectedInquiry,
        descriptionType: selectedDescription,
        fullName: name,
        email: mail,
        phoneNumber: number,
        organization: organisation,
        message: message,
      }
      const response = await axios.post('http://localhost:3000/api/contact/contact-form', payload,{
        withCredentials: true
        }
      );

       if (response.status === 200 || response.status === 201) {
        toast.success("Form submitted successfully!");
        setSelectedInquiry('');
        setSelectedDescription('');
        setName('');
        setMail('');
        setOrganisation('');
        setNumber('');
        setMessage('');
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } catch (error) {
      console.error('Error occured', error)
    }
  }

  return (
    <>
      <div className="w-full max-w-5xl mx-auto py-10 px-4 ">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="text-4xl font-bold text-center mb-10 text-black">Let's Get In Touch</div>
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-center text-black">
          <div className="flex flex-col items-center gap-2">
            <Phone size={28} color="black" weight="fill" />
            <div className="text-lg font-medium">+91 99999 99999</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Envelope size={28} color="black" weight="fill" />
            <div className="text-lg font-medium">inquiry@nextgenwrites.com</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPinLine size={28} color="black" weight="fill" />
            <div className="text-lg font-medium">123 ABC DJJS</div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] shadow-lg rounded-lg p-8 text-white">
          <h2 className="text-2xl font-semibold mb-6">Or fill out the form below</h2>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Inquiry Purpose</label>
              <div className="relative">
                <div className='flex w-full px-4 py-2 border border-gray-600 rounded cursor-pointer justify-between items-center bg-[#2a2a2a]' onClick={() => setIsInquiryOpen(prev => !prev)}>
                  <HiMiniQuestionMarkCircle className="text-gray-400" />
                  <span className="flex-1 mx-2">{selectedInquiry || "Choose one option..."}</span>
                  <IoIosArrowDropdown className={`transition-transform duration-300 text-gray-400 ${isInquiryOpen ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                {isInquiryOpen && (
                  <ul className="absolute custom-scroll bg-[#2a2a2a] border border-gray-600 mt-1 w-full p-2 z-10 max-h-48 overflow-y-auto shadow-lg rounded">
                    {inquiryOption.map((option, index) => (
                      <li key={index} className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded" onClick={() => { setSelectedInquiry(option); setIsInquiryOpen(false); }}>{option}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">General Questions</label>
              <div className="relative">
                <div className='flex w-full px-4 py-2 border border-gray-600 rounded cursor-pointer justify-between items-center bg-[#2a2a2a]' onClick={() => setIsDescriptionOpen(prev => !prev)}>
                  <HiMiniQuestionMarkCircle className="text-gray-400" />
                  <span className="flex-1 mx-2">{selectedDescription || "Choose one option..."}</span>
                  <IoIosArrowDropdown className={`transition-transform duration-300 text-gray-400 ${isDescriptionOpen ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                {isDescriptionOpen && (
                  <ul className="absolute custom-scroll bg-[#2a2a2a] border border-gray-600 mt-1 w-full p-2 z-10 max-h-48 overflow-y-auto shadow-lg rounded">
                    {desciptionOption.map((option, index) => (
                      <li key={index} className="px-4 py-2 hover:bg-gray-700 cursor-pointer rounded" onClick={() => { setSelectedDescription(option); setIsDescriptionOpen(false); }}>{option}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <User size={20} /> Full Name
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name" className="w-full px-4 py-3 rounded bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Envelope size={20} /> Email
              </label>
              <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Enter Email" className="w-full px-4 py-3 rounded bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Buildings size={20} /> Organisation
              </label>
              <input type="text" value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder="Enter Organisation" className="w-full px-4 py-3 rounded bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <PhoneCall size={20} /> Phone Number
              </label>
              <input type="tel" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Enter Phone Number" className="w-full px-4 py-3 rounded bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message" className="w-full px-4 py-3 min-h-[120px] rounded bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="text-right">
            <button onClick={submitForm} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
