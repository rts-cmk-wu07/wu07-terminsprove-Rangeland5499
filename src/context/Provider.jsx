import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

const Provider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [classes, setClasses] = useState([]);

  const handleGetClasses = async () => {
    try {
      const { data } = await axios.get("/api/v1/classes");
      setClasses(data);
    } catch (err) {}
  };

  useEffect(() => {
    handleGetClasses();
  }, []);

  return (
    <MainContext.Provider
      value={{ token, setToken, userId, setUserId, classes }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default Provider;
