'use client';

import { useEffect, useState } from 'react';
import { useChannels, Channel } from '../contexts/ChannelsContext';
import axios from 'axios';
import { API_BASE_URL } from './helpers/ConstExports';

// Component for a connected channel card
const ConnectedChannelCard = ({ 
  channel, 
  onDisconnect 
}: { 
  channel: Channel; 
  onDisconnect: (id: string) => void;
}) => (
  <div className="bg-white shadow rounded-lg p-6 transition-all hover:shadow-md">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        {channel.profileImage ? (
          <img 
            src={channel.profileImage} 
            alt={channel.name} 
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white
            ${channel.channel === 'linkedin' ? 'bg-blue-600' : 
              channel.channel === 'instagram' ? 'bg-pink-600' : 
              'bg-blue-800'}`}
          >
            {channel.channel === 'linkedin' ? 'Li' : 
              channel.channel === 'instagram' ? 'In' : 'Fb'}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="te   xt-lg font-semibold text-gray-900 truncate">
          {channel.userName }
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {/* Connected {channel.connectedAt?.toLocaleDateString()} */}
        </p>
      </div>
      <div className="flex space-x-2">
        {channel.profileUrl && (
          <a 
            href={channel.profileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            title="View Profile"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
        <button 
          onClick={() => onDisconnect(channel.id)}
          className="inline-flex items-center p-1 border border-gray-300 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none"
          title="Disconnect"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
    <div className="mt-4 flex justify-between">
      <span className={`px-2 py-1 text-xs font-medium rounded-full
        ${channel.status === 'connected' ? 'bg-green-200 text-green-800' : 
          channel.status === 'disconnected' ? 'bg-pink-100 text-pink-800' : 
          'bg-blue-100 text-blue-800'}`}
      >
        {channel.status}
      </span>
      <span className="text-xs text-gray-500">
        ID: {channel.channel_userId}
      </span>
    </div>
  </div>
);

// Component for channel connection button
const ConnectChannelButton = ({ 
  type, 
  onConnect 
}: { 
  type: 'linkedin' | 'instagram' | 'facebook'; 
  onConnect: () => void;
}) => {
  const getBgColor = () => {
    switch (type) {
      case 'linkedin': 
        return 'bg-blue-600 hover:bg-blue-700';
      case 'instagram': 
        return 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600';
      case 'facebook': 
        return 'bg-blue-800 hover:bg-blue-900';
      default: 
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'linkedin':
        return (
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        );
    }
  };

  return (
    <button
      onClick={onConnect}
      className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${getBgColor()} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      {getIcon()}
      Connect {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );
};

export default function ChannelsManager() {
  const { 
    channels, 
    isLoading, 
    error, 
    connectChannel, 
    disconnectChannel,
    refreshChannels
  } = useChannels();

  console.log("channels", channels)

  const [isDisconnecting, setIsDisconnecting] = useState<string | null>(null);
  const [disconnectError, setDisconnectError] = useState<string | null>(null);

  // Handle disconnect action
  const handleDisconnect = async (id: string) => {
    if (window.confirm('Are you sure you want to disconnect this channel?')) {
      setIsDisconnecting(id);
      setDisconnectError(null);
      
      try {
        await axios.patch(`${API_BASE_URL}/webhook/disconnectChannel?id=${id}`);
        refreshChannels(); // Refresh channels after disconnect
      } catch (err) {
        console.error(err);
        setDisconnectError('An unexpected error occurred.');
      } finally {
        setIsDisconnecting(null);
      }
    }
  };

  // Filter channels by type
  const linkedinChannels = channels?.filter(channel => channel.channel === 'linkedin');
  const instagramChannels = channels?.filter(channel => channel.channel === 'instagram');
  const facebookChannels = channels?.filter(channel => channel.channel === 'facebook');

  console.log("isLoading", isLoading)
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Channel Integrations</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your connected social media accounts</p>
            </div>
            <button
              onClick={() => refreshChannels()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Error messages */}
          {(error || disconnectError) && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error || disconnectError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LinkedIn Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-600">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </h2>
              
              {linkedinChannels.length > 0 ? (
                <div className="space-y-4">
                  {linkedinChannels.map(channel => (
                    <ConnectedChannelCard
                      key={channel.id}
                      channel={channel}
                      onDisconnect={handleDisconnect}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center">
                  <svg className="h-12 w-12 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <p className="text-gray-600 mb-6">No LinkedIn accounts connected</p>
                  <ConnectChannelButton
                    type="linkedin"
                    onConnect={() => connectChannel('linkedin')}
                  />
                </div>
              )}
              
              {linkedinChannels.length > 0 && (
                <div className="mt-4">
                  <ConnectChannelButton
                    type="linkedin"
                    onConnect={() => connectChannel('linkedin')}
                  />
                </div>
              )}
            </div>
            
            {/* Instagram Section */}
            {/* <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-pink-600">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </h2>
              
              {instagramChannels.length > 0 ? (
                <div className="space-y-4">
                  {instagramChannels.map(channel => (
                    <ConnectedChannelCard
                      key={channel.id}
                      channel={channel}
                      onDisconnect={handleDisconnect}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center">
                  <svg className="h-12 w-12 text-pink-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <p className="text-gray-600 mb-6">No Instagram accounts connected</p>
                  <ConnectChannelButton
                    type="instagram"
                    onConnect={() => connectChannel('instagram')}
                  />
                </div>
              )}
              
              {instagramChannels.length > 0 && (
                <div className="mt-4">
                  <ConnectChannelButton
                    type="instagram"
                    onConnect={() => connectChannel('instagram')}
                  />
                </div>
              )}
            </div> */}
            
            {/* Facebook Section */}
            {/* <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
                Facebook
              </h2>
              
              {facebookChannels.length > 0 ? (
                <div className="space-y-4">
                  {facebookChannels.map(channel => (
                    <ConnectedChannelCard
                      key={channel.id}
                      channel={channel}
                      onDisconnect={handleDisconnect}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center">
                  <svg className="h-12 w-12 text-blue-800 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                  <p className="text-gray-600 mb-6">No Facebook accounts connected</p>
                  <ConnectChannelButton
                    type="facebook"
                    onConnect={() => connectChannel('facebook')}
                  />
                </div>
              )}
              
              {facebookChannels.length > 0 && (
                <div className="mt-4">
                  <ConnectChannelButton
                    type="facebook"
                    onConnect={() => connectChannel('facebook')}
                  />
                </div>
              )}
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
