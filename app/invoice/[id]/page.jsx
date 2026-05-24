'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, Download, Printer, ArrowLeft } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function InvoicePage() {
  const params = useParams();
  const invoiceRef = useRef();
  const [appointment, setAppointment] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, [params.id]);

  const fetchInvoice = async () => {
    try {
      const response = await fetch(`/api/invoice/${params.id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Unable to load invoice');

      setAppointment(data.appointment);
      setInvoice(data.invoice);
    } catch (err) {
      console.error('Error fetching invoice:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!invoiceRef.current) return;

    const element = invoiceRef.current;
    const opt = {
      margin: 10,
      filename: `invoice-${invoice?.invoice_number}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!appointment || !invoice) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-red-600" fill="currentColor" />
              <span className="font-bold text-2xl text-gray-900">PulseCardiology</span>
            </Link>
          </div>
        </header>
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-600">Invoice not found</p>
          <Link href="/" className="text-red-600 hover:text-red-700 font-semibold mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-600" fill="currentColor" />
            <span className="font-bold text-xl text-gray-900">PulseCardiology</span>
          </Link>
          <div className="flex gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <Link href="/" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Invoice */}
        <div ref={invoiceRef} className="bg-white rounded-xl shadow-lg p-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 pb-8 border-b-2 border-gray-300">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-8 h-8 text-red-600" fill="currentColor" />
                <span className="font-bold text-3xl text-gray-900">PulseCardiology</span>
              </div>
              <p className="text-gray-600">Advanced Cardiac Care</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-red-600 mb-2">INVOICE</p>
              <p className="text-gray-600">
                <strong>Invoice Number:</strong> {invoice.invoice_number}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {new Date(invoice.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* Doctor Info */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Doctor Information</h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <p className="font-bold text-lg text-gray-900">{invoice.doctor_name}</p>
                <p className="text-gray-600">Specialty: {invoice.doctor_specialty}</p>
                <p className="text-gray-600">License: {invoice.doctor_license}</p>
              </div>
            </div>

            {/* Patient Info */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Patient Information</h3>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <p className="font-bold text-lg text-gray-900">{invoice.patient_name}</p>
                <p className="text-gray-600">Email: {invoice.patient_email}</p>
                <p className="text-gray-600">Phone: {invoice.patient_phone}</p>
                {invoice.patient_address && (
                  <p className="text-gray-600">Address: {invoice.patient_address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Appointment Details</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">Date</p>
                  <p className="font-bold text-lg text-gray-900">{invoice.appointment_date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">Time</p>
                  <p className="font-bold text-lg text-gray-900">{invoice.appointment_time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">Status</p>
                  <p className="font-bold text-lg text-blue-600">Confirmed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          {invoice.reason_for_visit && (
            <div className="mb-12">
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Reason for Visit</h3>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <p className="text-gray-700">{invoice.reason_for_visit}</p>
              </div>
            </div>
          )}

          {/* Payment Section */}
          <div className="mb-12 pb-8 border-t-2 border-gray-300">
            <div className="grid grid-cols-2 gap-8">
              <div></div>
              <div>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700">Consultation Fee:</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                  <div className="border-t border-red-300 pt-4 flex justify-between">
                    <span className="font-bold text-lg text-gray-900">Total Amount:</span>
                    <span className="font-bold text-2xl text-red-600">$0.00</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-red-300">
                    <p className="text-sm text-gray-700">
                      <strong>Payment Status:</strong> <span className="text-orange-600 font-bold">PENDING (Cash at Appointment)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="border-t-2 border-gray-300 pt-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Notes</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                This is your appointment confirmation invoice. Payment will be collected in cash at the time of your appointment.
              </p>
              <p className="text-sm text-gray-600">
                Please keep this invoice for your records. If you need to reschedule or cancel, contact us as soon as possible.
              </p>
            </div>
          </div>

          {/* Signature Area */}
          <div className="grid grid-cols-2 gap-12 mt-12 pt-12 border-t-2 border-gray-300">
            <div>
              <p className="text-sm text-gray-600 mb-12">Patient Signature</p>
              <p className="border-t border-gray-400 pt-2 text-gray-600">________________________</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-12">Doctor Signature</p>
              <p className="border-t border-gray-400 pt-2 text-gray-600">________________________</p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="text-center text-xs text-gray-500 mt-12 pt-8 border-t border-gray-200">
            <p>&copy; 2024 PulseCardiology. All rights reserved.</p>
            <p>Advanced Cardiac Care & Expertise</p>
          </div>
        </div>

        {/* Actions (visible on screen, hidden in print) */}
        <div className="mt-8 flex gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 px-6 py-3 rounded-lg bg-gray-600 text-white font-bold hover:bg-gray-700 transition flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print Invoice
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 px-6 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download as PDF
          </button>
          <Link href="/" className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16 print:hidden">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2024 PulseCardiology. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
