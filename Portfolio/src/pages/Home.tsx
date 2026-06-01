import React from "react";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Skills from "../components/Home/Skills";
import Projects from "../components/Home/Projects";
import Services from "../components/Home/Services";
import Contact from "../components/Home/Contact";
import { projectItem } from "../utils/constants";
import DeveloperTools from "../components/Home/DeveloperTools";

const projects: projectItem[] = [
  {
    title: "Loan-Application Platform",
    description:
      "A fully functional loan management application built for VASU clients and local dealers, featuring seamless frontend and backend integration, efficient data handling, and a smooth user experience tailored for real-world usage.",
    tech: ["MERN", "TypeScript", "Redux", "Stripe"],
    link: "https://loanapp-nu.vercel.app",
    image: [
      "/assets/Loan-Application /LA-1.jpg",
      "/assets/Loan-Application /LA-2.jpg",
      "/assets/Loan-Application /LA-3.png",
      "/assets/Loan-Application /LA-4.png",
    ],
    status: "completed",
    projectType: "personal",
  },
  {
    title: "Quantum-Secure E-Auction System",
    description:
      "Traditional e-auction systems rely on classical encryption, making them vulnerable to interception and tampering. This project introduces a quantum-secure solution that ensures confidential, transparent, and tamper-proof bidding.",
    tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    link: "https://github.com/vijayagiduthuri/QKD",
    image: [
      "/assets/Quantum-Secure/QS-1.png",
      "/assets/Quantum-Secure/QS-2.png",
      "/assets/Quantum-Secure/QS-3.png",
      "/assets/Quantum-Secure/QS-4.png",
    ],
    status: "Hackathon-Winner",
    projectType: "personal",
  },
  
  {
    title: "PageMatch-Hybrid Rec Engine",
    description:
      "A full-stack application that matches and compares content across pages, designed to identify similarities efficiently. Built with a focus on optimized backend processing and a smooth, responsive user experience.",
    tech: ["React", "Express", "MongoDB", "Neo4J"],
    link: "https://github.com/Ch-saketh/pagematch2",
    image: [
      "/assets/PageMatch /Pg-1.png",
      "/assets/PageMatch /Pg-2.png",
      "/assets/PageMatch /Pg-3.png",
      "/assets/PageMatch /Pg-4.png",
    ],
    status: "completed",
    projectType: "client",
  },
];

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Projects projects={projects} />
      <DeveloperTools />
      <Skills />
      <About />
      <Services />
      <Contact />
    </div>
  );
};

export default Home;
