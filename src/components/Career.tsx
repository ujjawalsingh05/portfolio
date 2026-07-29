"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles/Career.css";

// Importing directly from the new src/assets folder
import cert1 from "../assets/cert1.png";
import cert2 from "../assets/cert2.png";
import cert3 from "../assets/cert3.png";
import cert4 from "../assets/cert4.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const certificatesData = [
  {
    id: 1,
    title: "Project Management Assessment",
    issuer: "LearnTube.ai",
    image: cert1,
  },
  {
    id: 2,
    title: "COD-A-FESTX 3.0 Hackathon",
    issuer: "LYNQUP & LPU",
    image: cert2,
  },
  {
    id: 3,
    title: "Introduction to Artificial Intelligence",
    issuer: "Infosys Springboard",
    image: cert3,
  },
  {
    id: 4,
    title: "2nd Position: Cod-A-FestX 3.0",
    issuer: "InnovXus & LPU (My First Hackathon Win!)",
    image: cert4,
  },
];

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Filter out any null refs
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    // Create a timeline so the floating effect starts ONLY after they enter the screen
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Triggers when the section is 20% visible
      },
    });

    // 1. Initial Staggered Entrance
    tl.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });

    // 2. Continuous Visual Breathing / Glowing Effect (Auto-runs forever)
    tl.add(() => {
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -12 : 12, // Evens float up, odds float down
          boxShadow: "0 0 25px rgba(168, 85, 247, 0.4), inset 0 0 10px rgba(168, 85, 247, 0.1)", // Ambient purple glow
          borderColor: "rgba(168, 85, 247, 0.5)", // Pulses border to purple
          duration: 2.5 + (index % 2) * 0.5, // Slightly offset durations for an organic feel
          yoyo: true, // Go back and forth
          repeat: -1, // Loop infinitely
          ease: "sine.inOut",
          delay: index * 0.1, // Stagger the start of the float
        });
      });
    });

  }, { scope: containerRef });

  return (
    <div className="career-section section-container" ref={containerRef}>
      <div className="career-container">
        <h2>
          My <span>Certifications</span>
        </h2>

        <div className="certificates-grid">
          {certificatesData.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="cert-card"
              style={{
                willChange: "transform, box-shadow, border-color", // Optimizes performance for constant animation
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backgroundColor: "rgba(15, 15, 20, 0.85)", // Matches your dark theme
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Base shadow before the glow kicks in
              }}
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="cert-image"
                style={{ borderRadius: "8px", width: "100%", height: "auto" }}
              />
              <div className="cert-details">
                <h4 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "4px" }}>
                  {cert.title}
                </h4>
                <h5 style={{ color: "#c084fc", fontSize: "0.9rem", fontWeight: "normal" }}>
                  {cert.issuer}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;