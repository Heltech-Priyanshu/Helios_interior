import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../../feature/carousel/carouselSlice";
import { API_URL } from "../../config/config";



export default function Carousel() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);

  const { data, loading } = useSelector((state) => state.carousel);
  const slides = data?.data ?? [];

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  useEffect(() => {
    if (!slides.length) return;

    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 4500);

    return () => clearInterval(t);
  }, [slides.length]);

  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  const next = () => setCurrent((p) => (p + 1) % slides.length);


  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  


  return (

    
    <div className="relative w-full overflow-hidden h-[70vh] sm:h-[80vh] md:h-screen">
      {/* Track */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative flex-shrink-0 overflow-hidden"
          >
            {/* Image with Parallax */}
            <img
              src={`${API_URL}${slide.image_url}`}
              alt={slide.title}
              className="w-full h-[115%] object-cover scale-110 transition-transform duration-75"
              style={{
                transform: `translateY(${scrollY * 0.25}px) scale(1.1)`,
              }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,12,10,0.88) 0%, rgba(15,12,10,0.25) 45%, transparent 100%)",
              }}
            />

            {/* Extra Luxury Gradient Blur */}
            <div className="absolute inset-0 bg-black/10 backdrop-[blur(1px)]" />

            {/* Content */}
            <div
              className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 md:px-16 lg:px-24 pb-16 sm:pb-20 md:pb-24"
              style={{
                transform: `translateY(-${scrollY * 0.08}px)`,
              }}
            >
              <h2
                className="
              font-serif
              text-3xl
              sm:text-4xl
              md:text-6xl
              lg:text-7xl
              font-light
              text-[#f7f3ee]
              leading-tight
              tracking-wide
              max-w-[95%]
              sm:max-w-[80%]
              md:max-w-[70%]
              drop-shadow-2xl
            "
              >
                {slide.title || ""}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div
        className="
      absolute
      bottom-5
      sm:bottom-8
      left-4
      sm:left-8
      md:left-16
      right-4
      sm:right-8
      md:right-16
      flex
      flex-col
      sm:flex-row
      gap-5
      sm:gap-0
      items-start
      sm:items-end
      justify-between
      z-20
    "
      >
        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-[2px] transition-all duration-300"
              style={{
                width: i === current ? "38px" : "16px",
                background:
                  i === current ? "#d4b896" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>

        {/* Counter + Arrows */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Counter */}
          <span
            className="
          font-serif
          text-[10px]
          sm:text-xs
          tracking-[3px]
          text-[#d4b896]/80
        "
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            {[prev, next].map((fn, i) => (
              <button
                key={i}
                onClick={fn}
                className="
              w-9
              h-9
              sm:w-11
              sm:h-11
              border
              border-[#d4b896]/35
              hover:border-[#d4b896]
              hover:bg-[#d4b896]/10
              flex
              items-center
              justify-center
              transition-all
              duration-300
              backdrop-blur-sm
            "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d4b896"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <polyline
                    points={i === 0 ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div
          className="
        absolute
        top-4
        right-4
        sm:top-6
        sm:right-8
        text-[9px]
        sm:text-[10px]
        tracking-[3px]
        uppercase
        text-[#d4b896]/60
        z-20
      "
        >
          Loading...
        </div>
      )}
      </div>
   
  );
}
  