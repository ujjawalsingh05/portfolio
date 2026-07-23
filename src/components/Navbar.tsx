import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

// Custom text-based gradient logo built directly into the Navbar file
const BrandLogo = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: "2rem", 
      fontWeight: "900",
      letterSpacing: "2px",
      userSelect: "none",
    }}
  >
    {/* Left Bracket - Pink Gradient */}
    <span
      style={{
        background: "linear-gradient(to right, #f957b6, #d96be1)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      &lt;
    </span>
    
    {/* Initials */}
    <span style={{ color: "#ffffff", margin: "0 2px" }}>US</span>
    
    {/* Right Slash & Bracket - Purple Gradient */}
    <span
      style={{
        background: "linear-gradient(to right, #c576ea, #a87ffb)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      /&gt;
    </span>
  </div>
);

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) {
            smoother.scrollTo(section, true, "top top");
          }
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  return (
    <>
      <div className="header">
        {/* Logo injected here with text decoration removed to keep the gradients clean */}
        <a 
          href="/#" 
          className="navbar-title" 
          data-cursor="disable"
          style={{ textDecoration: "none" }}
        >
          <BrandLogo />
        </a>
        
        <a
          href="mailto:example@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
         {/* (Your email goes here) */}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;