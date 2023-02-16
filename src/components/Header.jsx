import axios from "axios";
import { useContext, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { BsTriangleFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { MainContext } from "../context/Provider";
import BackBtn from "./BackButton";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { setToken, userId, setUserId } = useContext(MainContext);
  const { pathname } = useLocation();
  const [error, setError] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("password", password);

      const { data } = await axios.post("/auth/token", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      setUserId(data.userId);
      setToken(data.token);
    } catch (err) {
      setError("username or password is wrong");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(undefined);
    setUserId(undefined);
  };

  return (
    <header className="flex justify-between pr-8 pt-6">
      <section className="flex justify-between w-full items-center pb-4">
      {/* <BsTriangleFill className="text-gray" size={30}/> */}
      {pathname !== "/home" && <BackBtn />}
      <BiMenuAltRight
        className="text-gray ml-auto mr-0"
        size={45}
        onClick={() => setNavigationOpen(!navigationOpen)}
      />
      </section>
      {navigationOpen && (
        <div className="fixed h-full w-full flex top-0 p-5 flex-col bg-white z-[2001]">
          <GrClose
            size={25}
            onClick={() => setNavigationOpen(!navigationOpen)}
            className="text-[#E4E4E4] self-end"
          />
          <section className="flex flex-col mx-auto justify-center text-center mt-20">
          <Link to={"/home"} className="pb-10 text-md">Home</Link>
          <Link to={"/search"} className="pb-10 text-md">Search</Link>
          {userId && <Link to={"/schedule"} className="pb-10 text-md" >My Schedule</Link>}
          {userId && (
            <p onClick={handleLogout} to={"/home"} className="text-md hover:font-bold">
              Log out
            </p>
          )}
          {!userId && (
            <form onSubmit={handleLogin} className="flex flex-col mx-auto justify-center">
              <input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 p-2 bg-gray rounded-lg border border-zinc-500"
              />
              <input
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2 p-2 bg-gray rounded-lg border border-zinc-500"
              />
              {error && <p className="text-red-400">{error}</p>}
              <button type="submit" className="text-md pt-4 hover:font-bold">Login</button>
            </form>
          )}
          </section>
        </div>    
      )}
    </header>
  );
};

export default Header;
