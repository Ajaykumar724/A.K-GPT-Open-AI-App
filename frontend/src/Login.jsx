import React from "react";
import "./Login.css";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/auth/login/federated/google";
  };

  return (
    <div className="login">
      <div className="login-main" role="main" aria-labelledby="title">
        <h1 id="title" className="login_title">Sign in</h1>
        <p className="login_sub">Welcome back! Choose a method to continue.</p>

        <button
          className="login_btn"
          onClick={handleGoogleLogin}
          aria-label="Sign in with Google"
        >
          <svg viewBox="0 0 48 48" aria-hidden="true" className="login_icon">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 31.9 29.3 35 24 35c-6.6 0-12-5.4-12-12S17.4 11 24 11c3 0 5.7 1.1 7.8 3l5.7-5.7C33.7 5.1 29.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.4-7.6 20.6-17.5.2-1.2.4-2.5.4-3.5 0-1.2-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.6 18.9 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C33.7 5.1 29.1 3 24 3 15 3 7.4 8.2 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.1C29 36.8 26.6 38 24 38c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5C7.4 39.9 15 45 24 45z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.9-5.8 7-11.3 7-5.2 0-9.6-3.3-11.2-7.9l-6.6 5C7.4 39.9 15 45 24 45c10.5 0 19.4-7.6 20.6-17.5.2-1.2.4-2.5.4-3.5 0-1.2-.1-2.4-.4-3.5z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
