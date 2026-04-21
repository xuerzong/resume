import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

type ResumeSource = {
  base?: {
    name?: string;
    email?: string;
    phone?: string;
    github?: string;
    website?: string;
  };
  introduction?: {
    summary?: string;
    highlights?: string[];
  };
  "education-experience"?: Array<{
    name: string;
    school: string;
    major: string;
    other?: string;
    "start-time": string;
    "end-time"?: string;
  }>;
  "work-experience"?: Array<{
    "company-name": string;
    "start-time": string;
    "end-time"?: string;
    club?: string;
    position?: string;
    location?: string;
    summary?: string;
    projects?: Array<{
      name: string;
      link?: string;
      highlights?: string[];
    }>;
  }>;
  "project-experiences"?: Array<{
    name: string;
    link?: string;
    description?: string;
    highlights?: string[];
  }>;
  "professional-skills"?: string[];
};

type ResumeBase = {
  birth?: string;
  name?: string;
  email?: string;
  phone?: string;
  github?: string;
  website?: string;
};

type ResumeIntroduction = {
  summary: string;
  highlights: string[];
};

type EducationExperience = {
  name: string;
  school: string;
  major: string;
  other?: string;
  "start-time": string;
  "end-time"?: string;
};

type WorkProject = {
  name: string;
  link?: string;
  highlights?: string[];
};

type WorkExperience = {
  "company-name": string;
  "start-time": string;
  "end-time"?: string;
  club?: string;
  position?: string;
  location?: string;
  summary?: string;
  projects?: WorkProject[];
};

type ProjectExperience = {
  name: string;
  link?: string;
  description?: string;
  highlights?: string[];
};

export type ResumeData = {
  base: ResumeBase;
  introduction: ResumeIntroduction;
  educationExperience: EducationExperience[];
  workExperience: WorkExperience[];
  projectExperiences: ProjectExperience[];
  professionalSkills: string[];
};

export const loadResumeData = (): ResumeData => {
  const configPath = path.resolve(process.cwd(), "config.yaml");
  const source = yaml.load(
    fs.readFileSync(configPath, "utf-8"),
  ) as ResumeSource;

  return {
    base: source.base ?? {},
    introduction: {
      summary: source.introduction?.summary ?? "",
      highlights: source.introduction?.highlights ?? [],
    },
    educationExperience: source["education-experience"] ?? [],
    workExperience: source["work-experience"] ?? [],
    projectExperiences: source["project-experiences"] ?? [],
    professionalSkills: source["professional-skills"] ?? [],
  };
};
