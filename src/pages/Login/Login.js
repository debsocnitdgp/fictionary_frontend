import React, { useEffect, useState } from "react";
import "./Login.css";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import { useContext } from "../../utils/Context";
import { useGoogleLogin } from "@react-oauth/google";

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
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setMessage("Fetching your information from Google...");
      fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
          tokenResponse.access_token
      )
        .then((json) => json.json())
        .then((res) => {
          setMessage("Signing you in...")
          fetch(endpoints.SOCIAL_LOGIN_TOKEN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
              ...res
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              setMessage("Logged in succesfully. Redirecting...");
              context.login(res.token);
              navigate("/question");
            })
            .catch((err) => console.error(err));
        });
    },
    onFailure: (error) => {
      console.log(error)
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("redirected") === "true") {
      setMessage("Please log in to continue");
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <div className="login-message">{message}</div>
        <button className="login-btn" onClick={handleGoogleLogin}>
          Click to login
        </button>
      </div>
    </div>
  );
};

export default Login;
