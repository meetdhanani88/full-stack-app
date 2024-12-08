import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    else if(isAuthenticated) {
      setMessage("done")
    }

    // const fetchProtectedData = async () => {
    //   try {
    //     const response = await fetch('https://full-stack-app-rho.vercel.app/api/protected', {
    //       credentials: 'include',
    //     });
    //     const data = await response.json();
    //     setMessage(data.message);
    //   } catch (error) {
    //     console.error('Error fetching protected data:', error);
    //   }
    // };

    // fetchProtectedData();
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Shield className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold ml-2">Dashboard</h2>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">{message}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Welcome to your dashboard!</h3>
          <p className="text-gray-600">
            This is a protected route that can only be accessed by authenticated users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;