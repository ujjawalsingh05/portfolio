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
    category: "Market Intelligence Platform",
    description:
      "An AI-powered AgriTech platform that eliminates middlemen by connecting farmers directly to buyers, equipping them with real-time market prices, predictive forecasting, and edge-AI disease detection.",
    tech: "Next.js, Tailwind CSS, Framer Motion, Flutter, FastAPI, PostgreSQL",
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
    marqueeRef.current = gsap.to(".work-flex", {
      xPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1,
    });

    // 2. Floating Tile Animation
    const boxes = gsap.utils.toArray<HTMLElement>(".work-box");
    boxes.forEach((box, index) => {
      gsap.to(box, {
        y: index % 2 === 0 ? -14 : 14,
        duration: 2.8 + (index % 2) * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.15,
      });
    });

    // 3. Real-Time Center Detection for Glow & Description Reveal
    const checkCenterHighlight = () => {
      const screenCenter = window.innerWidth / 2;

      boxes.forEach((box) => {
        const boxRect = box.getBoundingClientRect();
        const boxCenter = boxRect.left + boxRect.width / 2;
        const distanceFromCenter = Math.abs(screenCenter - boxCenter);

        // A threshold of ~300px ensures a smooth transition between boxes
        const isCenter = distanceFromCenter < 300;
        
        // This is the FIX: Check if we ALREADY animated it to prevent 60fps stuttering
        const isAlreadyActive = box.dataset.active === "true";

        const infoText = box.querySelector(".work-description-wrap");
        const titleText = box.querySelector("h4");

        if (isCenter && !isAlreadyActive) {
          // It just entered the center! Mark it as active.
          box.dataset.active = "true";

          gsap.to(box, {
            boxShadow: "-15px 0 45px rgba(168, 85, 247, 0.4), 15px 0 45px rgba(217, 70, 239, 0.4)",
            scale: 1.04,
            duration: 0.5,
            ease: "power2.out"
          });

          if (infoText) {
            gsap.to(infoText, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power2.out"
            });
          }

          if (titleText) {
            gsap.to(titleText, {
              color: "#c084fc", // Glowing light purple for active project title
              duration: 0.4,
            });
          }
        } else if (!isCenter && isAlreadyActive) {
          // It just left the center! Mark it as inactive.
          box.dataset.active = "false";

          gsap.to(box, {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            scale: 0.96,
            duration: 0.5,
            ease: "power2.out"
          });

          if (infoText) {
            gsap.to(infoText, {
              opacity: 0.5,
              y: 8,
              filter: "blur(1px)",
              duration: 0.5,
              ease: "power2.out"
            });
          }

          if (titleText) {
            gsap.to(titleText, {
              color: "#ffffff",
              duration: 0.4,
            });
          }
        }
      });
    };

    // Attach center checker to GSAP's frame ticker
    gsap.ticker.add(checkCenterHighlight);

    return () => {
      gsap.ticker.remove(checkCenterHighlight);
    };
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
          style={{ width: "100%", overflow: "hidden", padding: "40px 0" }}
          onMouseEnter={() => marqueeRef.current?.pause()}
          onMouseLeave={() => marqueeRef.current?.play()}
        >
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
                  // data-active initialized to false
                  data-active="false"
                  style={{
                    flexShrink: 0,
                    marginRight: "2.5rem",
                    borderRadius: "18px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backgroundColor: "rgba(15, 15, 20, 0.85)",
                    backdropFilter: "blur(12px)",
                    transition: "border-color 0.3s ease",
                    padding: "2rem",
                    scale: 0.96, // Start slightly scaled down
                  }}
                >
                  <div className="work-info">
                    <div className="work-title">
                      {/* Serial Number Colored Purple */}
                      <h3 style={{ color: "#c084fc", textShadow: "0 0 12px rgba(192, 132, 252, 0.4)" }}>
                        0{originalIndex}
                      </h3>
                      <div>
                        <h4>{project.name}</h4>
                        <p>{project.category}</p>
                      </div>
                    </div>

                    {/* Animated Wrap for Overview and Tech Stack (Starts hidden/dimmed) */}
                    <div
                      className="work-description-wrap"
                      style={{
                        willChange: "transform, opacity, filter",
                        opacity: 0.5,
                        filter: "blur(1px)",
                        transform: "translateY(8px)",
                      }}
                    >
                      <h4>Overview</h4>
                      <p>{project.description}</p>

                      <h4 style={{ marginTop: "20px" }}>Tech Stack</h4>
                      <p>{project.tech}</p>
                    </div>
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