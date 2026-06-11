import  { useEffect, useState } from "react";
import {faqsDetails} from "../../services/api"
import axios from 'axios'



function FaqSection() {
  const [openId, setOpenId] = useState(1);
  const [faqs,setFaq] = useState([])

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
 

  console.log('====================================');
  console.log(faqs);
  console.log('====================================');
  
  return (
    <section
      data-aos="fade-up"
      className="font-sans   min-h-screen flex items-center  justify-center  "
    >
      <div
        data-aos="fade-up"
        className="grid bg-white-300  rounded-lg  grid-cols-1 md:grid-cols-[1fr_1.35fr] gap-16 max-w-[1560px] w-[90%] items-start"
      >
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#f0e8d8] rounded-full py-[5px] pl-2 pr-3 ">
            <span className="text-[12px] font-medium text-[#c9a96e]">
              Frequently asked questions
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[clamp(32px,4vw,44px)] font-extrabold leading-[1.1] text-[#111]">
            {/* Frequently asked
            <span className="block text-[#c9a96e]">questions</span> */}
          </h2>

          {/* Text */}
          <p className="text-[13.5px] text-[#888] leading-[1.65] mt-5 max-w-[300px]">
            Choose a plan that fits your business needs and budget. No hidden
            fees, no surprises—just straightforward pricing for powerful
            financial management.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex    flex-col gap-[10px]">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                onClick={() => toggle(faq.id)}
                className={`
                  rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-300
                  bg-[#faebd0]
                  ${
                    isOpen
                      ? "border border-[#faebd0] shadow-[0_4px_24px_rgba(232,130,12,0.08)]"
                      : "border border-transparent"
                  }
                `}
              >
                {/* Question */}
                <div className="flex items-center justify-between gap-4 px-5 py-5 select-none">
                  <span
                    className={`
                      text-[14.5px] leading-[1.4] transition-all
                      ${
                        isOpen
                          ? "font-semibold text-[#111]"
                          : "font-medium text-[#444]"
                      }
                    `}
                  >
                    {faq.title}
                  </span>

                  {/* Icon */}
                  <div
                    className={`
                      w-[30px] h-[30px] rounded-full
                      flex items-center justify-center shrink-0
                      transition-all duration-300
                      ${isOpen ? "bg-[#e8820c]" : "bg-[#faebd0]"}
                    `}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`
                        w-[25px] h-[25px]
                        bg-[#eec18d]
                        rounded-full
                        transition-transform duration-300
                        ${isOpen ? "rotate-180" : ""}
                      `}
                    >
                      <polyline
                        points="6 9 12 15 18 9"
                        stroke={isOpen ? "#fff" : "#cf7915"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Answer */}
                <div
                  className={`
                    grid transition-all duration-500 ease-in-out
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                  `}
                >
                  <div className="overflow-hidden">
                    <p className="text-[13px] text-[#777] leading-[1.7] px-5 pb-5 pt-4 border-t border-[#fdf3e4]">
                      {faq.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
