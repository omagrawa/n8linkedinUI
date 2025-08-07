'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import { ChatProvider } from '../contexts/ChatContext';

export default function AiPostGeneratorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setIsLoading(false);
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
      <ChatProvider>
        <Navbar />
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: 'calc(100vh - 160px)' }}>
            <ChatBox />
          </div>
        </div>
      </ChatProvider>
    </div>
  );
}
