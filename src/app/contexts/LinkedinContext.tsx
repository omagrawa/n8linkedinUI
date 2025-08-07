'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { API_BASE_URL, userId } from '../components/helpers/ConstExports';

// Define types for LinkedIn posts/suggestions
export interface PostSuggestion {
  id: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  estimatedEngagement?: string;
}

interface LinkedinContextType {
  suggestions: PostSuggestion[];
  selectedSuggestion: PostSuggestion | null;
  isLoading: boolean;
  error: string | null;
  fetchSuggestions: () => Promise<void>;
  selectSuggestion: (suggestion: PostSuggestion) => void;
  publishPost: (post: PostSuggestion) => Promise<boolean>;
  addCustomPost: (post: PostSuggestion) => void;
  generateImageHandle: (imagePrompt: string) => Promise<void>;
  userPosts: any;
}

const LinkedinContext = createContext<LinkedinContextType | undefined>(undefined);

// Dummy data for suggestions
const DUMMY_SUGGESTIONS: PostSuggestion[] = [
  {
    id: '1',
    content: 'Excited to announce our new product launch! Our team has been working tirelessly to bring this innovative solution to market. #ProductLaunch #Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    tags: ['ProductLaunch', 'Innovation'],
    estimatedEngagement: 'High',
  },
  {
    id: '2',
    content: 'Looking for talented developers to join our growing team! If you\'re passionate about creating impactful software solutions, we\'d love to hear from you. #Hiring #TechJobs',
    tags: ['Hiring', 'TechJobs'],
    estimatedEngagement: 'Medium',
  },
  {
    id: '3',
    content: 'We\'re thrilled to have reached 10,000 customers! Thank you for your continued support and trust in our services. #Milestone #CustomerSuccess',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    tags: ['Milestone', 'CustomerSuccess'],
    estimatedEngagement: 'Very High',
  },
  {
    id: '4',
    content: 'Sharing insights from our recent webinar on digital transformation. The key takeaway? Start with small, impactful changes rather than attempting a complete overhaul all at once. #DigitalTransformation #BusinessTips',
    tags: ['DigitalTransformation', 'BusinessTips'],
    estimatedEngagement: 'Medium',
  },
];

export function LinkedinProvider({ children }: { children: ReactNode }) {
  const [suggestions, setSuggestions] = useState<PostSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<PostSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState([]); // Initialize with dummy data

  const router = useRouter();
  const searchParams = useSearchParams();

  console.log("selectedSuggestion", selectedSuggestion)

  // Function to fetch suggestions (simulated API call)
  const fetchSuggestions = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay

       let response =  await axios.get(`
${API_BASE_URL}/webhook/getUserAIPosts?chatSessionId=${searchParams.get('chatsessionId')}`)


if(response.data){
    setSuggestions(response.data);
}

    } catch (err) {
      setError('Failed to fetch LinkedIn post suggestions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


    // Function to fetch suggestions (simulated API call)
  const generateImageHandle = async (imagePropt:any): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay

       let response =  await axios.post(`
${API_BASE_URL}/webhook/generate-image`,{
  chatSessionId: searchParams.get('chatsessionId'),
  imagePrompt: imagePropt
})

console.log("Image response",response);


if(response.data){
   let newSelectedSuggestion:any = selectedSuggestion;

   newSelectedSuggestion = {
      ...newSelectedSuggestion,
      imageUrl: response.data.imageUrl
    };
    setSelectedSuggestion(newSelectedSuggestion);
  
}

    } catch (err) {
      setError('Failed to fetch LinkedIn post suggestions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to select a suggestion
  const selectSuggestion = (suggestion: PostSuggestion): void => {
    setSelectedSuggestion(suggestion);
  };

  // Function to add a custom post from AI generator
  const addCustomPost = (post: PostSuggestion): void => {
    // Add the custom post to suggestions
    setSuggestions(prev => [post, ...prev]);
    
    // Select the newly added post
    setSelectedSuggestion(post);
  };

  // Function to publish a post (simulated API call)
  const publishPost = async (post: PostSuggestion): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
    //   await new Promise(resolve => setTimeout(resolve, 1500));

    await axios.post(`${API_BASE_URL}/webhook/PostLinkedAPI`,{
        userId: userId,
        postDetails: post.postDetails,
        imageUrl: post.imageUrl,
        chatSessionId: searchParams.get('chatsessionId'),
        imagePost: post.imageUrl ? true : false
    })
      
      // Simulate successful post
      console.log('Post published:', post);
      return true;
    } catch (err) {
      setError('Failed to publish LinkedIn post');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call to fetch user posts
      const response = await axios.get(`${API_BASE_URL}/webhook/getUserPosts?userId=${userId}`);
      if (response.data) {

        console.log("User posts response", response.data);

        setUserPosts(response.data);
        // setSuggestions(response.data);
      }
    } catch (err) {
      setError('Failed to fetch user posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    getUserPosts();
  },[])

  return (
    <LinkedinContext.Provider 
      value={{
        suggestions,
        selectedSuggestion,
        isLoading,
        error,
        fetchSuggestions,
        selectSuggestion,
        publishPost,
        generateImageHandle,
        userPosts
      }}
    >
      {children}
    </LinkedinContext.Provider>
  );
}

// Custom hook to use LinkedIn context
export const useLinkedin = () => {
  const context = useContext(LinkedinContext);
  if (context === undefined) {
    throw new Error('useLinkedin must be used within a LinkedinProvider');
  }
  return context;
};
