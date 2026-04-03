import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, AlertCircle, User, Briefcase } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "worker",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ loading: false, ok: false, msg: err });
      return;
    }

    setStatus({ loading: true, ok: null, msg: "" });
    
    // Simulate API call
    setTimeout(() => {
      setStatus({ loading: false, ok: true, msg: "Thanks — we received your message!" });
      setForm({ name: "", email: "", role: "worker", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold text-sm mb-6 shadow-sm">
            <Mail className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-4">
            <span className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Get in <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Touch
            </span>
            </span>
            <br />
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have a question or need help? Fill out the form and our team will get back to you within 1-2 business days.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Contact Cards - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info Card */}
            <div className="group relative bg-linear-to-br from-white to-slate-50 rounded-3xl p-8 shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Contact Information</h2>
                
                <div className="space-y-5">
                  <ContactInfoCard 
                    icon={<Mail className="w-5 h-5" />} 
                    label="Email"
                    value="support@kaamsetu.example"
                    gradient="from-emerald-500 to-teal-500"
                  />
                  
                  <ContactInfoCard 
                    icon={<Phone className="w-5 h-5" />} 
                    label="Phone"
                    value="+91 98765 43210"
                    gradient="from-teal-500 to-cyan-500"
                  />
                  
                  <ContactInfoCard 
                    icon={<Clock className="w-5 h-5" />} 
                    label="Working Hours"
                    value="Mon - Sat, 9:00 AM - 6:00 PM"
                    gradient="from-cyan-500 to-blue-500"
                  />
                  
                  <ContactInfoCard 
                    icon={<MapPin className="w-5 h-5" />} 
                    label="Location"
                    value="India"
                    gradient="from-blue-500 to-indigo-500"
                  />
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                  <p className="text-sm text-slate-700">
                    <span className="font-bold text-emerald-700">Need immediate help?</span> Call us or check the <Link to="/faq" className="text-emerald-600 font-bold hover:underline">Help & FAQs</Link>.
                  </p>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-500">
              <div className="w-full h-64">
                <iframe
                  title="KaamSetu Office"
                  className="w-full h-full border-0"
                  src="https://www.google.com/maps?q=India&output=embed"
                />
              </div>
            </div>
          </div>

          {/* Right: Contact Form - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="group relative bg-linear-to-br from-white to-slate-50 rounded-3xl p-8 shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Send us a Message</h2>
                <p className="text-slate-600 mb-8">Fill out the form below and we'll respond as soon as possible.</p>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all font-medium"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all font-medium"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">I am a</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        form.role === "worker" 
                          ? "border-emerald-500 bg-linear-to-br from-emerald-50 to-teal-50" 
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}>
                        <input
                          type="radio"
                          name="role"
                          value="worker"
                          checked={form.role === "worker"}
                          onChange={onChange}
                          className="sr-only"
                        />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          form.role === "worker" 
                            ? "bg-linear-to-br from-emerald-500 to-teal-500 text-white" 
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          <User className="w-5 h-5" />
                        </div>
                        <span className={`font-bold ${form.role === "worker" ? "text-emerald-700" : "text-slate-700"}`}>
                          Worker
                        </span>
                      </label>

                      <label className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        form.role === "employer" 
                          ? "border-emerald-500 bg-linear-to-br from-emerald-50 to-teal-50" 
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}>
                        <input
                          type="radio"
                          name="role"
                          value="employer"
                          checked={form.role === "employer"}
                          onChange={onChange}
                          className="sr-only"
                        />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          form.role === "employer" 
                            ? "bg-linear-to-br from-emerald-500 to-teal-500 text-white" 
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <span className={`font-bold ${form.role === "employer" ? "text-emerald-700" : "text-slate-700"}`}>
                          Employer
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Your Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      rows="5"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white focus:outline-none transition-all font-medium resize-none"
                      placeholder="How can we help you today?"
                      required
                    />
                  </div>

                  {/* Status Messages */}
                  {status.ok === true && (
                    <div className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 px-4 py-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <p className="text-sm font-semibold text-emerald-700">{status.msg}</p>
                    </div>
                  )}
                  
                  {status.ok === false && (
                    <div className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-rose-50 to-pink-50 border-2 border-rose-200 px-4 py-3">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <p className="text-sm font-semibold text-rose-700">{status.msg}</p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={status.loading}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
                        status.loading 
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                          : "bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl hover:scale-105"
                      }`}
                    >
                      {status.loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setForm({ name: "", email: "", role: "worker", message: "" });
                        setStatus({ loading: false, ok: null, msg: "" });
                      }}
                      className="px-6 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all duration-300 hover:scale-105"
                    >
                      Reset
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 text-center">
                    By contacting us you agree to our <button className="text-emerald-600 font-bold hover:underline">Privacy Policy</button>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} KaamSetu. Empowering rural workers, building a better tomorrow.</p>
        </div>
      </footer>
    </div>
  );
}

function ContactInfoCard({ icon, label, value, gradient }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
        <div className="text-white">{icon}</div>
      </div>
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</div>
        <div className="text-sm font-semibold text-slate-900">{value}</div>
      </div>
    </div>
  );
}