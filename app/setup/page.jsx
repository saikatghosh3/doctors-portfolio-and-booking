'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, CircleCheck as CheckCircle } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSetupAdmin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Setup failed');

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    } catch (err) {
      console.error('Setup error:', err);
      setError(err.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-10 h-10 text-red-600" fill="currentColor" />
            <span className="font-bold text-3xl text-gray-900">PulseCardiology</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Setup System</h1>
          <p className="text-gray-600 mt-2">Initialize admin account</p>
        </div>

        {/* Setup Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {success ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Complete!</h2>
              <p className="text-gray-600 mb-6">Admin account created successfully</p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Username:</strong> admin<br />
                <strong>Password:</strong> admin123
              </p>
              <p className="text-xs text-gray-400">Redirecting to login...</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6 text-center">
                Click the button below to create the default admin account.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                <p className="text-sm text-blue-900 font-semibold mb-2">Default Credentials:</p>
                <p className="text-sm text-blue-700"><strong>Username:</strong> admin</p>
                <p className="text-sm text-blue-700"><strong>Password:</strong> admin123</p>
              </div>

              <button
                onClick={handleSetupAdmin}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Setting up...' : 'Create Admin Account'}
              </button>
            </>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-red-600 hover:text-red-700 font-semibold transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
