import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from "../../assets/Rimage.png";
import AOS from "aos";
import "aos/dist/aos.css";

// ── Register ScrollTrigger ──────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

function Query() {
  const listItems = [
    { value: "100%", label: "End-to-End Execution" },
    { value: "100%", label: "Transparent Material Costing" },
    { value: "0", label: "Coordination Stress" },
    { value: "100%", label: "Budget-Focused Planning" },
    { value: "1", label: "Dedicated Point of Contact" },
  ];

  const imgWrapRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const wrapper = imgWrapRef.current;
      const img = wrapper.querySelector("img");

     gsap.set(wrapper, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(img, { scale: 1.1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%", 
          toggleActions: "play none none reverse", 
        },
      });
      tl
        .to(wrapper, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.inOut",
        })
       
        .to(
          img,
          { scale: 1, duration: 1.4, ease: "power2.out" },
          "<0.05", 
        );
    }); 

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    // AOS Initialize karein
    AOS.init({
      duration: 800, // Animation ki speed
      offset: 100, // Element screen mein 100px aane ke baad trigger hoga
      once: true, // Ek baar animate hone ke baad wapas reverse nahi hoga
    });

    // Thode delay ke baad page ki positions dobara calculate karein
    // Ye images load hone ke baad position fix kar dega
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }, []);

  return (
    <>
      {/* Review */}
      <div className="w-full font-serif min-h-screen bg-[#fafafa] flex items-center justify-center py-16 md:py-20 px-4 sm:px-8">
        <div className="max-w-[1350px] w-full grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 xl:gap-28 items-center">
          {/* LEFT */}
          <div
            data-aos="fade-left"
            className="flex flex-col gap-12 md:gap-16 lg:gap-24 text-center lg:text-right"
          >
            <div>
              <h3 className="text-2xl md:text-[28px] font-serif mb-3">
                <span className="text-black">100%</span>{" "}
                <span className="text-[#b59a76]">End-to-End Execution</span>
              </h3>
              <p className="text-gray-800 text-base md:text-[17px] leading-relaxed font-serif max-w-md mx-auto lg:ml-auto lg:mr-0">
                We provide end-to-end execution starting from concept design to
                3D visualisation, material selection, site execution and final
                delivery
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-[28px] font-serif mb-3">
                <span className="text-black">100%</span>{" "}
                <span className="text-[#b59a76]">budget-clarity services</span>
              </h3>
              <p className="text-gray-800 text-base md:text-[17px] leading-relaxed font-serif max-w-md mx-auto lg:ml-auto lg:mr-0">
                We deliver budget-focused interior service to customers where
                every recommendation will match your budget
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-[28px] font-serif mb-3">
                <span className="text-black">100%</span>{" "}
                <span className="text-[#b59a76]">coordination in teams</span>
              </h3>
              <p className="text-gray-800 text-base md:text-[17px] leading-relaxed font-serif max-w-md mx-auto lg:ml-auto lg:mr-0">
                You will need to contact one team and one point of contract for
                getting services, with zero coordination issue
              </p>
            </div>
          </div>

          {/* CENTER IMAGE */}
          <div className="relative w-full max-w-[420px] mx-auto h-[450px] md:h-[600px] lg:h-[750px] my-4 lg:my-0">
            {/* grey offset box */}
            <div className="absolute top-16 -right-12 w-full h-[100%] bg-[#d9d9d9] z-0 hidden lg:block" />

            <div
              ref={imgWrapRef}
              className="w-full h-full relative z-10 shadow-sm overflow-hidden"
            >
              <img
                src={image}
                alt="Copper pendant lights"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div
            data-aos="fade-right"
            className="flex flex-col gap-12 md:gap-16 lg:gap-24 text-center lg:text-left"
          >
            <div>
              <h3 className="text-2xl md:text-[28px] font-serif mb-3">
                <span className="text-black">150+</span>{" "}
                <span className="text-[#b59a76]">quality checks</span>
              </h3>
              <p className="text-gray-800 text-base md:text-[17px] leading-relaxed font-serif max-w-md mx-auto lg:mr-auto lg:ml-0">
                We maintain thorough quality checks that help avoid costly
                mistakes and guarantee budget optimisation
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-[28px] font-serif mb-3">
                <span className="text-black">25,000+</span>{" "}
                <span className="text-[#b59a76]">happy homes</span>
              </h3>
              <p className="text-gray-800 text-base md:text-[17px] leading-relaxed font-serif max-w-md mx-auto lg:mr-auto lg:ml-0">
                Over the years, we have successfully delivered interior and
                architectural services to a large number of homeowners who have
                been satisfied with our services
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-[28px] font-serif mb-3">
                <span className="text-black">100%</span>{" "}
                <span className="text-[#b59a76]">on-time delivery</span>
              </h3>
              <p className="text-gray-800 text-base md:text-[17px] leading-relaxed font-serif max-w-md mx-auto lg:mr-auto lg:ml-0">
                Our team follows a structured project management process for the
                timely completion of projects through minimal hassles and
                smoother coordination.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* projects */}
      <div className="w-full bg-[#f8f8f8] py-20 px-6 font-serif">
        <div className="max-w-[1600px] mx-auto">
          {/* HEADER SECTION */}
          <div className="mb-10  pb-8 text-left">
            <h2 className="text-4xl md:text-5xl font-serif mb-3 text-black">
              Our <span className="text-[#b59a76]">Projects</span>
            </h2>
            <p className="text-gray-700 font-serif text-lg">
              Explore our portfolio of exceptional interior design projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* COLUMN 1 & 2 */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Image 1: Modern Minimalist Villa */}
              <div className="relative w-full h-[300px] lg:h-[380px] overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
                  alt="Modern Minimalist Villa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-end justify-between translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div>
                    <p className="text-gray-300 text-sm font-sans tracking-widest uppercase mb-2">
                      Residential
                    </p>
                    <h3 className="text-white font-serif text-3xl md:text-4xl">
                      Modern Minimalist Villa
                    </h3>
                  </div>
                  <button className="w-12 h-12 shrink-0 bg-white text-[#a08665] rounded-full flex items-center justify-center hover:bg-[#a08665] hover:text-white transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image 2: Kitchen Interior */}
              <div className="relative w-full h-[250px] lg:h-[400px] overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                  alt="Kitchen Interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div>
                    <p className="text-gray-300 text-sm font-sans tracking-widest uppercase mb-2">
                      Interior
                    </p>
                    <h3 className="text-white font-serif text-2xl lg:text-3xl">
                      Kitchen Interior
                    </h3>
                  </div>
                  <button className="w-12 h-12 shrink-0 bg-white text-[#a08665] rounded-full flex items-center justify-center hover:bg-[#a08665] hover:text-white transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMN 3 */}
            <div className="lg:col-span-1">
              {/* Image 3: Commercial Office */}
              <div className="relative w-full h-[400px] md:h-full lg:h-[804px] overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Commercial Office"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div>
                    <p className="text-gray-300 text-sm font-sans tracking-widest uppercase mb-2">
                      Commercial
                    </p>
                    <h3 className="text-white font-serif text-2xl lg:text-3xl">
                      Modern Office
                    </h3>
                  </div>
                  <button className="w-12 h-12 shrink-0 bg-white text-[#a08665] rounded-full flex items-center justify-center hover:bg-[#a08665] hover:text-white transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMN 4 */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              {/* Image 4: Living Area */}
              <div className="relative w-full h-[250px] overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
                  alt="Living Area"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div>
                    <p className="text-gray-300 text-sm font-sans tracking-widest uppercase mb-2">
                      Residential
                    </p>
                    <h3 className="text-white font-serif text-2xl">
                      Living Area
                    </h3>
                  </div>
                  <button className="w-12 h-12 shrink-0 bg-white text-[#a08665] rounded-full flex items-center justify-center hover:bg-[#a08665] hover:text-white transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image 5: Bedroom Interior */}
              <div className="relative w-full h-[250px] overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"
                  alt="Bedroom Interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div>
                    <p className="text-gray-300 text-sm font-sans tracking-widest uppercase mb-2">
                      Interior
                    </p>
                    <h3 className="text-white font-serif text-2xl">
                      Bedroom Design
                    </h3>
                  </div>
                  <button className="w-12 h-12 shrink-0 bg-white text-[#a08665] rounded-full flex items-center justify-center hover:bg-[#a08665] hover:text-white transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Special Box: View Our Projects Overlay Box */}
              <div className="relative w-full h-[250px] lg:h-[256px] overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                  alt="Background"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* White Translucent Overlay */}
                <div className="absolute inset-0 bg-white/70 transition-colors duration-300 group-hover:bg-white/60"></div>
                {/* Centered Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-black font-serif text-2xl relative z-10 transition-transform duration-300 group-hover:scale-105">
                    View Our Projects
                  </h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* why choose us */}
      <div className="w-full bg-[#fcfcfc] py-16 md:py-24 px-6 sm:px-8 lg:px-16 flex justify-center">
        <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT COLUMN: Text & List */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Headings */}
            <h2 className="text-4xl md:text-[2.75rem] font-serif leading-tight mb-2 text-black">
              Why Clients Choose <br />
              <span className="text-[#b59a76]">Heltech Interiors</span>
            </h2>
            <p className="text-gray-800 font-serif text-[15px] mt-4 mb-6">
              State-of-the-art tools and services to bring your vision to life
            </p>

            {/* Custom Divider Line with Dot */}
            <div className="flex items-center mb-6">
              <div className="w-24 h-[1px] bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mx-2"></div>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* List Items */}
            <div data-aos="fade-left" className="flex flex-col">
              {listItems.map((item, index) => (
                <div
                  key={index}
                  className={`py-4 ${index !== listItems.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                  <h3 className="font-serif text-black leading-snug">
                    <span className="block text-[22px]">{item.value}</span>
                    <span className="block text-[20px] text-gray-800 mt-1">
                      {item.label}
                    </span>
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Image Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {/* Top Row */}
              <div className="col-span-2 h-[220px] sm:h-[300px] lg:h-[320px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80"
                  alt="Bright Kitchen Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-1 h-[220px] sm:h-[300px] lg:h-[320px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80"
                  alt="Sofa with Abstract Painting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Row */}
              <div className="col-span-2 h-[240px] sm:h-[350px] lg:h-[380px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
                  alt="Modern Living Area"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-1 h-[240px] sm:h-[350px] lg:h-[380px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80"
                  alt="Bedroom Corner with Pendant"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Query;
