'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import ChannelsManager from '../components/ChannelsManager';
import { ChannelsProvider } from '../contexts/ChannelsContext';
import axios from 'axios';
import { API_BASE_URL, userId } from '../components/helpers/ConstExports';

export default function ChannelsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [channelsData, setChannelsData] = useState<any[]>([]);


    // Fetch channels data from the API  https://srinivasdev.app.n8n.cloud/webhook-test/getUserChannels get method
    const fetchChannelsData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE_URL}/webhook/getUserChannels?userId=${localStorage.getItem('userId') || userId}`, {
                headers: {
                    'Content-Type': 'application/json',

                }
            });

            // if (!response.ok) {
            // throw new Error('Network response was not ok');
            // }

            const data = response.data;
            console.log('Fetched channels data:', response.data);
            setChannelsData(data);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching channels data:', error);
        }
    };


  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setIsLoading(false);
        fetchChannelsData();
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ChannelsProvider>
        <Navbar />
        <ChannelsManager />
      </ChannelsProvider>
    </div>
  );
}
