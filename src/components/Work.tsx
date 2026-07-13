import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    num: "01",
    name: "SecurePost",
    category: "Startup / IoT Automation",
    tech: "Hardware, Smart Printing, Automation",
    desc: "Co-founded a startup building a Smart Printer System that fully automates printing, folding, and envelope stuffing for business mail, such as invoices and letters.",
  },
  {
    num: "02",
    name: "Sahayak AI",
    category: "AI Platform",
    tech: "Cohere API, Voice Chatbot, Tesseract OCR, NLP",
    desc: "Developed an AI-driven administrative platform featuring a Cohere-powered voice chatbot, OCR-based multilingual summarization, and automated scheduling to streamline bureaucratic workflows.",
  },
  {
    num: "03",
    name: "Gender Abuse Detection",
    category: "Deep Learning / NLP",
    tech: "Python, PyTorch, Deep Learning, Multilingual Classification",
    desc: "Developed a multilingual deep learning model to classify gender-based abuse in English, Hindi, and Tamil social media posts across multiple abuse categories.",
  },
  {
    num: "04",
    name: "Cancer Detection",
    category: "Machine Learning / BioTech",
    tech: "Python, Scikit-learn, Feature Selection, Data Preprocessing",
    desc: "Trained a machine learning model for early cancer detection, achieving a 20% performance improvement via advanced preprocessing and feature selection.",
  },
  {
    num: "05",
    name: "Blinkit Clone",
    category: "Database System",
    tech: "MySQL, PostgreSQL, Redis, Backend Tuning",
    desc: "Integrated a responsive frontend with an optimized database backend for 200+ products, decreasing query latency by 40% and site load time by 50%.",
  },
];

const Work = () => {
  useGSAP(() => {
    function getTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return 0;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      return rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: true,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    // Clean up
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
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tech}</p>
                <p style={{ marginTop: "15px", fontSize: "14px", color: "#9a9a9a", fontWeight: "300", lineHeight: "1.4", textTransform: "none" }}>
                  {project.desc}
                </p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
