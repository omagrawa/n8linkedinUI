'use client';

import React from 'react';

// Analytics card component
const AnalyticsCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon 
}: { 
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900">
              {value}
            </div>
            <div className={`ml-2 flex items-baseline text-sm font-semibold ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-500'
            }`}>
              {trend === 'up' ? (
                <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              ) : trend === 'down' ? (
                <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="self-center flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="sr-only">
                {trend === 'up' ? 'Increased by' : trend === 'down' ? 'Decreased by' : 'No change'}
              </span>
              {trendValue}
            </div>
          </dd>
        </div>
      </div>
    </div>
  </div>
);

// Recent posts table component
const RecentPosts = ({ posts }: { posts: Array<{ id: string; date: string; content: string; likes: number; comments: number; shares: number }> }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Recent LinkedIn Posts
      </h3>
      <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
        View all
      </a>
    </div>
    <div className="border-t border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Likes
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comments
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shares
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {post.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.likes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.comments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.shares}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default function LinkedinStats() {
  // Dummy data for analytics
  const stats = [
    { 
      title: 'Total Engagement', 
      value: '8,425', 
      trend: 'up' as const, 
      trendValue: '12%', 
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      title: 'Profile Views', 
      value: '1,234', 
      trend: 'up' as const, 
      trendValue: '5.4%', 
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    { 
      title: 'New Connections', 
      value: '342', 
      trend: 'up' as const, 
      trendValue: '8.1%', 
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      title: 'Post Frequency', 
      value: '3.2/week', 
      trend: 'down' as const, 
      trendValue: '2.3%', 
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // Dummy data for recent posts
  const recentPosts = [
    {
      id: '1',
      date: 'May 22, 2025',
      content: 'Excited to announce our new product launch! Our team has been working tirelessly to bring this innovative solution to market.',
      likes: 345,
      comments: 42,
      shares: 18
    },
    {
      id: '2',
      date: 'May 18, 2025',
      content: 'Looking for talented developers to join our growing team! If you\'re passionate about creating impactful software solutions, we\'d love to hear from you.',
      likes: 128,
      comments: 28,
      shares: 12
    },
    {
      id: '3',
      date: 'May 15, 2025',
      content: 'We\'re thrilled to have reached 10,000 customers! Thank you for your continued support and trust in our services.',
      likes: 482,
      comments: 56,
      shares: 34
    },
    {
      id: '4',
      date: 'May 10, 2025',
      content: 'Sharing insights from our recent webinar on digital transformation. The key takeaway? Start with small, impactful changes rather than attempting a complete overhaul all at once.',
      likes: 215,
      comments: 32,
      shares: 15
    },
    {
      id: '5',
      date: 'May 5, 2025',
      content: 'Our team will be attending the annual tech conference next month. Looking forward to connecting with industry leaders and showcasing our latest innovations!',
      likes: 176,
      comments: 21,
      shares: 9
    }
  ];

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">LinkedIn Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Monitor your LinkedIn performance and engagement</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <AnalyticsCard
                key={index}
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                trendValue={stat.trendValue}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Recent Posts Table */}
          <div className="mt-8">
            <RecentPosts posts={recentPosts} />
          </div>

          {/* Creating New LinkedIn Post Button */}
          <div className="mt-8">
            <a 
              href="/linkedin" 
              className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New LinkedIn Post
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
