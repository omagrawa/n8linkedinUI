'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { API_BASE_URL, userId } from '../components/helpers/ConstExports';
import { useRouter } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';

// Define types
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

export interface GeneratedPost {
  id: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  estimatedEngagement?: string;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  generatedPost: GeneratedPost | null;
  sendMessage: (content: string, attachments?: Array<{id: string; name: string; url: string; type: string}>) => Promise<void>;
  uploadFile: (file: File) => Promise<{id: string; name: string; url: string; type: string} | null>;
  clearChat: () => void;
  resetGeneratedPost: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);

  const router = useRouter();
  const uuid= uuidv4();
  // Function to send a message and get a response
  const sendMessage = async (content: string, attachments?: Array<{id: string; name: string; url: string; type: string}>): Promise<void> => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return;
    
    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content,
      isUser: true,
      timestamp: new Date(),
      attachments: attachments
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Make API call to generate post
      const response = await axios.post(`${API_BASE_URL}/webhook/ai-linkedin-post`, {
        userId: localStorage.getItem('userId') || userId,
        userPrompt: content,
        generateFromLinkedin: false,
        chatSessionId: uuid,
        attachments: attachments
      });
      
      
      // Add bot response to the chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'ve generated a LinkedIn post based on your request. You can preview it and make any necessary adjustments before publishing.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      console.log("Generated post response:", response.data);
      // Set the generated post
      if (response.data) {
        router.push(`/linkedin-publish?chatsessionId=${uuid}`);
        // setGeneratedPost({
        //   id: response.data.id || Date.now().toString(),
        //   content: response.data.content || response.data.post || '',
        //   imageUrl: response.data.imageUrl,
        //   tags: response.data.tags || [],
        //   estimatedEngagement: response.data.estimatedEngagement || 'Medium'
        // });
      }
    } catch (error) {
      console.error('Error generating post:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while generating your post. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear chat history
  const clearChat = (): void => {
    setMessages([]);
    setGeneratedPost(null);
  };
  
  // Function to reset generated post
  const resetGeneratedPost = (): void => {
    setGeneratedPost(null);
  };

  // Function to upload files
  const uploadFile = async (file: File): Promise<{id: string; name: string; url: string; type: string} | null> => {
    try {

      console.log('Uploading file:', file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', localStorage.getItem('userId') || userId);
      formData.append('fileType', file.type);
      const response = await axios.post(`${API_BASE_URL}/webhook/train-file-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data && response.data.filePath) {
        return {
          id: response.data.id || uuidv4(),
          name: file.name,
          url: response.data.filePath,
          type: response.data.fileType
        };
      }
      return null;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  return (
    <ChatContext.Provider value={{
      messages,
      isLoading,
      generatedPost,
      sendMessage,
      uploadFile,
      clearChat,
      resetGeneratedPost
    }}>
      {children}
    </ChatContext.Provider>
  );
}

// Hook for using the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
