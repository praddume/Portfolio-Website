import React, { useRef, useState } from "react";

interface TechCardProps {
  name: string;
  icon: string;
  category: string;
  glowRgb: string;
}

const TechCard = ({ name, icon, category, glowRgb }: TechCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) scale(1)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    // Update mouse position CSS variables for the radial glow
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Calculate rotation angles based on cursor position relative to card center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 8; // Adjust divisor for more/less tilt
    const rotateY = (x - centerX) / 8;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div className="tech-card-wrapper">
      <div
        ref={cardRef}
        className="tech-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transform,
          // @ts-ignore
          "--glow-rgb": glowRgb,
        }}
      >
        <div className="tech-card-glow" />
        <div className="tech-card-icon">
          <img src={icon} alt={`${name} logo`} loading="lazy" />
        </div>
        <h3 className="tech-card-name">{name}</h3>
        <span className="tech-card-badge">{category}</span>
      </div>
    </div>
  );
};

const technologies = [
  { name: "Python", icon: "/images/python.svg", category: "Language / AI", glowRgb: "55, 118, 171" },
  { name: "C++", icon: "/images/cplusplus.svg", category: "Language", glowRgb: "0, 89, 156" },
  { name: "Java", icon: "/images/java.svg", category: "Language", glowRgb: "228, 45, 37" },
  { name: "PyTorch", icon: "/images/pytorch.svg", category: "AI & ML", glowRgb: "238, 76, 44" },
  { name: "Pandas", icon: "/images/pandas.svg", category: "Data Science", glowRgb: "17, 141, 87" },
  { name: "MySQL", icon: "/images/mysql.svg", category: "Database", glowRgb: "0, 117, 143" },
  { name: "PostgreSQL", icon: "/images/postgresql.svg", category: "Database", glowRgb: "51, 103, 145" },
  { name: "Redis", icon: "/images/redis.svg", category: "Database", glowRgb: "216, 44, 40" },
  { name: "Git", icon: "/images/git.svg", category: "Tools", glowRgb: "240, 79, 53" },
  { name: "VS Code", icon: "/images/vscode.svg", category: "Tools", glowRgb: "0, 122, 204" },
  { name: "Figma", icon: "/images/figma.svg", category: "Design", glowRgb: "242, 78, 30" }
];

const TechStack = () => {
  return (
    <div className="techstack">
      <h2>My Techstack</h2>
      <div className="tech-grid">
        {technologies.map((tech, i) => (
          <TechCard key={i} {...tech} />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
