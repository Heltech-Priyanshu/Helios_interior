import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image2 from "../../assets/image.png";
import image1 from "../../assets/Oimage.png";
import image3 from "../../assets/Rimage.png";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const containerRef = useRef(null);

  const steps = [
    {
      num: "01",
      title: "Concept Development",
      desc: "Our certified designers bring years of experience and fresh perspectives to every project.",
      imgSrc: image3,
    },
    {
      num: "02",
      title: "Detailed Space Planning",
      desc: "We curate custom layouts and 3D visualizations to match your style perfectly.",
      imgSrc: image2,
    },
    {
      num: "03",
      title: "Flawless Execution",
      desc: "Meticulous quality checks and timely handovers ensure your dream space comes alive.",
      imgSrc: image1,
    },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const images = gsap.utils.toArray(".step-img");

      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", 
          end: `+=${steps.length * 100}%`, 
          pin: true, 
          scrub: 1, 
        },
      });

      
      steps.forEach((_, i) => {
        if (i === 0) return; 

      
        tl.to(
          ".text-wrapper",
          {
            yPercent: -(100 / steps.length) * i,
            ease: "none",
          },
          `step${i}`, 
        );

        tl.fromTo(
          images[i],
          { yPercent: 100 },
          { yPercent: 0, ease: "none" },
          `step${i}`,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ fontFamily: "Georgia, serif", backgroundColor: "white" }}
     
      className="w-full h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-[1700px] w-full mx-auto px-6 mb-8 shrink-0">
        <h2 className="text-4xl md:text-5xl font-serif mb-3 text-black">
          Our <span className="text-[#b59a76]">Design Process</span>
        </h2>
        <p className="text-gray-900 font-serif text-lg pb-6 ">
          State of the art tools and services to bring your vision to life
        </p>
      </div>

      <div className="max-w-[1700px] w-full mx-auto px-6">
       
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center h-[350px] md:h-[480px]">
          {/* LEFT: IMAGES STACK */}
          <div className="lg:col-span-7 relative w-full h-full overflow-hidden rounded-sm shadow-md">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-img absolute inset-0 w-full h-full"
                style={{ zIndex: index }}
              >
                <img
                  src={step.imgSrc}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 relative w-full h-full overflow-hidden">
            <div
              className="text-wrapper absolute top-0 left-0 w-full flex flex-col"
              style={{ height: `${steps.length * 100}%` }}
            >
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="step-text flex-1 flex flex-col justify-center"
                >
                  <div className="flex items-start justify-between gap-4 w-full">
                    <div className="max-w-sm">
                      <h3 className="text-2xl md:text-3xl font-serif text-black mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 font-serif text-[17px] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="flex flex-col items-end shrink-0 pl-4">
                      <span className="text-7xl md:text-[7rem] font-serif text-[#4a4a4a] leading-none mb-4">
                        {step.num}
                      </span>
                      <div className="relative w-32 right-2  md:w-40 flex items-center justify-end">
                        <div className="w-full h-[2px] bg-[#d1d1d1]"></div>
                        <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-[#d1d1d1] translate-x-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
