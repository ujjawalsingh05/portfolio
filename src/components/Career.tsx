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
    // 1. Staggered Entrance Animation on Scroll
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Triggers when the section is 20% visible
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  // 2. 3D Hover Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.25)", // Subtle purple glow on hover
      borderColor: "rgba(168, 85, 247, 0.4)",
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    // Reset back to normal flat state
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Original dark shadow
      borderColor: "rgba(255, 255, 255, 0.05)", // Assuming slight border from your CSS
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <div className="career-section section-container" ref={containerRef}>
      <div className="career-container">
        <h2>
          My <span>Certifications</span>
        </h2>

        <div className="certificates-grid" style={{ perspective: "1000px" }}>
          {certificatesData.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="cert-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                willChange: "transform",
                transformStyle: "preserve-3d", // Keeps the image flat while the card rotates
                transition: "border-color 0.3s ease",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="cert-image"
                style={{ transform: "translateZ(30px)" }} // Pops the image slightly out of the card during 3D tilt
              />
              <div 
                className="cert-details"
                style={{ transform: "translateZ(40px)" }} // Pops the text even further out
              >
                <h4>{cert.title}</h4>
                <h5 style={{ color: "#c084fc", marginTop: "4px" }}>{cert.issuer}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;