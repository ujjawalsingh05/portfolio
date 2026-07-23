import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import kisansenseImg from "../assets/kisansense.jpg";
import krishisetuImg from "../assets/krishisetu.jpg";
import environmentalImg from "../assets/environmental.jpg";
import collegetvImg from "../assets/collegetv.jpg";

gsap.registerPlugin(useGSAP);

const projectsData = [
  {
    name: "Kisan Sense",
    category: "Agri-Tech Platform",
    description: "A voice-integrated market intelligence platform tailored for farmers, designed to provide real-time mandi prices and AI price forecasting.",
    tech: "React, APIs, Voice UI, Machine Learning, Next.js",
    image: kisansenseImg,
  },
  {
    name: "Krishi Setu",
    category: "Embedded AI / IoT",
    description: "A solar-powered smart agriculture monitoring system utilizing ESP32-CAM, DHT22, and soil moisture sensors. It processes environmental data at the edge via TinyML and lightweight CNNs to optimize crop health and resource usage.",
    tech: "ESP32-CAM, Arduino, TinyML, TensorFlow, LDR Sensors",
    image: krishisetuImg,
  },
  {
    name: "Environmental Dashboard",
    category: "Real-time Data Tracking",
    description: "A real-time environmental tracking tool displaying live AQI data and precise pollutant breakdowns. Built with a customized deep contrast UI featuring dynamic background transitions based on current air quality metrics.",
    tech: "Next.js, Gemini API, REST APIs, Tailwind CSS",
    image: environmentalImg,
  },
  {
    name: "College TV",
    category: "Secure P2P Video Network",
    description: "An exclusive, end-to-end encrypted P2P video network for verified university students. Enforces strict institutional email whitelisting (e.g., .lpu.in) to eliminate bots, utilizing WebRTC for decentralized, direct browser-to-browser streaming.",
    tech: "Next.js 14, TypeScript, WebRTC, Firebase Auth",
    image: collegetvImg,
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const workContainer = document.querySelector(".work-container");
      
      if (!workContainer || box.length === 0) return;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentElement = box[0].parentElement;
      
      if (!parentElement) return;

      const parentWidth = parentElement.getBoundingClientRect().width;
      let padding: number = parseInt(window.getComputedStyle(box[0]).padding) / 2;
      
      // Restored YOUR original math: This perfectly accounts for the flexbox overflow!
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // The pin will now last exactly as long as it needs to
        scrub: 1, // Kept this at '1' instead of 'true' to eliminate scroll lag
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projectsData.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                
                <h4>Overview</h4>
                <p>{project.description}</p>
                
                <h4 style={{ marginTop: "20px" }}>Tech Stack</h4>
                <p>{project.tech}</p>

              </div>
              <WorkImage image={project.image} alt={`${project.name} interface`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;