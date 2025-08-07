'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import LinkedinPostGenerator from '../components/LinkedinPostGenerator';
import { LinkedinProvider } from '../contexts/LinkedinContext';
import { PostSuggestion } from '../contexts/LinkedinContext';

export default function LinkedinPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [draftPost, setDraftPost] = useState<PostSuggestion | null>(null);

  // Check authentication on component mount and load draft if available
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        // Check for draft post from AI generator
        const savedDraft = localStorage.getItem('draftPost');
        if (savedDraft) {
          try {
            const parsedDraft = JSON.parse(savedDraft);
            setDraftPost(parsedDraft);
            // Clear the draft from localStorage once loaded
            localStorage.removeItem('draftPost');
          } catch (error) {
            console.error('Error parsing draft post:', error);
          }
        }
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
      <LinkedinProvider>
        <Navbar />
        <LinkedinPostGenerator initialDraft={draftPost} />
      </LinkedinProvider>
    </div>
  );
}
