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
import cert5 from "../assets/cert5.png"; 
import cert6 from "../assets/cert6.png"; 

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 1. Split Data: Honors & Awards (The Big Wins)
const honorsData = [
  {
    id: 4,
    title: "2nd Position: Cod-A-FestX 3.0",
    issuer: "InnovXus & LPU (My First Hackathon Win!)",
    image: cert4,
    badge: "🏆 Hackathon Winner",
    highlight: true, // Triggers the special golden/purple UI
  },
];

// 2. Split Data: Learning & Certifications (Courses & Participation)
const certificationsData = [
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
    id: 5,
    title: "Inovation Expo 2026", 
    issuer: "The participation in Innotech 2026 LPU",       
    image: cert5, 
  },
  {
    id: 6,
    title: "Workshop on Web Development", 
    issuer: "Fullstack Intelligence 1.0 (Hackathon for AI&ML)",       
    image: cert6,
  },
];

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", 
      },
    });

    // Staggered Entrance
    tl.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    // Ambient Levitation Effect
    tl.add(() => {
      cards.forEach((card, index) => {
        const isHighlight = card.dataset.highlight === "true";
        
        // Give the featured award a unique golden/purple glow, others get standard purple
        const activeShadow = isHighlight 
          ? "0 0 30px rgba(234, 179, 8, 0.3), inset 0 0 15px rgba(168, 85, 247, 0.2)" 
          : "0 0 20px rgba(168, 85, 247, 0.25), inset 0 0 10px rgba(168, 85, 247, 0.05)";

        gsap.to(card, {
          y: index % 2 === 0 ? -8 : 8,
          boxShadow: activeShadow,
          duration: 3 + (index % 2) * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: index * 0.15,
        });
      });
    });

  }, { scope: containerRef });

  // Helper to add refs seamlessly across both mapped arrays
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="career-section section-container" ref={containerRef} style={{ padding: "100px 0" }}>
      <div className="career-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* HONORS & AWARDS SECTION */}
        <div style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "40px", textAlign: "center" }}>
            Honors & <span>Awards</span>
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
            {honorsData.map((award) => (
              <div
                key={award.id}
                ref={addToRefs}
                data-highlight="true"
                style={{
                  position: "relative",
                  border: "1px solid rgba(234, 179, 8, 0.4)", // Gold tinted border
                  background: "linear-gradient(145deg, rgba(20, 15, 30, 0.9) 0%, rgba(15, 15, 20, 0.95) 100%)",
                  borderRadius: "20px",
                  padding: "24px",
                  overflow: "hidden",
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Winner Badge */}
                <div style={{
                  position: "absolute", top: "20px", right: "20px",
                  background: "rgba(234, 179, 8, 0.15)", color: "#facc15",
                  padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold",
                  border: "1px solid rgba(234, 179, 8, 0.3)", zIndex: 10
                }}>
                  {award.badge}
                </div>

                <img src={award.image} alt={award.title} style={{ borderRadius: "12px", width: "100%", height: "auto", marginBottom: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }} />
                
                <h4 style={{ color: "#ffffff", fontSize: "1.3rem", fontWeight: "bold", marginBottom: "8px" }}>
                  {award.title}
                </h4>
                <h5 style={{ color: "#c084fc", fontSize: "1rem" }}>{award.issuer}</h5>
              </div>
            ))}
          </div>
        </div>

        {/* LEARNING & CERTIFICATIONS SECTION */}
        <div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "40px", textAlign: "center", opacity: 0.9 }}>
            Learning & <span>Certifications</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                ref={addToRefs}
                data-highlight="false"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: "rgba(15, 15, 20, 0.6)",
                  borderRadius: "16px",
                  padding: "20px",
                  backdropFilter: "blur(12px)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(25, 20, 35, 0.8)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(15, 15, 20, 0.6)"}
              >
                <img src={cert.image} alt={cert.title} style={{ borderRadius: "8px", width: "100%", height: "auto", marginBottom: "16px", opacity: 0.9 }} />
                <h4 style={{ color: "#e2e8f0", fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>
                  {cert.title}
                </h4>
                <h5 style={{ color: "#a855f7", fontSize: "0.85rem", opacity: 0.8 }}>{cert.issuer}</h5>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Career;