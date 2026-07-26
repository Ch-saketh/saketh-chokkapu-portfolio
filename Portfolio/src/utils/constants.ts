import React from "react";

export type SocialLink = {
  href: string;
  icon: React.ReactNode;
};

export type SignInUser = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type timeLineItem = {
  icon: string;
  title: string;
  description: string;
  year: string;
  color: string;
};

export type projectItem = {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string[];
  status: "completed" | "in-progress" | "Hackathon-Winner";
  projectType: "personal" | "client";
};

export interface GameItem {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  status: "completed" | "in-progress" | "Hackathon-Winner";
}


export type serviceItem = {
  icon: string;
  title: string;
  description: string;
};

export type contactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
};

export const handleMailClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  email = "chokkapusaketh@gmail.com"
) => {
  e.preventDefault();

  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    window.location.href = `mailto:${email}`;
  } else {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
};
