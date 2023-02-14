import { useNavigate } from "react-router";
import welcome1 from "../Assets/welcome1.jpg";
import welcome2 from "../Assets/welcome2.jpg";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <section  className="relative w-full h-full">
      <article>
      
      <img src={welcome1} alt="" />
      <div className="absolute">
      <p className="text-white text-xl">Believe Yourself</p>
      <div className="flex">
      <hr className="w-1/6"></hr>
      <p className="text-white text-sm">Train like a pro</p>
      </div>
      </div>
      </article>
      <article>
      <img src={welcome2} alt="" />
      <button className="absolute w-40 bg-white rounded-md" onClick={() => navigate("/home")}>Start Training</button>
      </article>
    </section>
  );
};

export default Welcome;
