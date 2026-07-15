import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>SOFTWARE ENGINEERING</h3>
              <h4>Description</h4>
              <p>
                Building robust, scalable, and optimized software architectures. Experienced in database optimization, query tuning, and system management to reduce latency and load times.
              </p>
              <h5>Areas of Focus</h5>
              <div className="what-content-flex" style={{ marginBottom: "15px" }}>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>Data Structures & Algorithms</div>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>Database Management</div>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>Query Optimization</div>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>System Management</div>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>Project Management</div>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>Leadership</div>
              </div>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">C++</div>
                <div className="what-tags">Java</div>
                <div className="what-tags">C</div>
                <div className="what-tags">SQL</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">Redis</div>
                <div className="what-tags">Git</div>
                <div className="what-tags">GitHub</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AI & MACHINE LEARNING</h3>
              <h4>Description</h4>
              <p>
                Developing and deploying practical machine learning, deep learning, and NLP models. Experienced in building AI assistants, OCR platforms, and automated workflow pipelines.
              </p>
              <h5>Areas of Focus</h5>
              <div className="what-content-flex" style={{ marginBottom: "15px" }}>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>Artificial Intelligence</div>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>Machine Learning</div>
                <div className="what-tags" style={{ backgroundColor: "rgba(56, 178, 172, 0.08)", borderColor: "rgba(56, 178, 172, 0.15)", color: "#38b2ac" }}>Natural Language Processing</div>
              </div>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">PyTorch</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">NLP</div>
                <div className="what-tags">Pandas</div>
                <div className="what-tags">NumPy</div>
                <div className="what-tags">Hugging Face</div>
                <div className="what-tags">Cohere API</div>
                <div className="what-tags">OCR</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
