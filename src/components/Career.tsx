"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./styles/Career.css";

import cert1 from "../assets/cert1.png";
import cert2 from "../assets/cert2.png";
import cert3 from "../assets/cert3.png";
import cert4 from "../assets/cert4.png";
import cert5 from "../assets/cert5.png"; 
import cert6 from "../assets/cert6.png"; 

gsap.registerPlugin(useGSAP);

const allCertificates = [
  {
    id: "cert4",
    title: "2nd Position: Cod-A-FestX 3.0",
    issuer: "InnovXus & LPU",
    image: cert4,
    badge: "🏆 Hackathon Winner",
    isWinner: true, // Used to trigger the special Gold Glow
    description: "Secured 2nd place in a high-stakes development sprint. Proved my ability to architect scalable solutions, thrive under pressure, and turn complex problems into winning tech out of numerous competing teams.",
  },
  {
    id: "cert1",
    title: "Project Management Assessment",
    issuer: "LearnTube.ai",
    image: cert1,
    isWinner: false,
    description: "Demonstrated foundational knowledge in agile methodologies, cross-functional team collaboration, and effective project lifecycle execution.",
  },
  {
    id: "cert2",
    title: "COD-A-FESTX 3.0 Hackathon",
    issuer: "LYNQUP & LPU",
    image: cert2,
    isWinner: false,
    description: "Officially recognized for active technical contributions and collaborative problem-solving during the rigorous development phases of the hackathon.",
  },
  {
    id: "cert3",
    title: "Intro to Artificial Intelligence",
    issuer: "Infosys Springboard",
    image: cert3,
    isWinner: false,
    description: "Mastered the core concepts of AI, diving into machine learning algorithms, neural network foundations, and real-world intelligent applications.",
  },
  {
    id: "cert5",
    title: "Innovation Expo 2026", 
    issuer: "Innotech 2026 LPU",       
    image: cert5, 
    isWinner: false,
    description: "Showcased innovative project work and technical proficiency alongside top engineering peers at the university's premier technology exhibition.",
  },
  {
    id: "cert6",
    title: "Workshop on Web Development", 
    issuer: "Fullstack Intelligence 1.0",       
    image: cert6,
    isWinner: false,
    description: "Gained hands-on experience in modern full-stack web development workflows, focusing on responsive UI design and backend integration.",
  },
];

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // 1. Infinite Vertical Auto-Scroll
    trackRef.current = gsap.to(".certs-track", {
      yPercent: -50,
      ease: "none",
      duration: 30, // Slowed down slightly so the new text is easy to read
      repeat: -1,
    });

    // 2. Real-Time Center Detection
    const checkCenterHighlight = () => {
      if (!containerRef.current) return;

      const rightSide = document.querySelector(".right-side-loop");
      if (!rightSide) return;

      const trackRect = rightSide.getBoundingClientRect();
      const centerY = trackRect.top + trackRect.height / 2;

      const certs = gsap.utils.toArray<HTMLElement>(".cert-image-wrapper");

      certs.forEach((cert) => {
        const certRect = cert.getBoundingClientRect();
        const certCenterY = certRect.top + certRect.height / 2;
        const distanceFromCenter = Math.abs(centerY - certCenterY);

        // Threshold for active state
        const isCenter = distanceFromCenter < 120;
        const isAlreadyActive = cert.dataset.active === "true";
        const certId = cert.dataset.id;
        const isWinner = cert.dataset.winner === "true";
        
        const targetText = document.querySelector(`.cert-text-${certId}`) as HTMLElement;

        if (isCenter && !isAlreadyActive) {
          cert.dataset.active = "true";
          
          // Determine Glow Type: Gold for Winner, Bright Purple for others
          const activeGlow = isWinner 
            ? "0 0 45px rgba(234, 179, 8, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.3)" // Epic Gold + Purple
            : "0 0 40px rgba(168, 85, 247, 0.6), inset 0 0 15px rgba(168, 85, 247, 0.2)"; // Intense Neon Purple

          const activeBorder = isWinner ? "rgba(234, 179, 8, 0.8)" : "rgba(168, 85, 247, 0.8)";

          gsap.to(cert, {
            scale: 1.08, // Pops out slightly more
            opacity: 1,
            boxShadow: activeGlow,
            borderColor: activeBorder,
            duration: 0.4,
            ease: "power2.out",
          });

          if (targetText && targetText.dataset.active !== "true") {
            targetText.dataset.active = "true";
            gsap.fromTo(
              targetText,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" }
            );
          }
        } else if (!isCenter && isAlreadyActive) {
          cert.dataset.active = "false";

          gsap.to(cert, {
            scale: 0.85, // Shrinks back down
            opacity: 0.3, // Dims out
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
            borderColor: "rgba(255, 255, 255, 0.05)",
            duration: 0.4,
            ease: "power2.out",
          });

          if (targetText && targetText.dataset.active === "true") {
            targetText.dataset.active = "false";
            gsap.to(targetText, {
              y: -40,
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        }
      });
    };

    gsap.ticker.add(checkCenterHighlight);

    return () => {
      gsap.ticker.remove(checkCenterHighlight);
    };
  }, []);

  return (
    <div
      className="career-section" 
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        backgroundColor: "transparent",
        paddingTop: "60px", 
      }}
    >
      {/* MASSIVE BACKGROUND TEXT */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "15vw",
          fontWeight: "900",
          color: "rgba(255, 255, 255, 0.02)",
          pointerEvents: "none",
          zIndex: 0,
          whiteSpace: "nowrap",
        }}
      >
        ACHIEVEMENTS
      </div>

      {/* LEFT SIDE: DYNAMIC TEXT */}
      <div
        style={{
          width: "45%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "8%",
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "3.5rem", color: "#ffffff", margin: 0, fontWeight: "900" }}>
            Honors & <br/><span style={{ color: "#c084fc" }}>Certifications</span>
          </h2>
        </div>

        <div style={{ position: "relative", height: "260px", width: "100%" }}>
          {allCertificates.map((cert) => (
            <div
              key={cert.id}
              className={`cert-text-${cert.id}`}
              data-active="false"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "95%",
                opacity: 0, 
                pointerEvents: "none",
              }}
            >
              {cert.badge && (
                <div style={{
                  display: "inline-block",
                  background: "rgba(234, 179, 8, 0.15)", color: "#facc15",
                  padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold",
                  border: "1px solid rgba(234, 179, 8, 0.3)", marginBottom: "15px",
                  boxShadow: "0 0 15px rgba(234, 179, 8, 0.2)" // Subtle glow on the badge itself
                }}>
                  {cert.badge}
                </div>
              )}
              
              <h3 style={{ fontSize: "2.4rem", color: "#ffffff", fontWeight: "bold", margin: "0 0 10px 0", lineHeight: 1.2 }}>
                {cert.title}
              </h3>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "3px", height: "16px", backgroundColor: "#c084fc" }} />
                <span style={{ color: "#a3a3a3", fontSize: "1.1rem", letterSpacing: "1px" }}>
                  {cert.issuer}
                </span>
              </div>

              {/* Added Description Paragraph */}
              <p style={{ color: "#d1d5db", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
                {cert.description}
              </p>

            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: INFINITE CERTIFICATE LOOP */}
      <div
        className="right-side-loop"
        onMouseEnter={() => trackRef.current?.pause()}
        onMouseLeave={() => trackRef.current?.play()}
        style={{
          width: "55%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-end", 
          paddingRight: "8%",
          alignItems: "center",
          zIndex: 10,
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      >
        <div
          className="certs-track"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            paddingTop: "50vh",
          }}
        >
          {[...allCertificates, ...allCertificates].map((cert, index) => (
            <div
              key={index}
              className="cert-image-wrapper"
              data-id={cert.id}
              data-winner={cert.isWinner} // Tells GSAP if it gets the Gold Glow
              data-active="false"
              style={{
                width: "420px", 
                height: "290px", 
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backgroundColor: "rgba(20, 20, 25, 0.7)",
                backdropFilter: "blur(10px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.3, // Starts dimmer
                transform: "scale(0.85)", // Starts smaller
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                overflow: "hidden",
                transition: "border-color 0.3s ease",
              }}
            >
              <img
                src={cert.image}
                alt={cert.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;