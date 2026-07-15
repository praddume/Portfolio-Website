import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CSAI</h4>
                <h5>IIIT Delhi</h5>
              </div>
              <h3>2026</h3>
            </div>
            <div className="career-details">
              <p>
                Focused on learning core computer science, advanced data structures, database management systems, algorithms, statistics, convex optimization, and natural language processing.
              </p>
              <div className="career-electives-title">Technical Electives</div>
              <div className="career-electives-list">
                <span className="career-elective-badge">Artificial Intelligence</span>
                <span className="career-elective-badge">Convex Optimization</span>
                <span className="career-elective-badge">Statistics in ML</span>
                <span className="career-elective-badge">Machine Learning</span>
                <span className="career-elective-badge">Natural Language Processing</span>
                <span className="career-elective-badge">Database Management Systems</span>
                <span className="career-elective-badge">Analysis & Design of Algorithms</span>
                <span className="career-elective-badge">Computer Networks</span>
              </div>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Website Analytics Intern</h4>
                <h5>Little Lamps</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Managed website analytics and digital metrics. Extracted and utilized data-driven user behavior insights to improve overall site engagement by 25% and increase traffic.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Operations Intern</h4>
                <h5>Delhi Capitals Crew (IPL)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Monitored real-time operational metrics for over 40,000+ attendees. Developed data-driven optimizations for match-day logistics that successfully reduced entry bottlenecks by 20%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
