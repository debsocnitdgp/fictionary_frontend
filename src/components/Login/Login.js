import React, { useEffect } from "react";
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
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("fetch") === "true") {
      fetch(endpoints.SOCIAL_LOGIN_TOKEN, { credentials: "include" })
        .then((res) => res.json())
        .then((res) => {
          context.login(res.token);
          navigate("/question");
        })
        .catch((err) => console.error(err));
    }
  }, [navigate, context]);
  return (
    <div className="ot">
      <h1 style={{color: 'white', fontFamily: 'Orbitron'}}>Signing you in...</h1>
    </div>
  );
};

export default Login;
