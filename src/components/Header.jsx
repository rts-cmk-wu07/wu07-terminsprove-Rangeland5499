import axios from "axios";
import { useContext, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { BsTriangleFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MainContext } from "../context/Provider";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { setToken, userId, setUserId } = useContext(MainContext);

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
    } catch (err) {}
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(undefined);
    setUserId(undefined);
  };

  return (
    <header className="flex justify-between pt-10">
      <section className="flex justify-end mx-auto w-5/6 pb-4">
      {/* <BsTriangleFill className="text-gray" size={30}/> */}
      <BiMenuAltRight
        className="text-gray"
        size={45}
        onClick={() => setNavigationOpen(!navigationOpen)}
      />
      </section>
      {navigationOpen && (
        <div className="fixed h-full w-full flex flex-col bg-white z-[2001]">
          <GrClose
            size={25}
            onClick={() => setNavigationOpen(!navigationOpen)}
            className="text-gray flex justify-items-end"
          />
          <section className="flex flex-col mx-auto justify-center text-center mt-20">
          <Link to={"/home"} className="pb-10 text-md">Home</Link>
          <Link to={"/search"} className="pb-10 text-md">Search</Link>
          {userId && <Link to={"/schadule"} className="pb-10 text-md" >My Schedule</Link>}
          {userId && (
            <p onClick={handleLogout} to={"/home"} className="text-md">
              Log out
            </p>
          )}
          {!userId && (
            <form onSubmit={handleLogin} className="flex flex-col mx-auto justify-center">
              <input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                className="mb-10 pb-6 bg-gray rounded-lg pl-4 pt-2"
              />
              <input
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                className="mb-10 pb-6 bg-gray rounded-lg pl-4 pt-2"
              />
              <button type="submit" className="text-md">Login</button>
            </form>
          )}
          </section>
        </div>    
      )}
    </header>
  );
};

export default Header;
