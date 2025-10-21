import React from 'react';
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-gradient-to-br to-gray-400 from-blue-300 min-h-screen flex flex-col items-center justify-center'>
      <div className='bg-transparent rounded-xl shadow-lg p-10 max-w-3xl text-center min-w-screen'>
        
        {/* Header / Hero */}
        <div className='mb-8'>
          <img 
            src="/logo.jpg" 
            alt="Notes+ application logo in modern purple and blue gradient" 
            className="h-20 mx-auto mb-4"
          />
          <h1 className='text-4xl font-bold mb-2'>Welcome to <span className='text-indigo-600'>Notes+</span></h1>
          <p className='text-lg text-gray-700'>Your Ultimate Productivity Companion</p>
        </div>

        {/* Dashboard Preview */}
        <div className='mb-8'>
          <img 
            src="dashboard.png" 
            alt="Modern dashboard interface of Notes+ showing notes, todo lists, and calendar integration"
            className='w-full rounded-lg shadow-md'
          />
        </div>

        {/* Features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <FeatureCard 
            icon="fas fa-edit"
            title="Rich Notes"
            description="Create beautiful notes with markdown support and custom categories."
          />
          <FeatureCard 
            icon="fas fa-tasks"
            title="Smart Todos"
            description="Prioritize tasks with deadlines, reminders, and progress tracking."
          />
          <FeatureCard 
            icon="fas fa-sync"
            title="Real-time Sync"
            description="Access your data anywhere with secure cloud synchronization."
          />
        </div>

        {/* Call to Action */}
        <div className='mb-8'>
          <h2 className='text-3xl font-bold mb-4'>Start Organizing Today</h2>
          <button 
            onClick={() => navigate('/signup')}
            className='bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gradient-to-tr to-white from-blue-400 transition duration-300'
          >
            Sign Up
          </button>
        </div>

        {/* Developed By Section */}
        <div className='mt-12 p-6 bg-indigo-50 rounded-xl shadow-inner flex flex-col items-center'>
        <h2 className='text-2xl font-bold mb-2 text-indigo-600'>Developed By</h2>
        <img 
            src="/profile.jpg" 
            alt="Chinnam Mallikarjunarao" 
            className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-indigo-400"
        />
        <h3 className='text-xl font-semibold mb-1'>Chinnam Mallikarjunarao</h3>
        <p className='text-gray-700 max-w-xl text-center mb-3'>
            Full-Stack MERN Developer passionate about building interactive web applications. 
            This project showcases my skills in React, Node.js, Express, MongoDB, and modern UI/UX design.
        </p>

        {/* Contact Links */}
        <div className='flex gap-4'>
            <a 
            href="https://wa.me/916305182354"  // replace Xs with your WhatsApp number
            target="_blank" 
            rel="noopener noreferrer"
            className='flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'
            >
            <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a 
            href="mailto:chinnammallikarjunarao.99@gmail.com" // replace with your email
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
            >
            <i className="fas fa-envelope"></i> Email
            </a>
        </div>

        {/* LinkedIn Link */}
        <a 
            href="https://www.linkedin.com/in/your-linkedin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className='mt-3 text-indigo-700 font-semibold hover:underline'
        >
            Connect on LinkedIn
        </a>
        </div>

      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center
      transition-all hover:-translate-y-2 hover:shadow-lg">
      <div className="mb-4 text-indigo-600 text-3xl">
        <i className={icon} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default IntroPage;
