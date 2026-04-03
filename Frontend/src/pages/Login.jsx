
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router";
import { loginUser } from "../store/slices/authSlice";

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const sendData = (data) => dispatch(loginUser(data));
  const handleGoogle = () => alert("Mock: Launch Google OAuth flow (replace with real flow)");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .lg-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #060b14;
          background-image:
            radial-gradient(ellipse 70% 55% at 50% -10%, rgba(0,240,255,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 85% 90%, rgba(124,58,237,0.09) 0%, transparent 60%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .lg-wrap {
          width: 100%;
          max-width: 420px;
        }

        /* heading */
        .lg-heading {
          margin-bottom: 28px;
        }

        .lg-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: linear-gradient(90deg, #00f0ff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 4px;
          line-height: 1.1;
        }

        .lg-sub {
          font-size: 13px;
          color: rgba(140,185,225,0.45);
          letter-spacing: 0.02em;
        }

        /* card */
        .lg-card {
          background: #0b1425;
          border: 1px solid rgba(0,240,255,0.12);
          border-radius: 22px;
          padding: 30px;
          box-shadow:
            0 0 60px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(0,240,255,0.07);
        }

        /* field */
        .lg-field { margin-bottom: 20px; }

        .lg-label {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(0,240,255,0.65);
          letter-spacing: 0.09em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .lg-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .lg-forgot {
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(0,240,255,0.5);
          background: none;
          border: none;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .lg-forgot:hover { color: #00f0ff; }

        .lg-input-wrap { position: relative; }

        .lg-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          color: rgba(0,240,255,0.35);
          pointer-events: none;
          transition: color 0.3s;
        }

        .lg-input {
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

        .lg-input::placeholder { color: rgba(100,155,200,0.3); }

        .lg-input:focus {
          background: rgba(0,240,255,0.05);
          border-color: rgba(0,240,255,0.48);
          box-shadow: 0 0 0 3px rgba(0,240,255,0.07), 0 0 18px rgba(0,240,255,0.09);
        }

        .lg-input-wrap:focus-within .lg-icon { color: rgba(0,240,255,0.8); }

        .lg-input.error { border-color: rgba(255,80,100,0.55); }
        .lg-input.error:focus { box-shadow: 0 0 0 3px rgba(255,80,100,0.07); }

        .lg-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(0,240,255,0.35);
          display: flex;
          align-items: center;
          transition: color 0.2s;
          padding: 0;
        }
        .lg-eye:hover { color: rgba(0,240,255,0.8); }

        .lg-err {
          font-size: 11.5px;
          color: rgba(255,100,120,0.85);
          margin-top: 5px;
          letter-spacing: 0.02em;
        }

        /* remember */
        .lg-remember {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 22px;
        }

        .lg-checkbox {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          accent-color: #00d4e8;
          cursor: pointer;
        }

        .lg-remember-label {
          font-size: 13px;
          color: rgba(140,185,225,0.55);
          cursor: pointer;
          font-weight: 500;
        }

        /* submit */
        .lg-submit {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.04em;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #00d4e8 0%, #7c3aed 100%);
          box-shadow: 0 0 18px rgba(0,212,232,0.28), 0 0 36px rgba(124,58,237,0.16);
          transition: all 0.3s ease;
        }

        .lg-submit::after {
          content: '';
          position: absolute;
          top: -100%; left: -60%;
          width: 55%; height: 300%;
          background: rgba(255,255,255,0.12);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }

        .lg-submit:hover:not(:disabled) {
          box-shadow: 0 0 28px rgba(0,212,232,0.5), 0 0 56px rgba(124,58,237,0.28);
          transform: translateY(-2px);
        }

        .lg-submit:hover:not(:disabled)::after { left: 130%; }

        .lg-submit:disabled {
          background: rgba(255,255,255,0.07);
          box-shadow: none;
          cursor: not-allowed;
          color: rgba(255,255,255,0.3);
        }

        /* divider */
        .lg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
        }

        .lg-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(0,240,255,0.08);
        }

        .lg-divider-text {
          font-size: 11px;
          font-weight: 600;
          color: rgba(0,240,255,0.3);
          letter-spacing: 0.1em;
        }

        /* google */
        .lg-google {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(190,220,245,0.75);
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .lg-google:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18);
          color: #fff;
          transform: translateY(-1px);
        }

        /* footer links */
        .lg-signup-row {
          text-align: center;
          margin-top: 22px;
        }

        .lg-signup-text {
          font-size: 13px;
          color: rgba(130,170,210,0.45);
        }

        .lg-signup-link {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: linear-gradient(90deg, #00f0ff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          margin-left: 5px;
          transition: opacity 0.2s;
        }
        .lg-signup-link:hover { opacity: 0.7; }

        .lg-terms {
          text-align: center;
          margin-top: 14px;
          font-size: 11px;
          color: rgba(100,140,180,0.32);
          letter-spacing: 0.02em;
        }

        /* spinner */
        .lg-spin {
          width: 17px; height: 17px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lgspin 0.7s linear infinite;
        }
        @keyframes lgspin { to { transform: rotate(360deg); } }

        /* server error */
        .lg-server-err {
          background: rgba(255,60,80,0.08);
          border: 1px solid rgba(255,60,80,0.2);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 12.5px;
          color: rgba(255,120,140,0.9);
          margin-bottom: 18px;
          letter-spacing: 0.02em;
        }
      `}</style>

      <div className="lg-root">
        <div className="lg-wrap">
    
          <div className="lg-heading">
            <h2 className="lg-title">Welcome Back</h2>
            <p className="lg-sub">Enter your credentials to access your account</p>
          </div>

          <div className="lg-card">
            {error && <div className="lg-server-err">⚠ {error}</div>}

            <div className="lg-field">
              <label className="lg-label">Email Address</label>
              <div className="lg-input-wrap">
                <Mail className="lg-icon" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`lg-input${errors.emailId ? " error" : ""}`}
                  {...register("emailId")}
                />
              </div>
              {errors.emailId && <p className="lg-err">⚠ {errors.emailId.message}</p>}
            </div>

            <div className="lg-field">
              <div className="lg-label-row">
                <label className="lg-label" style={{ marginBottom: 0 }}>Password</label>
                <button type="button" className="lg-forgot">Forgot?</button>
              </div>
              <div className="lg-input-wrap">
                <Lock className="lg-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`lg-input${errors.password ? " error" : ""}`}
                  style={{ paddingRight: 44 }}
                  {...register("password")}
                />
                <button type="button" className="lg-eye" onClick={() => setShowPassword((p) => !p)} aria-label="Toggle password">
                  {showPassword ? <EyeOff style={{ width: 15, height: 15 }} /> : <Eye style={{ width: 15, height: 15 }} />}
                </button>
              </div>
              {errors.password && <p className="lg-err">⚠ {errors.password.message}</p>}
            </div>

            <div className="lg-remember">
              <input type="checkbox" id="remember" className="lg-checkbox" />
              <label htmlFor="remember" className="lg-remember-label">Remember me</label>
            </div>

            <button onClick={handleSubmit(sendData)} disabled={loading} className="lg-submit">
              {loading ? (
                <><div className="lg-spin" /> Logging in...</>
              ) : (
                <>Login <ArrowRight style={{ width: 16, height: 16 }} /></>
              )}
            </button>

            <div className="lg-divider">
              <div className="lg-divider-line" />
              <span className="lg-divider-text">OR</span>
              <div className="lg-divider-line" />
            </div>

            <button onClick={handleGoogle} className="lg-google">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 18, height: 18 }} />
              Continue with Google
            </button>
          </div>

          <div className="lg-signup-row">
            <span className="lg-signup-text">Don't have an account?</span>
            <NavLink to="/signup" className="lg-signup-link">Sign Up →</NavLink>
          </div>
          <p className="lg-terms">By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </>
  );
}

export default Login;