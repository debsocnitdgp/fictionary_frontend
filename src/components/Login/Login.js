import React, { useEffect, useState } from "react";
import "./Login.css";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import { useContext } from "../../utils/Context";

export const handleGoogleLogin = () => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = endpoints.GOOGLE_LOGIN;
  document.body.appendChild(form);
  form.submit();
};

const Login = () => {
  const navigate = useNavigate();
  const context = useContext();
  const [message, setMessage] = useState();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("fetch") === "true") {
      setMessage("Signing you in...")
      fetch(endpoints.SOCIAL_LOGIN_TOKEN, { credentials: "include" })
        .then((res) => res.json())
        .then((res) => {
          setMessage("Logged in succesfully. Redirecting...")
          context.login(res.token);
          navigate("/question");
        })
        .catch((err) => console.error(err));
    } else if (params.get('redirected') === "true") {
      setMessage("Please log in to continue")
    }
  }, [navigate, context]);
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <div className="login-message">{message}</div>
        <button className="login-btn" onClick={handleGoogleLogin}>Click to login</button>
      </div>
    </div>
  );
};

export default Login;
