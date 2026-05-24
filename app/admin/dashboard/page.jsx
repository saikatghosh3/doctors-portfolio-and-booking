'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, LogOut, Calendar, Plus, Trash2, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({ date: '', time: '' });
  const [loading, setLoading] = useState(true);

  // Check admin session
  useEffect(() => {
    const adminUsername = sessionStorage.getItem('adminUsername');
    if (!adminUsername) {
      router.push('/admin/login');
      return;
    }
    setAdminName(adminUsername);
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const slotsResponse = await fetch('/api/admin/slots?available=false');
      const slots = await slotsResponse.json();
      setTimeSlots(Array.isArray(slots) ? slots : []);

      const appointmentsResponse = await fetch('/api/admin/appointments');
      const appts = await appointmentsResponse.json();
      setAppointments(Array.isArray(appts) ? appts : []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!newSlot.date || !newSlot.time) return;

    try {
      const response = await fetch('/api/admin/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: newSlot.date, time: newSlot.time }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Error adding slot');

      setNewSlot({ date: '', time: '' });
      setShowAddSlot(false);
      fetchData();
    } catch (err) {
      console.error('Error adding slot:', err);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!confirm('Delete this time slot?')) return;

    try {
      const response = await fetch(`/api/admin/slots?id=${slotId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Error deleting slot');
      fetchData();
    } catch (err) {
      console.error('Error deleting slot:', err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminId');
    sessionStorage.removeItem('adminUsername');
    router.push('/admin/login');
  };

  const getSlotStatus = (slot) => {
    return slot.is_available ? 'Available' : 'Booked';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-600" fill="currentColor" />
            <span className="font-bold text-xl text-gray-900">PulseCardiology Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, <strong>{adminName}</strong></span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Add Time Slots */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-red-600" />
                Manage Slots
              </h2>

              {!showAddSlot ? (
                <button
                  onClick={() => setShowAddSlot(true)}
                  className="w-full py-3 rounded-lg bg-red-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition"
                >
                  <Plus className="w-5 h-5" />
                  Add Time Slot
                </button>
              ) : (
                <form onSubmit={handleAddSlot} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Date</label>
                    <input
                      type="date"
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Time</label>
                    <input
                      type="time"
                      value={newSlot.time}
                      onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddSlot(false)}
                      className="flex-1 py-2 rounded-lg bg-gray-300 text-gray-900 font-semibold hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Available Slots</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {timeSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm">No slots created yet</p>
                  ) : (
                    timeSlots.map((slot) => (
                      <div key={slot.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{slot.date}</p>
                          <p className="text-sm text-gray-600">{slot.time}</p>
                          <span className={`inline-block mt-1 text-xs font-bold px-2 py-1 rounded ${slot.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {getSlotStatus(slot)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointments ({appointments.length})</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Patient</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Date & Time</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Contact</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-6 text-center text-gray-500">
                          No appointments yet
                        </td>
                      </tr>
                    ) : (
                      appointments.map((apt) => (
                        <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <p className="font-semibold text-gray-900">{apt.patient_name}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-gray-600">{apt.appointment_date}</p>
                            <p className="text-gray-500 text-xs">{apt.appointment_time}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-gray-600">{apt.patient_email}</p>
                            <p className="text-gray-500 text-xs">{apt.patient_phone}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-block text-xs font-bold px-3 py-1 rounded ${apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Link href={`/invoice/${apt.id}`} className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 transition">
                              <Eye className="w-4 h-4" />
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
