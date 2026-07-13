import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

interface NavbarProps {
  onReady?: () => void;
}

const Navbar = ({ onReady }: NavbarProps) => {
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

    if (onReady) onReady();

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
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
        <a href="/#" className="navbar-title" data-cursor="disable" style={{ display: "flex", alignItems: "center" }}>
          <svg width="65" height="30" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="10" width="12" height="60" fill="#A0A2A6" />
            <rect x="32" y="10" width="12" height="60" fill="#8A8D91" />
            <rect x="52" y="10" width="12" height="60" fill="#72767A" />
            <path d="M72 10H108V70H96V22H84V70H72Z" fill="#55585B" />
            <path d="M108 10H118C134.5 10 148 23.5 148 40C148 56.5 134.5 70 118 70H108V58H118C127.9 58 136 49.9 136 40C136 30.1 127.9 22 118 22H108Z" fill="#319795" />
          </svg>
        </a>
        <a
          href="mailto:praddume22358@iiitd.ac.in"
          className="navbar-connect"
          data-cursor="disable"
        >
          praddume22358@iiitd.ac.in
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
