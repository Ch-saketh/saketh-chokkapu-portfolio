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
