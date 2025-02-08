'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        router.push('/login'); // Redirect to login page after successful logout
      } catch (error) {
        console.error('Logout error:', error);
        // Still redirect to login even if there's an error
        router.push('/login');
      }
    };

    handleLogout();
  }, [logout, router]);

  // Show a loading message while logging out
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  );
}