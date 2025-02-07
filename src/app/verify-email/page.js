// app/verify-email/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { authService } from '@/libs/appwrite';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const userId = searchParams.get('userId');
        const secret = searchParams.get('secret');

        if (userId && secret) {
          await authService.confirmVerification(userId, secret);
          setStatus('success');
          setMessage('Email verified successfully! You can now log in.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Email verification failed. Please try again or request a new verification.');
        console.error('Verification error:', error);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        {status === 'pending' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Verifying Email...</h2>
            <p className="text-gray-600">Please wait while we verify your email.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Verification Successful</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <a 
              href="/login" 
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Go to Login
            </a>
          </div>
        )}

        {status === 'error' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <a 
              href="/register" 
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Try Again
            </a>
          </div>
        )}
      </div>
    </div>
  );
}