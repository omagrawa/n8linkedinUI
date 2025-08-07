'use client';

import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">Ripple AI Test</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/dashboard"
                  className={`${window.location.pathname === '/dashboard' ? 'bg-indigo-700' : 'text-indigo-200 hover:bg-indigo-700'} text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Dashboard
                </a>
                <a
                  href="/channels"
                  className={`${window.location.pathname === '/channels' ? 'bg-indigo-700' : 'text-indigo-200 hover:bg-indigo-700'} text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Channels
                </a>
                <a
                  href="/ai-post-generator"
                  className={`${window.location.pathname === '/ai-post-generator' ? 'bg-indigo-700' : 'text-indigo-200 hover:bg-indigo-700'} text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Create Post
                </a>
                <a
                  href="/user-posts"
                  className={`${window.location.pathname === '/user-posts' ? 'bg-indigo-700' : 'text-indigo-200 hover:bg-indigo-700'} text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  User Posts
                </a>

                {/* <a
                  href="/linkedin-analytics"
                  className={`${window.location.pathname === '/linkedin-analytics' ? 'bg-indigo-700' : 'text-indigo-200 hover:bg-indigo-700'} text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Analytics
                </a>
                <a
                  href="#"
                  className="text-indigo-200 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Settings
                </a> */}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-white mr-4">
              Welcome, <span className="font-semibold">Admin</span>
            </div>
            <button
              onClick={logout}
              className="bg-indigo-700 p-2 rounded-md text-white hover:bg-indigo-800 focus:outline-none"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
