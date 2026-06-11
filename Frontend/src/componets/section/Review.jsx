import { useState, useEffect } from "react";
import { faqsDetails } from "../../services/api";
import axios from "axios";

const Review = () => {
  const cardsData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      category: "Commercial",
      date: "July 23, 2025",
      title: "12+ Latest High Gloss Office Cabinet Ideas",
      excerpt:
        "Your kitchen should be as exciting as the rest of your abode because inspiration stems from what surrounds you be it people",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      category: "Commercial",
      date: "July 23, 2025",
      title: "12+ Latest High Gloss Office Cabinet Ideas",
      excerpt:
        "Your kitchen should be as exciting as the rest of your abode because inspiration stems from what surrounds you be it people",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      category: "Commercial",
      date: "July 23, 2025",
      title: "12+ Latest High Gloss Office Cabinet Ideas",
      excerpt:
        "Your kitchen should be as exciting as the rest of your abode because inspiration stems from what surrounds you be it people",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      category: "Commercial",
      date: "July 23, 2025",
      title: "12+ Latest High Gloss Office Cabinet Ideas",
      excerpt:
        "Your kitchen should be as exciting as the rest of your abode because inspiration stems from what surrounds you be it people",
    },
    ];
    
  const [openIndex, setOpenIndex] = useState(0);
    const [faqs, setFaq] = useState([]);

  

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

   useEffect(() => {
     const handleData = async () => {
       try {
         const res = await axios.get(faqsDetails.getFaqs);
         console.log("FAQS Response:", res.data.faqs);
         setFaq(res.data.faqs);
       } catch (error) {
         console.log("GET ERROR =>", error);
       }
     };

     handleData();
   }, []);

  return (
    <div className="w-full bg-[#fafafa] font-serif overflow-hidden">
      {/* ==========================================
          SECTION 1: GOOGLE REVIEW BANNER
      ========================================== */}
      <section className="w-full  mx-auto py-16 border-y border-gray-200 bg-white flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-[60px] text-black mb-4">
          Our Clients Simply Love Our Work
        </h2>
        <p className="text-gray-600 text-[20px] mb-10 max-w-2xl font-sans font-light">
          Because building great customer relationships is the best business
          strategy.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Custom Google Text Logo */}
          <div className="flex flex-col items-center">
            <span className="text-[52px] font-sans font-medium tracking-tighter">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <span className="text-gray-600 font-sans text-lg -mt-2">
              Review
            </span>
          </div>

          <div className="w-px h-16 bg-gray-300 hidden md:block"></div>

          {/* Rating Block */}
          <div className="flex items-center gap-4">
            <span className="text-5xl font-medium text-black">4.5</span>
            <div className="flex flex-col items-start">
              <div className="flex gap-1 mb-1">
                {/* 4 Full Stars */}
                {[1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    className="w-6 h-6 text-[#FBBC05]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                {/* 1 Half Star (Simplified to full for design, but slightly faded) */}
                <svg
                  className="w-6 h-6 text-[#FBBC05]/50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-gray-700 font-sans text-[15px]">
                Based on 1296 Reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: BLOG / CHOOSE US CARDS
      ========================================== */}
      <section className="w-full py-20 px-6 max-w-[1540px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-[44px] font-serif text-black leading-tight mb-2">
            Why Clients Choose <br />
            <span className="text-[#b59a76]">Heltech Interiors</span>
          </h2>
          <p className="text-gray-800 text-[16px] font-serif mt-2">
            State-of-the-art tools and services to bring your vision to life
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="group bg-[#fcfaf8] flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="w-full h-[220px] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Category Tag */}
                <div className="mb-4">
                  <span className="bg-[#e4d0ba] text-black font-sans text-xs px-3 py-1.5 inline-block">
                    {card.category}
                  </span>
                </div>

                {/* Date */}
                <p className="text-gray-500 font-sans text-sm mb-2">
                  {card.date}
                </p>

                {/* Title */}
                <h3 className="text-[19px] font-serif leading-snug text-black mb-3 group-hover:text-[#b59a76] transition-colors">
                  {card.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 font-serif text-[14px] leading-relaxed mb-6 flex-grow">
                  {card.excerpt}
                </p>

                {/* Read More Link */}
                <a
                  href="#"
                  className="text-[#b59a76] font-serif text-[15px] hover:text-black transition-colors"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Questions */}

      <div className="w-full bg-[#fcfcfc] py-20 px-6 flex justify-center font-serif">
        <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT COLUMN: Headings */}
          <div className="flex flex-col justify-start">
            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-2 text-black">
              Questions? <br />
              <span className="text-[#b59a76]">We're here to help</span>
            </h2>
            <p className="text-gray-900 text-lg mt-6 font-sans">
              Get answers to common questions about our design process
            </p>
          </div>

          {/* RIGHT COLUMN: Accordion */}
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-300 py-6 first:pt-0"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left focus:outline-none group"
                >
                  <h3 className="text-[22px] font-serif text-black group-hover:text-[#b59a76] transition-colors pr-4">
                    {faq.title}
                  </h3>
                  {/* Chevron Icon */}
                  <span className="ml-4 flex-shrink-0 text-black">
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {/* Expandable Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 text-[16px] leading-relaxed font-sans pr-8">
                      {faq.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
