import { useEffect } from "react";
import Home from "./pages/Home";
import CompanyDetails from "./pages/AdminDashboard/CompanyDetails";
import ContactDetails from "./pages/AdminDashboard/contactDetails";
import Faqs from "./pages/AdminDashboard/Faqs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/AdminDashboard/layout/Layout";
import SliderDetails from "./pages/AdminDashboard/SliderDetails";
import Login from "./pages/Login";
import Protechted from "./utils/Protechted";
import AOS from 'aos';
import "aos/dist/aos.css";
import {ReactLenis} from "lenis/react"
import About from "../src/componets/section/About";
import Service from "./pages/AdminDashboard/Service";
import Gallery from "./pages/AdminDashboard/Gallery";

function App() {
   useEffect(() => {
      AOS.init({
        duration: 2000,// global duration for all animations in ms
        once: false,    // whether animation should happen only once - while scrolling down
      });
   }, []);
  
  const lenisOptions = {
    lerp: 0.03, // Smoothness control (Default: 0.1)
    duration: 3, // Scroll duration
    smoothWheel: true, // Mouse wheel se smooth scroll on
    smoothTouch: false, // Touch devices pe native scroll hi better rehta hai
    wheelMultiplier: 1.5, // Scroll ki speed/sensitivity
    touchMultiplier: 2, // Touch ki sensitivity (agar smoothTouch true ho)
  };
  
  return (
    <>
      <ReactLenis root options={lenisOptions}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="login" element={<Login />} />
            <Route path="contact" element={<About />} />

            <Route element={<Protechted allow={["admin"]} />}>
              <Route path="/admin" element={<Layout />}>
                <Route path="companydetails" element={<CompanyDetails />} />
                <Route path="contactdetails" element={<ContactDetails />} />
                <Route path="faqs" element={<Faqs />} />
                <Route path="createslider" element={<SliderDetails />} />
                <Route path="createservice" element={<Service />} />
                <Route path="creategallery" element={<Gallery />} />
              </Route>
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ReactLenis>
    </>
  );
}

export default App;
