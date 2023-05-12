import React, { useEffect, useRef, useState, useCallback } from 'react';
import './CSS/App.css';
import './CSS/buttons.css';
import './CSS/circle.css';
import './CSS/font.css';
import './CSS/pills.css';
import './CSS/var.css';
import ListItem from './Components/ListItem.js';
import Education from './Components/Education.js';
import Technologies from './Components/Technologies.js';
import Skills from './Components/Skills.js';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [showPfp, setShowPfp] = useState(false);
  const [showbox0, setShowbox0] = useState(false);
  const [showbox1, setShowbox1] = useState(false);
  const [showbox2, setShowbox2] = useState(false);
  const [showbox3, setShowbox3] = useState(false);
  const screen2Ref = useRef();
  const aboutRef = useRef();
  const aboutRef2 = useRef();
  const [stoppedOffsetRed, setStoppedOffsetRed] = useState(0);
  const [stoppedOffsetWhite2, setStoppedOffsetWhite2] = useState(0);
  const [stoppedOffsetWhite, setStoppedOffsetWhite] = useState(0);
  const [stoppedOffsetBlue, setStoppedOffsetBlue] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = ['Education', 'Technologies', 'Skills & Hobbies'];
  const fontColors = ['#4C4F6C', '#ED5151', '#FFFFFF'];
  
  //test
  //cursor animations
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    circles.forEach(function (circle, index) {
      circle.x = 0;
      circle.y = 0;
    });

    window.addEventListener("mousemove", function(e){
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;
      
      circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        
        circle.style.scale = (circles.length - index) / circles.length;
        
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.2; /* Increase the spread by adjusting the factor, e.g., 0.6 */
        y += (nextCircle.y - y) * 0.2; /* Increase the spread by adjusting the factor, e.g., 0.6 */
      });
    
      requestAnimationFrame(animateCircles);
    }
    animateCircles();

    return () => {
      window.removeEventListener("mousemove", animateCircles);
    };
  }, []);
  
  //pill animations
  const handlePillScroll = useCallback(
    (pillClass, maxScroll, minScroll, speedFactor, offsetAdjustment, stoppedOffset, setStoppedOffset) => {
      const pillPath = document.querySelector(pillClass);
      const scrollPosition = window.scrollY;

      let dashOffset = -((scrollPosition - minScroll - offsetAdjustment) / speedFactor);

      if (dashOffset < -maxScroll) {
        dashOffset = -maxScroll;
        setStoppedOffset(dashOffset);
      } else if (dashOffset > -minScroll) {
        dashOffset = -minScroll;
      }

      pillPath.setAttribute('stroke-dashoffset', dashOffset);
    },
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      handlePillScroll('.pillRed', 4200, 0, 0.4, 0, stoppedOffsetRed, setStoppedOffsetRed);
      handlePillScroll('.pillWhite', 2200, 0, 2, 0, stoppedOffsetWhite, setStoppedOffsetWhite);
      handlePillScroll('.pillWhite2', 8000, 0, 0.5, 600, stoppedOffsetWhite2, setStoppedOffsetWhite2);
      handlePillScroll('.pillBlue', 5000, 0, 1, 100, stoppedOffsetBlue, setStoppedOffsetBlue);
    };

    window.addEventListener('scroll', () => {
      handleScroll();
    });
    return () => {
      window.removeEventListener('scroll', () => {
        handleScroll();
      });
    };
  }, [handlePillScroll, stoppedOffsetRed, stoppedOffsetWhite2, stoppedOffsetWhite, stoppedOffsetBlue]);

  //show / hide boundaries
  useEffect(() => {
    const handleScroll = () => {
      // paragraph scroll boundaries
      const scrollBoundary1 = 800;
      const scrollBoundary2 = 1600;
      // pfp scroll boundaries
      const scrollBoundary3 = 800;
      const scrollBoundary4 = 1600;
      //about me scroll boundaries
      const scrollBoundary5 = 1800;
      const offset = 150;
  
      // Add logic to handle showParagraph state
      if (
        window.scrollY > scrollBoundary1 &&
        window.scrollY <= scrollBoundary2 &&
        !showParagraph
      ) {
        setShowParagraph(true);
      } else if (
        (window.scrollY <= scrollBoundary1 || window.scrollY > scrollBoundary2) &&
        showParagraph
      ) {
        setShowParagraph(false);
      }
  
      // Add logic to handle showPfp state
      if (
        window.scrollY > scrollBoundary3 &&
        window.scrollY <= scrollBoundary4 &&
        !showPfp
      ) {
        setShowPfp(true);
      } else if (
        (window.scrollY <= scrollBoundary3 || window.scrollY > scrollBoundary4) &&
        showPfp
      ) {
        setShowPfp(false);
      }

      // Add logic to handle showbox state
      if (
        window.scrollY > scrollBoundary5 &&
        !showbox0
      ) {
        setShowbox0(true);
      }

      if (
        window.scrollY > scrollBoundary5 + 25 &&
        !showbox1
      ) {
        setShowbox1(true);
      } 

      if (
        window.scrollY > scrollBoundary5+offset-25 &&
        !showbox2
      ) {
        setShowbox2(true);
      } 

      if (
        window.scrollY > scrollBoundary5 +offset&&
        !showbox3
      ) {
        setShowbox3(true);
      } 
    };
  
    // Add event listener
    window.addEventListener('scroll', handleScroll);
  
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showParagraph, showPfp, showbox0, showbox1, showbox2, showbox3]);  

  //About me animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = 800; // Set the desired scroll offset
      const scrollPosition = window.scrollY;
  
      if (scrollPosition > scrollOffset) {
        const scrollFactor = 0.9; // Adjust this value to control the horizontal scroll speed
        aboutRef.current.style.transform = `translateX(-${(scrollPosition - scrollOffset) * scrollFactor}px)`;
        aboutRef2.current.style.transform = `translateX(${(scrollPosition - scrollOffset) * scrollFactor}px)`;
      } else {
        aboutRef.current.style.transform = 'translateX(0)';
        aboutRef2.current.style.transform = 'translateX(0)';
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App" style={{cursor : "none"}}>
      {
        Array(200)
          .fill()
          .map((_, index) => <div key={index} className="circle"></div>)
      }
      {/* main pill elements */}
      <svg class="pillRed" width="3198" height="2957" viewBox="0 0 3198 2957" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1274 250V355V460V565V670C1274 994.5 1215 1234 956 1358.5C697 1483 250 1559.5 250 1987.5C250 1987.5 250 2200 250 2329C250 2548.5 419 2678.5 547 2700C869.319 2754.14 1008.94 2424.5 1054.34 2312.5C1327.34 1639 1477.34 2031.5 2947.84 2031.5" stroke="#ED5151" stroke-width="500" stroke-linecap="round"/>
      </svg>
      <svg class='pillWhite' width="1241" height="240" viewBox="0 0 1241 440" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M114 239.853V240H119.992C119.995 240 119.997 240 120 240C120.003 240 120.005 240 120.008 240L1120.89 240C1120.93 240 1120.96 240 1121 240C1187.27 240 1241 186.274 1241 120C1241 53.7258 1187.27 7.11649e-06 1121 0L120.093 4.54994e-05C120.062 2.18421e-05 120.031 1.00121e-05 120 1.00134e-05C119.969 1.00148e-05 119.938 2.18477e-05 119.907 4.55079e-05L114 4.57764e-05V0.147401C50.5133 3.27359 -2.80899e-06 55.7378 0 120C2.80899e-06 184.262 50.5133 236.726 114 239.853Z" stroke="#E7E7E7" stroke-width="200" stroke-linecap="round" />
      </svg>
      <svg class="pillWhite2" width="3298" height="100" viewBox="0 0 3298 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 50L3248 50.0003" stroke="white" stroke-width="100" stroke-linecap="round"/>
      </svg>
      <svg class="pillBlue" width="1545" height="1297" viewBox="0 0 1545 1297" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200.997 200V626.5C200.997 743.5 268.999 1096.5 737.5 1096.5H1345" stroke="#4C4F6C" stroke-width="400" stroke-linecap="round"/>
      </svg>

      <header className="header">
        <p className="name">jonathan</p>
        <div className="button-group">
          <button className="rounded-button">portfolio</button>
          <button className="rounded-button">resume</button>
        </div>
        <div className="circ c1"></div>
        <div className="circ c2"></div>
        <div className="circ c3"></div>
        <div className="circ c4"></div>
        <div className="circ c5"></div>
        <div className="circ c6"></div>
      </header>
      <div className="screen2">
        {/* Circle elements */}
        <div className="circ c7"></div>
        <div className="circ c8"></div>
        <div className="screen2" ref={screen2Ref}>
          <p className={showParagraph ? 'visible' : 'hidden2'}>
            &emsp;&emsp;&emsp;My name’s Jonathan Cheng and I’m a creative and
            innovative thinker with a love for coding and digital design. I’m
            currently pursuing a degree in software engineering at the
            University of Waterloo with hopes to specialize in data sciences.
          </p>
          <div class={`pfp-container ${showPfp ? 'visible' : 'hidden'}`}>
            <img class="pfp" src={require("./assets/pfp.png")} alt="pfp"/>
          </div>
        </div>
      </div>
      <div className="aboutme">
        <p class="about a">about</p>
        <p class="about m">me</p>
        <ListItem
          items={items}
          fontColors={fontColors}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      <div className={`content ${activeIndex === 0 ? 'show' : ''}`}>
        <Education />
      </div>
      <div className={`content ${activeIndex === 1 ? 'show' : ''}`}>
        <Technologies />
      </div>
      <div className={`content ${activeIndex === 2 ? 'show' : ''}`}>
        <Skills />
      </div>
      </div>
      <div className="portfolio">
      <svg className={`sq1 ${showbox1 ? 'visible' : 'hidden'}`} width="128" height="126" viewBox="0 0 128 126" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="126" rx="35" fill="#4C4F6C"/>
      </svg>
      <svg className={`sq2 ${showbox2 ? 'visible' : 'hidden'}`} width="128" height="126" viewBox="0 0 128 126" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="126" rx="35" fill="#ED5151"/>
      </svg>
      <svg className={`sq3 ${showbox3 ? 'visible' : 'hidden'}`} width="128" height="126" viewBox="0 0 128 126" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="126" rx="35" fill="#B7B0A4"/>
      </svg>
        <p ref={aboutRef} className="my-work">MY WORK MY WORK MY WORK MY WORK MY WORK MY WORK MY WORK MY WORK MY WORK MY WORK MY WORK MY WORK</p>
        <div className={`project1 ${showbox1 ? 'visible' : 'hidden'}`}>
          <p className="topic">Education</p>
          <p className="ans">University <br></br>of Waterloo</p>
        </div>
        <div className={`tool ${showbox2 ? 'visible' : 'hidden'}`}>
          <p className="topic">Skills</p>
          <p className="ans">Technologies</p>
        </div>
        <div className={`more ${showbox3 ? 'visible' : 'hidden'}`}>
          <p className="topic">More</p>
          <p className="ans">Skills & <br></br>Hobbies</p>
        </div>
        <img class={`loo ${showbox0 ? 'visible' : 'hidden'}`} src={require("./assets/waterloo.jpeg")} alt="loo"/>
      </div>
      <div className="screen5"></div>
    </div>
  );
}

export default App;
