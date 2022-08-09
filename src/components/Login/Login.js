import React, { useEffect } from "react";
import "./Login.css";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../utils/tokenSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGithubLogin = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = endpoints.GH_LOGIN;
    document.body.appendChild(form);
    form.submit();
  };
  const handleGoogleLogin = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = endpoints.GOOGLE_LOGIN;
    document.body.appendChild(form);
    form.submit();
  };
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("fetch") === "true") {
      fetch(endpoints.SOCIAL_LOGIN_TOKEN, { credentials: "include" })
        .then((res) => res.json())
        .then((res) => {
          dispatch(login(res.token));
          navigate("/question");
        })
        .catch((err) => console.error(err));
    }
  }, [navigate, dispatch]);
  return (
    <div className="ot">
      <input type="text" placeholder="username" />
      <input type="text1" placeholder="password" />
      <button className="login">Sign in</button>
      <button className="login" onClick={handleGithubLogin}>
        Sign in with github
      </button>
      <button className="login" onClick={handleGoogleLogin}>
        Sign in with google
      </button>
    </div>
  );
};

export default Login;
