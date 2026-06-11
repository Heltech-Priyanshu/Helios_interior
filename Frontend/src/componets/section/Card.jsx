import React, { useEffect, useState } from "react";
import { ServiceData } from "../../services/api";
import axios from "axios";
import { API_URL } from "../../config/config";
import { GalleryData } from "../../services/api";

const skills = [
  "Interior Design",
  "3D Visualization",
  "Architecture",
  "Space Planning",
  "Rendering",
  "Documentation",
];

function Card() {
  const [Cartdata, setCartData] = useState([]);
  const [gallary,setGallary]  = useState([])

  const handelData = async () => {
    const res = await axios.get(ServiceData.getservice);
    console.log(res.data.data);
    setCartData(res.data.data);
  };


  const handelGalleryImage = async () => {
    try {
      const res = await axios.get(GalleryData.getgallery);
      setGallary(res.data.data);    
      console.log(res.data.data); 
    } catch (err) {
      console.log('somthing wrong',err)
    }
  };

  useEffect(() => {
    handelData();
    handelGalleryImage();
  }, []);

  return (
    <div className="bg-[#fff] text-[#000] font-sans min-h-screen py-12 md:py-20 ">
      {/* TICKER */}
      {/* <section className="overflow-hidden bg-[#000] text-[#000]  border-y border-[#1f1f1f] py-4">
        <div className="flex w-max   animate-[marquee_18s_linear_infinite]">
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <div key={i} className="flex items-center mr-10 flex-shrink-0">
              <span className="font-serif text-[clamp(22px,4vw,36px)] font-light whitespace-nowrap text-[#fff]">
                {skill}
              </span>
              <span className="ml-10 text-[8px] text-[#2a2418]">●</span>
            </div>
          ))}
        </div>
      </section> */}

      {/* HEADING */}
      <section
        // data-aos="fade-up"
        className="  max-w-[1300px] pl-28  pb-10  text-start"
      >
        <h1
          // data-aos="fade-up"
          className="font-serif text-[clamp(36px,6vw,57px)] font-light leading-tight mb-4"
        >
          Our <em className="italic text-[#c9a96e]">Services</em>
        </h1>
        <p
          // data-aos="fade-up"
          className="text-[18px] text-[#0e0e0e] leading-relaxed max-w-[500px] "
        >
          State-of-the-art tools and services to bring your vision to life
        </p>
      </section>

      {/* CARDS */}
      <section className="flex justify-start pl-28 top-20 gap-10 flex-wrap">
        {Cartdata.map((item, index) => (
          <div
            key={index}
            // data-aos="fade-up"
            className="
        group
        relative
        w-[380px]
        h-[600px]
        bg-white
        overflow-hidden
        shadow-[12px_17px_51px_rgba(0,0,0,0.12)]
        transition-all
        duration-500
        hover:scale-[1.03]
      "
          >
            {/* IMAGE */}
            <div className="w-full h-full overflow-hidden">
              <img
                src={`${API_URL}${item.service_image}`}
                alt={item.service_name}
                className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-[2000ms]
            ease-out
            group-hover:scale-110
          "
              />
            </div>

            {/* TEXT OVERLAY */}
            <div className="absolute bottom-0 left-6 right-6 bg-white p-6 text-left z-10">
              <h2 className="text-2xl font-serif text-black ">
                {item.service_name}
              </h2>
              {/* You can replace this hardcoded text with item.description if your API provides it */}
            
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Card;
