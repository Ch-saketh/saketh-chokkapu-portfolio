import React from "react";

export const GMAIL_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=chokkapusaketh@gmail.com";

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
  e?: React.MouseEvent<HTMLAnchorElement>,
  email = "chokkapusaketh@gmail.com"
) => {
  if (e) e.preventDefault();
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
    "_blank",
    "noopener,noreferrer"
  );
};
