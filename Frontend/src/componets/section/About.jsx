import React from "react";
import Image1 from "../../assets/Alamp2.png";
import Image2 from "../../assets/Alamp2.png";

function About() {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-8 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[1450px] w-full items-center">
        {/* Image Block */}
        <div data-aos="fade-right" className="relative w-full aspect-[3/2.5]">
          <img
            src={Image1}
            alt="Copper pendant lights"
            className="w-full h-full object-cover"
          />
          <img
            src={Image2}
            alt="Interior detail"
            className="absolute top-[29%] -left-[10%] w-[48%] aspect-square object-cover border-2 border-white"
          />
        </div>
        {/* Text Block */}
        <div
          data-aos="fade-left"
          className="flex flex-col items-start justify-center w-full md:pl-6"
        >
          <h2 className="text-4xl sm:text-3xl md:text-4xl font-medium text-black mb-6">
            Heltech Interiors
          </h2>

          <h4 className="text-4xl sm:text-4xl md:text-[2.8rem] font-serif text-[#b59a76] leading-snug mb-6">
            Creating Timeless <br />
            Elegance
          </h4>

          <p className="text-gray-900 font-serif text-2xl  font-light   leading-relaxed mb-4">
            Our philosophy centers on understanding your lifestyle, preferences,
            and dreams. We believe that great design is not just about
            aesthetics—it's about creating spaces that enhance your daily life
            and reflect your personality.
          </p>

          <p className="text-gray-900 font-serif text-2xl leading-relaxed mb-8">
            From luxurious residential homes to sophisticated commercial spaces,
            our team of expert designers brings creativity, functionality, and
            attention to detail to every project.
          </p>

          <button
            className="border border-[#b59a76] text-[#b59a76] px-8 sm:px-10 py-2.5 font-serif text-base sm:text-lg hover:bg-[#b59a76] hover:text-white transition-colors duration-300"
          >
            About
          </button>
        </div>
      </div>
    </div>
  );
}

export default About