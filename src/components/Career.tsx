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
  },
  {
    id: "cert1",
    title: "Project Management Assessment",
    issuer: "LearnTube.ai",
    image: cert1,
  },
  {
    id: "cert2",
    title: "COD-A-FESTX 3.0 Hackathon",
    issuer: "LYNQUP & LPU",
    image: cert2,
  },
  {
    id: "cert3",
    title: "Intro to Artificial Intelligence",
    issuer: "Infosys Springboard",
    image: cert3,
  },
  {
    id: "cert5",
    title: "Innovation Expo 2026", 
    issuer: "Innotech 2026 LPU",       
    image: cert5, 
  },
  {
    id: "cert6",
    title: "Workshop on Web Development", 
    issuer: "Fullstack Intelligence 1.0",       
    image: cert6,
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
      duration: 25, 
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
        
        const targetText = document.querySelector(`.cert-text-${certId}`) as HTMLElement;

        if (isCenter && !isAlreadyActive) {
          cert.dataset.active = "true";
          
          gsap.to(cert, {
            scale: 1.05,
            opacity: 1,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
            borderColor: "rgba(168, 85, 247, 0.6)",
            duration: 0.4,
            ease: "power2.out",
          });

          if (targetText && targetText.dataset.active !== "true") {
            targetText.dataset.active = "true";
            gsap.fromTo(
              targetText,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" }
            );
          }
        } else if (!isCenter && isAlreadyActive) {
          cert.dataset.active = "false";

          gsap.to(cert, {
            scale: 0.9,
            opacity: 0.4,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
            borderColor: "rgba(255, 255, 255, 0.05)",
            duration: 0.4,
            ease: "power2.out",
          });

          if (targetText && targetText.dataset.active === "true") {
            targetText.dataset.active = "false";
            gsap.to(targetText, {
              y: -30,
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
      className="career-section" // Removed 'section-container' to avoid its CSS overriding our flex row
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row", // Force left/right split
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        backgroundColor: "transparent",
        paddingTop: "60px", // Accommodate navbar
      }}
    >
      {/* MASSIVE BACKGROUND TEXT */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16vw",
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

        <div style={{ position: "relative", height: "200px", width: "100%" }}>
          {allCertificates.map((cert) => (
            <div
              key={cert.id}
              className={`cert-text-${cert.id}`}
              data-active="false"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                opacity: 0, 
                pointerEvents: "none",
              }}
            >
              {cert.badge && (
                <div style={{
                  display: "inline-block",
                  background: "rgba(234, 179, 8, 0.15)", color: "#facc15",
                  padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold",
                  border: "1px solid rgba(234, 179, 8, 0.3)", marginBottom: "15px"
                }}>
                  {cert.badge}
                </div>
              )}
              <h3 style={{ fontSize: "2.5rem", color: "#ffffff", fontWeight: "bold", margin: "0 0 10px 0", lineHeight: 1.2 }}>
                {cert.title}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "3px", height: "16px", backgroundColor: "#c084fc" }} />
                <span style={{ color: "#a3a3a3", fontSize: "1.1rem", letterSpacing: "1px" }}>
                  {cert.issuer}
                </span>
              </div>
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
          justifyContent: "flex-end", // Pushes the loop to the right edge
          paddingRight: "8%",
          alignItems: "center",
          zIndex: 10,
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
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
                opacity: 0.4, 
                transform: "scale(0.9)", 
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                overflow: "hidden"
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