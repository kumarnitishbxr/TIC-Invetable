// import React, { useState, useEffect, useRef } from "react";
// import { User, Mail, Phone, Lock, ArrowRight, CheckCircle } from "lucide-react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../store/slices/authSlice";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// const registerSchema = z.object({
//   firstName: z.string().min(3, "Name should be at least 3 letters"),
//   emailId: z.string().email("Invalid email"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   contact: z
//     .string()
//     .min(10, "Contact number must be at least 10 digits")
//     .max(10, "Contact number must be exactly 10 digits"),
// });

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const firstNameInputRef = useRef(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (isAuthenticated) navigate("/");
//   }, [isAuthenticated, navigate]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(registerSchema) });

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   const handleGoogle = () => {
//     alert("Mock: Launch Google OAuth flow");
//   };

//   const currentYear = new Date().getFullYear();

//   return (
//     <div className="min-h-screen bg-linear-to-br from-emerald-200/50 via-teal-50/30 to-cyan-50/50 flex items-center justify-center p-6">
//       <div className="w-full max-w-5xl">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
//             Create Account
//           </h1>
//           <p className="text-slate-600 mt-1">Join Karigar and find work today</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Left: Form */}
//           <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//               <div>
//                 <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     name="firstName"
//                     placeholder="John Doe"
//                     ref={firstNameInputRef}
//                     className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                       errors.firstName ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
//                     }`}
//                     {...register("firstName")}
//                   />
//                 </div>
//                 {errors.firstName && (
//                   <p className="text-rose-600 text-xs mt-2">⚠ {errors.firstName.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     name="emailId"
//                     type="email"
//                     placeholder="john@example.com"
//                     className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                       errors.emailId ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
//                     }`}
//                     {...register("emailId")}
//                   />
//                 </div>
//                 {errors.emailId && (
//                   <p className="text-rose-600 text-xs mt-2">⚠ {errors.emailId.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-900 mb-2">Contact Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     name="contact"
//                     placeholder="9876543210"
//                     maxLength={10}
//                     className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                       errors.contact ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
//                     }`}
//                     {...register("contact")}
//                   />
//                 </div>
//                 {errors.contact && (
//                   <p className="text-rose-600 text-xs mt-2">⚠ {errors.contact.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter password"
//                     className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 border-2 transition-all font-medium outline-none ${
//                       errors.password ? "border-rose-400" : "border-slate-200 focus:border-emerald-400"
//                     }`}
//                     {...register("password")}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? "🙈" : "👁️"}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-rose-600 text-xs mt-2">⚠ {errors.password.message}</p>
//                 )}
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-transform ${
//                     loading
//                       ? "bg-slate-400 cursor-not-allowed"
//                       : "bg-linear-to-r from-emerald-500 to-teal-500 hover:scale-[1.02]"
//                   }`}
//                 >
//                   {loading ? (
//                     <span className="inline-flex items-center gap-2">
//                       <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Registering...
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center gap-2">
//                       Register <ArrowRight className="w-5 h-5" />
//                     </span>
//                   )}
//                 </button>
//               </div>

//               <p className="text-xs text-slate-500 text-center mt-2">
//                 By registering, you agree to our Terms of Service and Privacy Policy.
//               </p>
//             </form>
//           </div>

//           {/* Right: Info / Google */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex flex-col gap-4">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="text-sm font-semibold text-slate-900">Sign in with</h3>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Quickly create an account using your Google identity
//                   </p>
//                 </div>
//                 <div className="text-xs text-slate-400">Fast • Secure</div>
//               </div>

//               <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
//                 <button
//                   onClick={handleGoogle}
//                   className="flex-1 flex items-center gap-3 justify-center py-3 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition font-semibold text-slate-700"
//                 >
//                   <img
//                     src="https://www.svgrepo.com/show/475656/google-color.svg"
//                     alt="Google"
//                     className="w-5 h-5"
//                   />
//                   Continue with Google
//                 </button>
//                 <button
//                   onClick={() => firstNameInputRef.current?.focus()}
//                   className="mt-3 sm:mt-0 inline-flex items-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-100 transition"
//                 >
//                   Continue with Email
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
//               <h4 className="text-sm font-semibold text-slate-900 mb-3">Why Karigar?</h4>
//               <ul className="space-y-3 text-sm text-emerald-700">
//                 <li className="flex items-center gap-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Find verified local jobs</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Secure payment protection</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Fair dispute resolution</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="text-center">
//               <p className="text-sm text-slate-600">Already have an account?</p>
//               <NavLink
//                 to="/login"
//                 className="mt-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
//               >
//                 Login
//               </NavLink>
//             </div>
//           </div>
//         </div>

//         <div className="mt-10 text-center text-xs text-slate-500">
//           <p>© {currentYear} Karigar — By registering you agree to our Terms.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const registerSchema = z.object({
  firstName: z.string().min(3, "Name should be at least 3 letters"),
  emailId: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(10, "Contact number must be exactly 10 digits"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const firstNameInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data) => dispatch(registerUser(data));
  const handleGoogle = () => alert("Mock: Launch Google OAuth flow");
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .rg-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #060b14;
          background-image:
            radial-gradient(ellipse 80% 50% at 20% 0%, rgba(0,240,255,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(124,58,237,0.08) 0%, transparent 60%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .rg-wrap { width: 100%; max-width: 1000px; }

        /* heading */
        .rg-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: linear-gradient(90deg, #00f0ff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .rg-sub {
          color: rgba(160,200,240,0.5);
          font-size: 13.5px;
          margin-top: 4px;
          letter-spacing: 0.02em;
        }

        /* grid */
        .rg-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 28px;
        }
        @media (min-width: 768px) {
          .rg-grid { grid-template-columns: 1fr 1fr; }
        }

        /* card */
        .rg-card {
          background: #0b1425;
          border: 1px solid rgba(0,240,255,0.12);
          border-radius: 20px;
          padding: 28px;
          box-shadow:
            0 0 40px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(0,240,255,0.06);
        }

        /* form fields */
        .rg-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: rgba(0,240,255,0.7);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .rg-field {
          position: relative;
          margin-bottom: 18px;
        }

        .rg-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: rgba(0,240,255,0.4);
          pointer-events: none;
          transition: color 0.3s;
        }

        .rg-input {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,240,255,0.12);
          color: #d0e8ff;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .rg-input::placeholder { color: rgba(120,170,210,0.3); }

        .rg-input:focus {
          background: rgba(0,240,255,0.05);
          border-color: rgba(0,240,255,0.5);
          box-shadow: 0 0 0 3px rgba(0,240,255,0.07), 0 0 18px rgba(0,240,255,0.1);
        }

        .rg-input:focus + .rg-icon,
        .rg-field:focus-within .rg-icon { color: rgba(0,240,255,0.85); }

        .rg-input.error { border-color: rgba(255,80,100,0.6); }
        .rg-input.error:focus { box-shadow: 0 0 0 3px rgba(255,80,100,0.08); }

        .rg-err {
          color: rgba(255,100,120,0.9);
          font-size: 11.5px;
          margin-top: 5px;
          letter-spacing: 0.02em;
        }

        /* eye toggle */
        .rg-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
          opacity: 0.5;
          transition: opacity 0.2s;
        }
        .rg-eye:hover { opacity: 1; }

        /* submit */
        .rg-submit {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.04em;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #00d4e8 0%, #7c3aed 100%);
          box-shadow: 0 0 18px rgba(0,212,232,0.3), 0 0 36px rgba(124,58,237,0.18);
          transition: all 0.3s ease;
          margin-top: 4px;
        }

        .rg-submit::after {
          content: '';
          position: absolute;
          top: -100%; left: -60%;
          width: 55%; height: 300%;
          background: rgba(255,255,255,0.12);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }

        .rg-submit:hover:not(:disabled) {
          box-shadow: 0 0 28px rgba(0,212,232,0.5), 0 0 56px rgba(124,58,237,0.3);
          transform: translateY(-2px);
        }

        .rg-submit:hover:not(:disabled)::after { left: 130%; }

        .rg-submit:disabled {
          background: rgba(255,255,255,0.08);
          box-shadow: none;
          cursor: not-allowed;
          color: rgba(255,255,255,0.4);
        }

        .rg-terms {
          text-align: center;
          font-size: 11.5px;
          color: rgba(120,160,200,0.45);
          margin-top: 14px;
          letter-spacing: 0.02em;
        }

        /* right column cards */
        .rg-side-card {
          background: #0b1425;
          border: 1px solid rgba(0,240,255,0.1);
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 0 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,240,255,0.05);
        }

        .rg-side-title {
          font-size: 12px;
          font-weight: 700;
          color: rgba(0,240,255,0.7);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .rg-side-sub {
          font-size: 12px;
          color: rgba(130,170,210,0.45);
          margin-bottom: 16px;
        }

        .rg-badge {
          font-size: 11px;
          color: rgba(0,240,255,0.4);
          letter-spacing: 0.06em;
        }

        /* google button */
        .rg-google-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 11px 16px;
          border-radius: 11px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(200,220,240,0.8);
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .rg-google-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }

        .rg-email-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 16px;
          border-radius: 11px;
          background: rgba(0,240,255,0.07);
          border: 1px solid rgba(0,240,255,0.2);
          color: rgba(0,240,255,0.85);
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .rg-email-btn:hover {
          background: rgba(0,240,255,0.12);
          border-color: rgba(0,240,255,0.45);
          box-shadow: 0 0 14px rgba(0,240,255,0.15);
        }

        .rg-btn-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (min-width: 480px) {
          .rg-btn-row { flex-direction: row; align-items: center; }
        }

        /* perks */
        .rg-perk {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: rgba(160,210,240,0.7);
          padding: 8px 0;
          border-bottom: 1px solid rgba(0,240,255,0.06);
        }
        .rg-perk:last-child { border-bottom: none; }

        .rg-perk-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(0,240,255,0.08);
          border: 1px solid rgba(0,240,255,0.15);
          display: grid;
          place-items: center;
          flex-shrink: 0;
          color: #00f0ff;
        }

        /* login link */
        .rg-login-wrap {
          text-align: center;
          padding-top: 8px;
        }

        .rg-login-text {
          font-size: 13px;
          color: rgba(130,170,210,0.5);
        }

        .rg-login-link {
          display: inline-block;
          margin-top: 6px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.05em;
          background: linear-gradient(90deg, #00f0ff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .rg-login-link:hover { opacity: 0.75; }

        /* footer */
        .rg-footer {
          text-align: center;
          font-size: 11px;
          color: rgba(100,140,180,0.35);
          margin-top: 32px;
          letter-spacing: 0.03em;
        }

        /* spinner */
        .rg-spin {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .rg-side-space { display: flex; flex-direction: column; gap: 16px; }
      `}</style>

      <div className="rg-root">
        <div className="rg-wrap">
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <h1 className="rg-title">Create Account</h1>
            <p className="rg-sub">Join Karigar and find work today</p>
          </div>

          <div className="rg-grid">
            {/* ── LEFT: Form ── */}
            <div className="rg-card">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div className="rg-field">
                  <label className="rg-label">Full Name</label>
                  <div style={{ position: "relative" }}>
                    <User
                      className="rg-icon"
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 16,
                        height: 16,
                        color: "rgba(0,240,255,0.4)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      placeholder="John Doe"
                      ref={firstNameInputRef}
                      className={`rg-input${errors.firstName ? " error" : ""}`}
                      style={{ paddingLeft: 42 }}
                      {...register("firstName")}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="rg-err">⚠ {errors.firstName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="rg-field">
                  <label className="rg-label">Email Address</label>
                  <div style={{ position: "relative" }}>
                    <Mail
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 16,
                        height: 16,
                        color: "rgba(0,240,255,0.4)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={`rg-input${errors.emailId ? " error" : ""}`}
                      style={{ paddingLeft: 42 }}
                      {...register("emailId")}
                    />
                  </div>
                  {errors.emailId && (
                    <p className="rg-err">⚠ {errors.emailId.message}</p>
                  )}
                </div>

                {/* Contact */}
                <div className="rg-field">
                  <label className="rg-label">Contact Number</label>
                  <div style={{ position: "relative" }}>
                    <Phone
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 16,
                        height: 16,
                        color: "rgba(0,240,255,0.4)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      placeholder="9876543210"
                      maxLength={10}
                      className={`rg-input${errors.contact ? " error" : ""}`}
                      style={{ paddingLeft: 42 }}
                      {...register("contact")}
                    />
                  </div>
                  {errors.contact && (
                    <p className="rg-err">⚠ {errors.contact.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="rg-field">
                  <label className="rg-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <Lock
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 16,
                        height: 16,
                        color: "rgba(0,240,255,0.4)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className={`rg-input${errors.password ? " error" : ""}`}
                      style={{ paddingLeft: 42, paddingRight: 44 }}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="rg-eye"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="rg-err">⚠ {errors.password.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} className="rg-submit">
                  {loading ? (
                    <>
                      <div className="rg-spin" /> Registering...
                    </>
                  ) : (
                    <>
                      Register <ArrowRight style={{ width: 16, height: 16 }} />
                    </>
                  )}
                </button>

                <p className="rg-terms">
                  By registering, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </form>
            </div>

            {/* ── RIGHT: Side panels ── */}
            <div className="rg-side-space">
              {/* OAuth card */}
              <div className="rg-side-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div className="rg-side-title">Quick Sign Up</div>
                    <div className="rg-side-sub">
                      Use your Google identity to get started fast
                    </div>
                  </div>
                  <span className="rg-badge">Fast · Secure</span>
                </div>

                <div className="rg-btn-row">
                  <button onClick={handleGoogle} className="rg-google-btn">
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      style={{ width: 18, height: 18 }}
                    />
                    Continue with Google
                  </button>
                  <button
                    onClick={() => firstNameInputRef.current?.focus()}
                    className="rg-email-btn"
                  >
                    Continue with Email
                  </button>
                </div>
              </div>

              {/* Perks card */}
              <div className="rg-side-card">
                <div className="rg-side-title" style={{ marginBottom: 14 }}>
                  Why Karigar?
                </div>
                <div className="rg-perk">
                  <div className="rg-perk-icon">
                    <CheckCircle style={{ width: 15, height: 15 }} />
                  </div>
                  Find verified local jobs
                </div>
                <div className="rg-perk">
                  <div className="rg-perk-icon">
                    <CheckCircle style={{ width: 15, height: 15 }} />
                  </div>
                  Secure payment protection
                </div>
                <div className="rg-perk">
                  <div className="rg-perk-icon">
                    <CheckCircle style={{ width: 15, height: 15 }} />
                  </div>
                  Fair dispute resolution
                </div>
              </div>

              {/* Login link */}
              <div className="rg-login-wrap">
                <p className="rg-login-text">Already have an account?</p>
                <NavLink to="/login" className="rg-login-link">
                  Login →
                </NavLink>
              </div>
            </div>
          </div>

          <div className="rg-footer">
            © {currentYear} Karigar — By registering you agree to our Terms.
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
