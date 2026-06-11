

const InteriorEstimate = () => {
  return (
    <div className="w-full bg-[#fcfcfc] py-20 px-6 flex justify-center font-serif">
      <div className="max-w-[1600px] w-full flex flex-col items-center">
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-black">
            Get Your <span className="text-[#a88a63]">Interior Estimate</span>
          </h2>
          <p className="text-gray-800 text-[17px] leading-relaxed">
            Calculate an approximate budget for your interior project based on
            your space, requirements, and design preferences.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {/* CARD 1: Commercial */}
          <div
            data-aos="fade-right"
            className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[26px] text-black leading-tight max-w-[150px]">
                Commercial Interiors
              </h3>
              <InteriorIcon className="w-12 h-12 text-[#a88a63]" />
            </div>
            <div className="w-full h-px bg-gray-200 my-5"></div>
            <p className="text-gray-800 text-[16px] leading-relaxed flex-grow mb-8">
              Know your office interior budget for functional and professional
              workspaces.
            </p>
            <button className="w-full border border-[#a88a63] text-black py-3 px-4 rounded hover:bg-[#a88a63] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group">
              <span className="text-lg">Calculate</span>
              <ArrowCircleIcon className="w-5 h-5 text-black group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* CARD 2: Residential (Highlighted) */}
          <div
            data-aos="fade-right"
            className="bg-[#a88a63] border border-[#a88a63] rounded-lg p-8 flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[26px] text-white leading-tight max-w-[150px]">
                Residential Interiors
              </h3>
              <InteriorIcon className="w-12 h-12 text-white" />
            </div>
            <div className="w-full h-px bg-white/30 my-5"></div>
            <p className="text-white text-[16px] leading-relaxed flex-grow mb-8">
              Know your interior budget for homes designed around your lifestyle
              and space.
            </p>
            <button className="w-full border border-white text-white py-3 px-4 rounded hover:bg-white hover:text-[#a88a63] transition-colors duration-300 flex items-center justify-center gap-2 group">
              <span className="text-lg">Calculate</span>
              <ArrowCircleIcon className="w-5 h-5 text-white group-hover:text-[#a88a63] transition-colors" />
            </button>
          </div>

          {/* CARD 3: Hospitality */}
          <div
            data-aos="fade-right"
            className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[26px] text-black leading-tight max-w-[150px]">
                Hospitality Interiors
              </h3>
              <InteriorIcon className="w-12 h-12 text-[#a88a63]" />
            </div>
            <div className="w-full h-px bg-gray-200 my-5"></div>
            <p className="text-gray-800 text-[16px] leading-relaxed flex-grow mb-8">
              Know your interior budget for cafés and restaurants with inviting
              designs.
            </p>
            <button className="w-full border border-[#a88a63] text-black py-3 px-4 rounded hover:bg-[#a88a63] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group">
              <span className="text-lg">Calculate</span>
              <ArrowCircleIcon className="w-5 h-5 text-black group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SVG ICON COMPONENTS ---

// Generic Sofa/Room Icon matching the top-right illustration
const InteriorIcon = ({ className }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    {/* Wall/Window outline */}
    <path
      d="M4 44V16h24v28M44 44V24h16v20"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Window Pane Lines */}
    <path
      d="M12 16v28M20 16v28M4 26h24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lamp */}
    <path
      d="M52 24l-3-8h-6l-3 8h12zM49 24v20M45 44h8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Sofa Outline */}
    <path
      d="M12 44v-6c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 44h40v6H8v-6z" strokeLinecap="round" strokeLinejoin="round" />
    {/* Sofa Cushions */}
    <path d="M21 34v10M35 34v10" strokeLinecap="round" strokeLinejoin="round" />
    {/* Table/Plant */}
    <path
      d="M54 44v8M60 44v8M52 44h10M56 44v-4M54 36c1-2 3-2 4 0 1-2 3-2 4 0s-2 4-4 4c-2 0-4-2-4-4z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Circular Arrow Icon inside the button
const ArrowCircleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
      clipRule="evenodd"
    />
  </svg>
);

export default InteriorEstimate;
