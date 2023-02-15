import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import Class from "../components/Class";
import Header from "../components/Header";
import { MainContext } from "../context/Provider";


const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2.5,
    slidesToSlide: 2.5
  },
};
const Home = () => {
  const { classes } = useContext(MainContext);
  var randomClass=classes[Math.floor(Math.random() * classes.length)];


  return (
    <div>
      <Header />
      <p className="flex justify-center text-md" style={{paddingTop:"-20px"}}>Popular Classes</p>
      <section className="">
      {classes && (
        <Link to={`/class/${randomClass.id}`}>
        <img
          src={randomClass?.asset.url}
          className="w-[340px] justify-center mx-auto rounded-lg h-[400px]"
          alt=""/>
        <h2 className="pl-10">{randomClass.className}</h2>
        </Link>
      )}
      
      
      </section>
      
       
      <h1 className="text-md pl-6 pb-8">Classes For You</h1>
      <div className=" justify-center pl-6 pr-0 rounded-lg ">
      <Carousel responsive={responsive} >
        {classes.map((item) => (
          <Class
            key={item.id}
            id={item.id}
            url={item.asset.url}
            className={item.className}
          />
        ))}
      </Carousel>
      </div>
    </div>
  );
};

export default Home;
