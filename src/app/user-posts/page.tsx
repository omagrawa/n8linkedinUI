'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useLinkedin } from '../contexts/LinkedinContext';

// Table row component to display individual user posts
const PostTableRow = ({ 
  username, 
  profileImage, 
  content, 
  timestamp, 

  status = 'Published' // Default status
}: { 
  username: string; 
  profileImage: string; 
  content: string; 
  timestamp: string; 

  status?: string;
}) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="py-4 px-6">
      <div className="flex items-center">
        <img 
          src={profileImage} 
          alt={username} 
          className="h-16 w-16 rounded mr-3 object-cover"
        />
      </div>
    </td>
    <td className="py-4 px-6">
      <div>
        <p className="font-semibold text-sm">{username}</p>
        <p className="text-xs text-gray-500 mb-1">{timestamp}</p>
        <p className="text-sm text-gray-800 line-clamp-2">{content}</p>
        <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
         
  
        </div>
      </div>
    </td>
    <td className="py-4 px-6 whitespace-nowrap">
      {status === 'published' && (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Published
        </span>
      )}
      {status === 'draft' && (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
          Draft
        </span>
      )}
      {status === 'scheduled' && (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          Scheduled
        </span>
      )}
    </td>
    <td className="py-4 px-6 text-right">
      <div className="flex justify-end space-x-2">
        <button className="text-gray-600 hover:text-gray-900 p-1" title="View">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </button>
        <button className="text-indigo-600 hover:text-indigo-900 p-1" title="Edit">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </button>
        <button className="text-red-600 hover:text-red-900 p-1" title="Delete">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </td>
  </tr>
);

export default function UserPosts() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);

  const {userPosts} = useLinkedin();

  console.log("userPosts22", userPosts);

  // Sample posts data - in a real app, this would come from an API
  const samplePosts = [
    {
      id: 1,
      username: "John Doe",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Just finished a great presentation on AI integration in modern workflows. The audience was really engaged and had some fantastic questions!",
      timestamp: "2 hours ago",
      likes: 42,
      comments: 7
    },
    {
      id: 2,
      username: "Sarah Johnson",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Excited to announce that our team has successfully completed the new product launch. Looking forward to seeing how our users respond to the new features.",
      timestamp: "5 hours ago",
      likes: 78,
      comments: 15
    },
    {
      id: 3,
      username: "Robert Chen",
      profileImage: "https://randomuser.me/api/portraits/men/76.jpg",
      content: "Just published my latest article on LinkedIn about growth strategies for startups in 2025. Check it out and let me know your thoughts!",
      timestamp: "Yesterday",
      likes: 124,
      comments: 23
    },
    {
      id: 4,
      username: "Emily Davis",
      profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
      content: "Had an inspiring meeting with potential investors today. It's amazing how much progress we've made in just a few months. #StartupLife #Funding",
      timestamp: "2 days ago",
      likes: 89,
      comments: 11
    },
    {
      id: 5,
      username: "Alex Thompson",
      profileImage: "https://randomuser.me/api/portraits/men/41.jpg",
      content: "Looking for recommendations on project management tools for remote teams. What has worked well for your organization?",
      timestamp: "3 days ago",
      likes: 35,
      comments: 42
    }
  ];

  // Check authentication on component mount and load posts
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setIsLoading(false);
        // In a real app, you would fetch posts from an API here
        setPosts(userPosts);
      }
    };

    checkAuth();
  }, [router, userPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">User Posts</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
    
            
            {/* User Posts Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">User Posts</h2>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>All Posts</option>
                    <option>My Posts</option>
                    <option>Recent</option>
                  </select>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                    Filter
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thumbnail
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <PostTableRow 
                        key={post.id}
               
                        profileImage={post.imageUrl}
                        content={post.postDetails}
                        timestamp={post.createdAt}

                        status={post.status}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t">
                <div className="flex-1 flex justify-between sm:hidden">
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-indigo-600 hover:bg-gray-50">
                        1
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        4
                      </a>
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
