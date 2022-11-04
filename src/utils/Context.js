import {
  createContext,
  useState,
  useContext as _useContext,
  useEffect,
} from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [token, setToken] = useState("");
  const login = (new_token) => {
    localStorage.setItem("fictionary_token", new_token);
    setToken(new_token);
  };
  const logout = () => {
    localStorage.removeItem("fictionary_token", "");
    setToken("");
  };

  useEffect(() => {
    var _token = localStorage.getItem("fictionary_token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  return (
    <Context.Provider value={{ token, login, logout }}>
      {children}
    </Context.Provider>
  );
};

const useContext = () => _useContext(Context);

export default useContext;
export { Context, Provider, useContext };
