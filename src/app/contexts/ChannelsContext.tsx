'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL, linkedInRedirectUri, userId } from '../components/helpers/ConstExports';
import axios from 'axios';

// Define types for channel integrations
export interface Channel {
  id: string;
  name: string;
  type: 'linkedin' | 'instagram' | 'facebook';
  connected: boolean;
  connectedAt?: Date;
  profileUrl?: string;
  profileImage?: string;
  username?: string;
}

interface ChannelsContextType {
  channels: Channel[];
  isLoading: boolean;
  error: string | null;
  connectChannel: (type: 'linkedin' | 'instagram' | 'facebook') => void;
  disconnectChannel: (id: string) => Promise<boolean>;
  refreshChannels: () => Promise<void>;
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(undefined);

// Dummy data for connected channels
const INITIAL_CHANNELS: Channel[] = [
  {
    id: 'linkedin-1',
    name: 'LinkedIn Company Page',
    type: 'linkedin',
    connected: true,
    connectedAt: new Date('2025-05-10'),
    profileUrl: 'https://linkedin.com/company/acme',
    profileImage: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    username: 'ACME Corporation',
  },
];

export function ChannelsProvider({ children }: { children: ReactNode }) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize channels on mount
      const loadChannels = async() => {

      try {
              setIsLoading(true);
        // Check if we have channels in localStorage
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
            setChannels(data || []);
            setIsLoading(false)
      } catch (err) {
        console.error('Failed to load channels:', err);
        setError('Failed to load connected channels');
        // setChannels(INITIAL_CHANNELS);
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => {
    // Simulate loading from localStorage or session


    loadChannels();
  }, []);

  // Function to connect a new channel
  const connectChannel = (type: 'linkedin' | 'instagram' | 'facebook') => {
    // OAuth URLs
    const oauthUrls = {
      linkedin: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86fmll6j0dj3yn&redirect_uri=${linkedInRedirectUri}&scope=openid%20email%20profile%20w_member_social`,
      instagram: 'https://api.instagram.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile,user_media&response_type=code',
      facebook: 'https://www.facebook.com/v13.0/dialog/oauth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=random_state_string&scope=public_profile,email,pages_show_list,pages_read_engagement',
    };

    // Open OAuth link in a new tab
    window.open(oauthUrls[type], '_blank');
    
    // In a real implementation, you would handle the OAuth callback and token exchange
    // Here we just simulate adding a new channel after a delay
    loadChannels();
  };

  // Function to disconnect a channel
  const disconnectChannel = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
 
      return true;
    } catch (err) {
      console.error('Failed to disconnect channel:', err);
      setError('Failed to disconnect channel');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh channels
  const refreshChannels = async (): Promise<void> => {

    
    try {
      // Simulate API call
        setIsLoading(true);
    loadChannels();

      
      // In a real app, you would fetch updated channel data from the server
      // Here we just simulate a refresh by using the current data
     
    } catch (err) {
      console.error('Failed to refresh channels:', err);
      setError('Failed to refresh channel data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChannelsContext.Provider 
      value={{
        channels,
        isLoading,
        error,
        connectChannel,
        disconnectChannel,
        refreshChannels
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
}

// Custom hook to use channels context
export const useChannels = () => {
  const context = useContext(ChannelsContext);
  if (context === undefined) {
    throw new Error('useChannels must be used within a ChannelsProvider');
  }
  return context;
};
