import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import kisansenseImg from "../assets/kisansense.jpg";
import krishisetuImg from "../assets/krishisetu.jpg";
import environmentalImg from "../assets/environmental.jpg";
import collegetvImg from "../assets/collegetv.jpg";

gsap.registerPlugin(useGSAP);

const projectsData = [
  {
    name: "Kisan Sense",
    category: "Agri-Tech Platform",
    description:
      "A voice-integrated market intelligence platform tailored for farmers, designed to provide real-time mandi prices and AI price forecasting.",
    tech: "React, APIs, Voice UI, Machine Learning, Next.js",
    image: kisansenseImg,
  },
  {
    name: "Krishi Setu",
    category: "Embedded AI / IoT",
    description:
      "A solar-powered smart agriculture monitoring system utilizing ESP32-CAM, DHT22, and soil moisture sensors. It processes environmental data at the edge via TinyML and lightweight CNNs to optimize crop health and resource usage.",
    tech: "ESP32-CAM, Arduino, TinyML, TensorFlow, LDR Sensors",
    image: krishisetuImg,
  },
  {
    name: "Environmental Dashboard",
    category: "Real-time Data Tracking",
    description:
      "A real-time environmental tracking tool displaying live AQI data and precise pollutant breakdowns. Built with a customized deep contrast UI featuring dynamic background transitions based on current air quality metrics.",
    tech: "Next.js, Gemini API, REST APIs, Tailwind CSS",
    image: environmentalImg,
  },
  {
    name: "College TV",
    category: "Secure P2P Video Network",
    description:
      "An exclusive, end-to-end encrypted P2P video network for verified university students. Enforces strict institutional email whitelisting (e.g., .lpu.in) to eliminate bots, utilizing WebRTC for decentralized, direct browser-to-browser streaming.",
    tech: "Next.js 14, TypeScript, WebRTC, Firebase Auth",
    image: collegetvImg,
  },
];

const Work = () => {
  const marqueeRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // 1. Infinite Horizontal Auto-Scroll (Marquee)
    // -50% shifts exactly one full set of projects before looping seamlessly
    marqueeRef.current = gsap.to(".work-flex", {
      xPercent: -50,
      ease: "none",
      duration: 35, // Adjust higher for slower scroll, lower for faster
      repeat: -1,
    });

    // 2. Floating Tile Animation
    // Alternates vertical floating direction for odd/even cards
    const boxes = gsap.utils.toArray<HTMLElement>(".work-box");
    boxes.forEach((box, index) => {
      gsap.to(box, {
        y: index % 2 === 0 ? -16 : 16, // Evens float up, odds float down
        duration: 2.8 + (index % 2) * 0.4, // Slight duration variations for an organic feel
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.15,
      });
    });
  }, []);

  return (
    <div 
      className="work-section" 
      id="work"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div
          className="work-track"
          style={{ width: "100%", overflow: "hidden" }}
          onMouseEnter={() => marqueeRef.current?.pause()}
          onMouseLeave={() => marqueeRef.current?.play()}
        >
          {/* 
            Rendering projectsData TWICE ([...projectsData, ...projectsData]) 
            allows the loop to reset seamlessly without any blank gap.
          */}
          <div
            className="work-flex"
            style={{
              display: "flex",
              width: "max-content",
              willChange: "transform",
            }}
          >
            {[...projectsData, ...projectsData].map((project, index) => {
              const originalIndex = (index % projectsData.length) + 1;

              return (
                <div
                  className="work-box"
                  key={index}
                  style={{
                    flexShrink: 0,
                    marginRight: "2rem", // Spacing between tiles
                  }}
                >
                  <div className="work-info">
                    <div className="work-title">
                      <h3>0{originalIndex}</h3>
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

                  <WorkImage
                    image={project.image}
                    alt={`${project.name} interface`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;