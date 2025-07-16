import React from 'react';
import { GoStarFill } from "react-icons/go";
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import image5 from '../../assets/image5.png';
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";

function OurStory() {
    const teamMembers = [
        {
            name: "Alice Kumar",
            role: "AI Content Strategist",
            description: "Alice blends creativity with machine learning to craft meaningful, optimized blog experiences. She's passionate about helping writers harness AI to tell richer, more authentic stories that still rank.",
            image: image2,
            instagram: "/",
            linkedin: "/",
            twitter: "/",
        },
        {
            name: "Ravi Patel",
            role: "Technical Co-founder",
            description: "Ravi architects the core of NextGenWrites — ensuring the platform runs fast, scales smoothly, and supports creators at any level. He thrives at the intersection of AI and decentralization.",
            image: image1,
            instagram: "/",
            linkedin: "/",
            twitter: "/",
        },
        {
            name: "Meera Shah",
            role: "Product Designer",
            description: "With an eye for elegance and empathy, Meera designs interfaces that are intuitive and inclusive. She believes that every interaction with tech should feel effortless and empowering.",
            image: image3,
            instagram: "/",
            linkedin: "/",
            twitter: "/",
        },
        {
            name: "Daniel Chen",
            role: "Community Lead",
            description: "Daniel brings our community to life—hosting events, managing creator spaces, and ensuring everyone feels heard. He’s a builder of bridges between ideas and people.",
            image: image1,
            instagram: "/",
            linkedin: "/",
            twitter: "/",
        },
        {
            name: "Sofia Lopez",
            role: "Marketing Strategist",
            description: "Sofia crafts campaigns that connect. She’s driven by storytelling, data, and the belief that authenticity drives the best engagement. Her work helps creators find their voice and audience.",
            image: image4,
            instagram: "/",
            linkedin: "/",
            twitter: "/",
        },
        {
            name: "Omar Farouk",
            role: "Backend Engineer",
            description: "Omar keeps the engine running behind the scenes. From secure APIs to robust publishing infrastructure, he ensures the platform is always fast, safe, and scalable for the future.",
            image: image1,
            instagram: "/",
            linkedin: "/",
            twitter: "/",
        },
        {
            name: "Lina Wu",
            role: "Content Operations",
            description: "Lina oversees the flow of ideas—curating, editing, and ensuring quality across our platform. She bridges editorial standards with AI efficiency, keeping content thoughtful and sharp.",
            image: image5,
            instagram: "/",
            linkedin: "/",
            twitter: "/",
        },
    ];

    const firstRow = teamMembers.slice(0, 4);
    const secondRow = teamMembers.slice(4);

    const getHoverColor = (index) => {
        const colors = ['#ffe4e6', '#fef9c3', '#d1fae5', '#e0f2fe', '#ede9fe', '#fef3c7', '#f3e8ff'];
        return colors[index % colors.length];
    };

    return (
        <div className='w-[1200px] mx-auto p-4'>
            <div>
                <div className='flex gap-5 items-center mb-4 mt-10'>
                    <GoStarFill className='text-4xl' />
                    <p className='border rounded-xl text-xl p-2 font-semibold w-20 text-center'>Who</p>
                    <p className='border rounded-xl text-xl p-2 font-semibold w-20 text-center'>We</p>
                    <p className='border rounded-xl text-xl p-2 font-semibold w-20 text-center'>Are</p>
                </div>
                <div className='text-8xl mb-4 mt-10 font-semibold'>
                    <p>A TEAM OF</p>
                    <p>BLOG EXPERTS</p>
                </div>
                <hr className='mb-10' />
                <div className='flex gap-10 items-center'>
                    <div>
                        <p className='uppercase font-semibold w-96'>
                            NextGenWrites started as a simple idea to make blogging smarter and faster—evolving into a full platform powered by AI, and open publishing.
                        </p>
                    </div>
                    <div>
                        <p className='w-[750px]'>
                            At <strong>NextGenWrites</strong>, we’re redefining digital storytelling by combining the power of AI, and open publishing. Our mission is to empower creators and readers through decentralized tools, content ownership, and smarter writing experiences. We believe in open access, transparent systems, and a future where anyone can share their voice without barriers. By merging technology with creativity, we’re building a platform that values authenticity, community, and the freedom to create without limits.
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-16 space-y-16'>
                <div className='flex justify-center gap-6'>
                    {firstRow.map((item, index) => (
                        <div key={index} className='flex flex-col items-center'>
                            <div
                                className='w-64 h-72 relative group border rounded-4xl overflow-hidden shadow-md transition-colors duration-300 cursor-pointer'
                                style={{ '--hover-color': getHoverColor(index) }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className='w-64 h-full object-cover group-hover:hidden transition duration-300'
                                />
                                <div
                                    className='absolute inset-0 p-8 flex flex-col justify-between 
                                        transform translate-y-full opacity-0 
                                        group-hover:translate-y-0 group-hover:opacity-100 
                                        transition-all duration-700 ease-in-out overflow-y-auto'
                                    style={{ backgroundColor: `var(--hover-color)` }}
                                >
                                    <div>
                                        <p className='text-sm text-gray-700'>{item.description}</p>
                                    </div>
                                    <div className='flex gap-4 mt-4 text-sm justify-center items-center'>
                                        <a href={item.instagram} target='_blank' rel='noopener noreferrer' className='text-4xl'><LuInstagram /></a>
                                        <a href={item.linkedin} target='_blank' rel='noopener noreferrer' className='text-4xl'><FaLinkedin /></a>
                                        <a href={item.twitter} target='_blank' rel='noopener noreferrer' className='text-4xl'><FaTwitter /></a>
                                    </div>
                                </div>
                            </div>
                            <h3 className='text-lg font-bold mb-2'>{item.name}</h3>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center gap-6'>
                    {secondRow.map((item, index) => (
                        <div key={index + 4} className='flex flex-col items-center'>
                            <div
                                className='w-64 h-72 relative group border rounded-4xl overflow-hidden shadow-md transition-colors duration-300 cursor-pointer'
                                style={{ '--hover-color': getHoverColor(index + 4) }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className='w-64 h-full object-cover group-hover:hidden transition duration-300'
                                />
                                <div
                                    className='absolute inset-0 p-8 flex flex-col justify-between 
                                        transform translate-y-full opacity-0 
                                        group-hover:translate-y-0 group-hover:opacity-100 
                                        transition-all duration-700 ease-in-out overflow-y-auto'
                                    style={{ backgroundColor: `var(--hover-color)` }}
                                >
                                    <div>
                                        <p className='text-sm text-gray-700'>{item.description}</p>
                                    </div>
                                    <div className='flex gap-4 mt-4 text-sm justify-center items-center'>
                                        <a href={item.instagram} target='_blank' rel='noopener noreferrer' className='text-4xl'><LuInstagram /></a>
                                        <a href={item.linkedin} target='_blank' rel='noopener noreferrer' className='text-4xl'><FaLinkedin /></a>
                                        <a href={item.twitter} target='_blank' rel='noopener noreferrer' className='text-4xl'><FaTwitter /></a>
                                    </div>
                                </div>
                            </div>
                             <h3 className='text-lg font-bold mb-2'>{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OurStory;
