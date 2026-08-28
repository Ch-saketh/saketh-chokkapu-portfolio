import React from "react";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Experience from "../components/Home/Experience";
import Skills from "../components/Home/Skills";
import Projects from "../components/Home/Projects";
import Services from "../components/Home/Services";
import Contact from "../components/Home/Contact";
import MLModels from "../components/Home/MLModels";

import LightHero from "../components/Light/LightHero";
import LightAbout from "../components/Light/LightAbout";
import LightExperience from "../components/Light/LightExperience";
import LightServices from "../components/Light/LightServices";
import LightProjects from "../components/Light/LightProjects";
import LightSkills from "../components/Light/LightSkills";
import LightContact from "../components/Light/LightContact";
import LightMLModels from "../components/Light/LightMLModels";

import { projectItem } from "../utils/constants";
import { useTheme } from "../context/ThemeContext";

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
    title: "Weavly",
    description:
      "A next-generation e-commerce ecosystem that replaces traditional keyword search with semantic, AI-driven product discovery. Weavly utilizes advanced vector embedding models to interpret natural language intent, ensuring users find highly relevant products with low latency.",
    tech: ["React.js", "Spring Boot", "PostgreSQL", "Spring Security", "WebFlux", "Hugging Face API"],
    link: "https://www.weavly.store/",
    image: [
      "/assets/Luxzera/LX-1.png",
      "/assets/Luxzera/LX-2.png",
      "/assets/Luxzera/LX-3.png",
      "/assets/Luxzera/LX-4.png",
    ],
    status: "completed",
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
  const { theme } = useTheme();

  if (theme === "light") {
    return (
      <div>
        <LightHero />
        <LightProjects projects={projects} />
        <LightMLModels />
        <LightExperience />
        <LightSkills />
        <LightAbout />
        <LightServices />
        <LightContact />
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <Projects projects={projects} />
      <MLModels />
      <Experience />
      <Skills />
      <About />
      <Services />
      <Contact />
    </div>
  );
};

export default Home;
