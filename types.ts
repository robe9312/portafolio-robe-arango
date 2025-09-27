// Import React to use React.ReactNode type.
import React from 'react';

export interface Artwork {
  id: number;
  title: string;
  year: number;
  medium: string;
  imageUrl: string;
  dimensions: string;
  description: string;
}

export interface VideoWork {
  id: number;
  title: string;
  year: number;
  duration: string;
  description: string;
  embedUrl: string;
}

export interface TeachingInfo {
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  year: string;
  icon: React.ReactNode;
}

export interface ProfessionalExperience {
  title: string;
  period: string;
  description: string;
}

export interface Skill {
  category: string;
  icon: React.ReactNode;
  items: string[];
}