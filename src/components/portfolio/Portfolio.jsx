import React, { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { transition } from "three/examples/jsm/tsl/display/TransitionNode.js";

const items = [
  {
    id: 1,
    img: "/Project 1.png",
    title: "Nike Website ",
    desc: "I have created this beautiful shoes, responsive website using React.js. Please check out by clicking the button below.",
    link: "https://hanzala-nike-website.netlify.app/",
  },
  {
    id: 2,
    img: "/Project 2.png",
    title: "Movie Website",
    desc: "I crafted a visually, responsive movie website using React and Redux to showcase for better user experience.",
    link: "https://movio-app.vercel.app/",
  },
  {
    id: 3,
    img: "/Project 3.png",
    title: "Web Flow Website",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laboriosam tempore consectetur, atque maiores culpa quia, repellat id, dicta esse fugit neque voluptatem provident itaque voluptates minima. Repudiandae, provident hic.",
    link: "https://webflow-website.netlify.app/",
  },
  {
    id: 4,
    img: "/Project 4.png",
    title: "Car Rental Website",
    desc: "I have created this beautiful shoes, responsive website using React.js. Please check out by clicking the button below.",
    link: "https://hanzala-car-website.netlify.app/",
  },
  {
    id: 5,
    img: "/Project 5.png",
    title: "Matrimonial Site",
    desc: "I have created this beautiful , responsive website using React.js and firebase.",
    link: "https://hanzala-matrimonials.netlify.app/",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link} target="_blank">
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const portfolioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const calculateDistance = () => {
      if (portfolioRef.current) {
        const rect = portfolioRef.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();
    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (portfolioRef.current && progressRef.current) {
        const portfolioRect = portfolioRef.current.getBoundingClientRect();
        const portfolioTop = portfolioRect.top + window.scrollY;
        const portfolioBottom =
          portfolioTop + portfolioRect.height - window.innerHeight;

        // Only show progress when within portfolio section
        if (
          window.scrollY >= portfolioTop &&
          window.scrollY <= portfolioBottom
        ) {
          progressRef.current.style.display = "block";
        } else {
          progressRef.current.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ["start start", "end end"],
  });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={portfolioRef}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />

      <div className="pProgress" ref={progressRef}>
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;