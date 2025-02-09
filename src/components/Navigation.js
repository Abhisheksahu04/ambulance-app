// components/Navigation.js
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">My App</div>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <a 
                href="/login" 
                className="text-blue-500 hover:underline"
              >
                Login
              </a>
              <a 
                href="/register" 
                className="text-green-500 hover:underline"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}