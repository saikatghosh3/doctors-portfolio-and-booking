'use client';

import Link from 'next/link';
import { Heart, Monitor, Shield, Utensils, Wifi, ChevronLeft, ChevronRight, CircleCheck as CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "After my procedure with Dr. Thorne, I wasn't just cleared to walk—I was cleared to compete. Last month I finished my first marathon in six years. His approach to cardiovascular vitality is life-changing.",
      author: "James R. McAvoy",
      role: "Triathlete & Patient",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-600" fill="currentColor" />
            <span className="font-bold text-2xl text-gray-900">PulseCardiology</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-red-600 font-bold border-b-2 border-red-600 py-1">Home</a>
            <a href="#about" className="text-gray-600 font-medium hover:text-red-600 transition">About</a>
            <a href="#services" className="text-gray-600 font-medium hover:text-red-600 transition">Services</a>
            <a href="#" className="text-gray-600 font-medium hover:text-red-600 transition">Resources</a>
          </nav>
          <Link href="/book-appointment" className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition">
            Book Appointment
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full mb-6 font-semibold text-sm">
              <Heart className="w-4 h-4" fill="currentColor" />
              PRECISION HEART CARE
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Experience the Rhythm of <span className="text-red-600 italic">Vitality</span>.
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              Dr. Thorne combines clinical excellence with advanced cardiology tech to protect your heart's performance. Because health isn't just surviving—it's thriving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-appointment" className="px-8 py-4 rounded-lg bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                Book Heart Scan
                <span className="text-xl">→</span>
              </Link>
              <button className="px-8 py-4 rounded-lg border-2 border-gray-600 text-gray-600 font-bold text-lg hover:bg-gray-50 transition">
                Our Approach
              </button>
            </div>
          </div>
          <div className="relative mt-12 lg:mt-0">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-200 opacity-10 rounded-full blur-3xl"></div>
            <div className="relative z-10 border-4 border-white shadow-2xl overflow-hidden rounded-2xl aspect-square"> 
  {/* aspect-square add koray parent er height fix holo */}
  <img 
    alt="Dr. Thorne Cardiology" 
    className="w-full h-full object-cover object-center" 
    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&h=600](https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&h=600" 
  />
</div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border border-gray-200 rounded-lg hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Heart className="w-6 h-6" fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-bold">VITALITY SCORE</p>
                  <p className="text-2xl font-bold text-red-600">98% Optimal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                The Hand and Mind Behind Your <span className="text-red-600">Heart Health</span>.
              </h2>
              <div className="w-20 h-1 bg-red-600 mb-8"></div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Dr. Alistair Thorne is more than a surgeon; he is a visionary in preventive cardiology. With over 20 years of experience in high-performance heart surgery and complex valve repairs, he advocates for a proactive "Athletic Health" philosophy.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                His methodology bridges the gap between surgical precision and lifestyle optimization, ensuring every patient regains the endurance and vitality they thought was lost.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-4 border-red-600 pl-4">
                  <p className="text-3xl font-bold text-gray-900">5,000+</p>
                  <p className="text-sm font-bold text-gray-600 uppercase">Surgeries Performed</p>
                </div>
                <div className="border-l-4 border-red-600 pl-4">
                  <p className="text-3xl font-bold text-gray-900">15+</p>
                  <p className="text-sm font-bold text-gray-600 uppercase">Global Innovation Awards</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/5] bg-white p-4 shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition">
                <img alt="Medical Expertise" className="w-full h-full object-cover rounded-lg" src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="text-red-600 font-bold text-sm uppercase tracking-wider">Specializations</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">Advanced Cardiac Solutions</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Service 1 */}
          <div className="md:col-span-2 lg:col-span-2 bg-white border border-gray-200 p-8 rounded-2xl hover:border-red-600 transition group relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition">
              <Monitor className="w-40 h-40" />
            </div>
            <div className="text-red-600 mb-6">
              <Monitor className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Precision Diagnostics</h3>
            <p className="text-gray-600 mb-6">Utilizing state-of-the-art EKG, Stress Testing, and 3D Imaging to detect the slightest anomalies before they become critical.</p>
            <a href="#" className="inline-flex items-center font-bold text-red-600 group-hover:gap-2 transition gap-1">
              LEARN MORE <span>→</span>
            </a>
          </div>

          {/* Service 2 */}
          <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-red-600 transition group">
            <div className="text-red-600 mb-6">
              <Shield className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Preventive Care</h3>
            <p className="text-gray-600 mb-6">Comprehensive wellness plans focused on metabolic health and longevity.</p>
            <a href="#" className="inline-flex items-center font-bold text-red-600 group-hover:gap-2 transition gap-1">
              EXPLORE <span>→</span>
            </a>
          </div>

          {/* Service 3 */}
          <div className="bg-gray-900 text-white p-8 rounded-2xl hover:bg-red-600 transition group flex flex-col justify-between">
            <div>
              <div className="text-white mb-6">
                <Heart className="w-12 h-12" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Acute Surgery</h3>
              <p className="opacity-90 mb-6">Complex cardiovascular interventions and minimally invasive heart surgery.</p>
            </div>
            <a href="#" className="inline-flex items-center font-bold text-red-600 group-hover:text-white transition gap-1">
              BOOK CONSULT <span>→</span>
            </a>
          </div>

          {/* Service 4 */}
          <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-red-600 transition group">
            <div className="text-red-600 mb-6">
              <Utensils className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cardiac Nutrition</h3>
            <p className="text-gray-600 mb-6">Scientific nutrition protocols designed to optimize heart-muscle density and function.</p>
          </div>

          {/* Service 5 */}
          <div className="md:col-span-2 lg:col-span-3 bg-white border border-gray-200 p-8 rounded-2xl hover:border-red-600 transition group">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Remote Monitoring Ecosystem</h3>
                <p className="text-gray-600">Continuous, 24/7 cardiac data streaming from your wearable to our clinic, enabling immediate intervention if vital signs fluctuate beyond safe parameters.</p>
              </div>
              <div className="flex justify-end">
                <div className="w-full h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wifi className="w-12 h-12 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Stories of <br/><span className="text-red-600">Recaptured Performance</span>.
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We don't just treat patients; we empower athletes, parents, and leaders to return to the activities they love with a heart stronger than ever.
              </p>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-white transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-white transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-white p-12 rounded-2xl shadow-xl border-l-8 border-red-600 relative">
              <span className="text-red-200 absolute top-8 right-8 text-6xl opacity-30">"</span>
              <p className="text-2xl italic text-gray-900 mb-8 leading-relaxed">
                {testimonials[currentTestimonial].quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-200">
                  <img alt={testimonials[currentTestimonial].author} className="w-full h-full object-cover" src={testimonials[currentTestimonial].image} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonials[currentTestimonial].author}</p>
                  <p className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gray-900 rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden group">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600 opacity-20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Secure Your Heart's Future Today.</h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Don't wait for a warning sign. Schedule a comprehensive 360-degree cardiac vitality assessment with Dr. Thorne and his elite team.
              </p>
              <div className="flex flex-col items-center gap-6">
                <Link href="/book-appointment" className="px-12 py-5 rounded-lg bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition">
                  Book Your Heart Consultation
                </Link>
                <p className="text-white font-bold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-red-400" fill="currentColor" />
                  Certified by the World Cardiac Board
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
              <span className="font-bold text-white text-xl">PulseCardiology</span>
            </div>
            <p className="text-sm text-center md:text-left max-w-xs">
              © 2024 Pulse Cardiology. All rights reserved. High-performance heart care.
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="font-bold hover:text-red-400 transition">Patient Portal</a>
            <a href="#" className="font-bold hover:text-red-400 transition">Privacy Policy</a>
            <a href="#" className="font-bold hover:text-red-400 transition">Emergency Care</a>
            <a href="#" className="font-bold hover:text-red-400 transition">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* Emergency Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-3 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" fill="currentColor" />
            <span className="font-bold uppercase text-sm">Chest Pain or Emergency?</span>
          </div>
          <a href="tel:911" className="text-red-400 font-bold hover:underline">Call 911 Immediately</a>
          <Link href="/book-appointment" className="bg-red-600 px-4 py-1 rounded font-bold hover:bg-red-700 transition">
            Book Urgent Consult
          </Link>
        </div>
      </div>
    </div>
  );
}
