import "./styles/Career.css";

// Importing directly from the new src/assets folder
import cert1 from "../assets/cert1.png";
import cert2 from "../assets/cert2.png";
import cert3 from "../assets/cert3.png";
import cert4 from "../assets/cert4.png";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>Certifications</span>
        </h2>
        
        <div className="certificates-grid">
          {/* Certificate 1 */}
          <div className="cert-card">
            <img src={cert1} alt="Project Management Assessment" className="cert-image" />
            <div className="cert-details">
              <h4>Project Management Assessment</h4>
              <h5>LearnTube.ai</h5>
            </div>
          </div>

          {/* Certificate 2 */}
          <div className="cert-card">
            <img src={cert2} alt="Technical Participation - COD-A-FESTX 3.0" className="cert-image" />
            <div className="cert-details">
              <h4>COD-A-FESTX 3.0 Hackathon</h4>
              <h5>LYNQUP & LPU</h5>
            </div>
          </div>

          {/* Certificate 3 */}
          <div className="cert-card">
            <img src={cert3} alt="Introduction to Artificial Intelligence" className="cert-image" />
            <div className="cert-details">
              <h4>Introduction to Artificial Intelligence</h4>
              <h5>Infosys Springboard</h5>
            </div>
          </div>

          {/* Certificate 4 */}
          <div className="cert-card">
            <img src={cert4} alt="2nd Position - Cod-A-FestX 3.0" className="cert-image" />
            <div className="cert-details">
              <h4>2nd Position: Cod-A-FestX 3.0</h4>
              <h5>InnovXus & LPU (My First Hackathon Win!)</h5>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Career;