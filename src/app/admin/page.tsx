'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Key, RefreshCw, Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function AdminPage() {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Authentication failed.');
      }
      setData(json.data);
      setIsAuthenticated(true);
      sessionStorage.setItem('pdn_admin_key', key);
    } catch (err: any) {
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('pdn_admin_key');
    if (saved) {
      setSecretKey(saved);
      fetchDashboard(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDashboard(secretKey);
  };

  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Shield className="w-10 h-10 text-amber-700 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-navy">Administrative Sanctuary</h1>
          <p className="text-xs text-gray-500 mt-1">Pandit Dhananjaya Nanda Practice Portal Management</p>
        </div>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gold/40 shadow-lg">
            <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-600" />
              <span>Administrative Access</span>
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Master Secret Key
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter secret key from .env.local"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              {error && <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-2.5 rounded-lg text-sm font-bold shadow"
              >
                {loading ? 'Authenticating...' : 'Unlock Portal'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gold/30 shadow-sm">
              <div className="text-xs text-gray-500">
                Connected securely as Master Administrator
              </div>
              <button
                onClick={() => fetchDashboard(secretKey)}
                className="text-xs flex items-center gap-1 text-amber-800 font-semibold hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Data</span>
              </button>
            </div>

            {/* Bookings Table */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gold/30 shadow-md">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center justify-between">
                <span>Recent Client Bookings ({data?.bookings?.length || 0})</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 border-b">
                      <th className="py-2.5 px-3">Ref ID</th>
                      <th className="py-2.5 px-3">Client</th>
                      <th className="py-2.5 px-3">Phone</th>
                      <th className="py-2.5 px-3">Service</th>
                      <th className="py-2.5 px-3">Date & Slot</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data?.bookings?.map((b: any) => (
                      <tr key={b.id} className="hover:bg-gray-50/50">
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-800">{b.id}</td>
                        <td className="py-2.5 px-3 font-semibold text-navy">{b.customer_name}</td>
                        <td className="py-2.5 px-3 font-mono">{b.customer_phone}</td>
                        <td className="py-2.5 px-3">{b.service_title || b.service_id}</td>
                        <td className="py-2.5 px-3 text-xs">
                          {b.booking_date}<br />{b.booking_time_slot}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
                            {b.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-700">
                            {b.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
