import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../componets/section/Header";
import Footer from "../componets/section/Footer";
import Carousel from "../componets/section/Carousel";
import { fetchUser } from "../feature/companyDetails/companySlice";
import { Parallax } from "react-scroll-parallax";
import Contactform from "../componets/section/Contactform";
import Faqsection from "../componets/section/Faqsection";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "../componets/section/Card";
import About from "../componets/section/About";
import ProjectSection from "../componets/section/ProjectSection";
import Query from "../componets/section/Query";
import InteriorEstimate from "../componets/section/InteriroEsimate";
import Review from "../componets/section/Review";

const Home = () => {
  
  useEffect(() => {
    AOS.init({
      duration: 1000, // global duration for all animations in ms
      once: false,    // whether animation should happen only once - while scrolling down
    });
  }, []);

 
  return (
    <>
      <Header />
      <Carousel />
      <About />
      <Card />
      <ProjectSection />
      <Query />
      <InteriorEstimate />
      <Review />
      <Contactform/>
      <Footer />
    </>
  );
};

export default Home;
