// PlacementOrbit - Minimal Shared In-Memory Data Store
// Exactly 3 companies, 4 students, 5 jobs (Identical in both apps)

const companies = [
  {
    id: "google-deepmind",
    name: "Google DeepMind",
    industry: "Artificial Intelligence & Distributed Systems",
    location: "Mountain View, CA & Bengaluru",
    about: "Pioneering frontier artificial general intelligence and large-scale autonomous neural compute clusters serving planetary computing grids.",
    website: "https://deepmind.google",
    rounds: [
      "Algorithmic Telemetry & Coding Assessment",
      "Distributed Systems & Concurrency Deep Dive",
      "Planetary Scale Architecture",
      "Mission Fit, Safety & Ethics"
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    industry: "Cloud Infrastructure & Cybersecurity",
    location: "Redmond, WA & Hyderabad",
    about: "Architecting zero-trust cyber defense systems and resilient planetary cloud computation across the hyper-scale Azure infrastructure fabric.",
    website: "https://microsoft.com",
    rounds: [
      "Online Screening Vector",
      "System Architecture & Scaling",
      "Cloud Security Probe",
      "Executive Flight Interview"
    ]
  },
  {
    id: "tesla",
    name: "Tesla",
    industry: "Autonomous Robotics & Embedded Autonomy",
    location: "Palo Alto, CA & Austin, TX",
    about: "Developing real-time vision foundation models, custom FSD silicon architectures, and humanoid robotic actuators for planetary transition.",
    website: "https://tesla.com",
    rounds: [
      "Low-Level Systems Vector",
      "Real-Time Embedded Optimization",
      "Hardware-Software Co-Design",
      "Autonomous Mission Culture"
    ]
  }
];

const students = [
  {
    id: "aarav-sharma",
    name: "Aarav Sharma",
    branch: "Computer Science & Engineering",
    cgpa: 9.84,
    skills: ["Distributed Systems", "CUDA", "PyTorch", "Rust"],
    placed: true,
    placedCompanyId: "google-deepmind",
    package: 58.5
  },
  {
    id: "rhea-sen",
    name: "Rhea Sen",
    branch: "Electronics & Communication",
    cgpa: 9.71,
    skills: ["C++20", "Kernel Optimization", "FPGA", "Hardware Systems"],
    placed: true,
    placedCompanyId: "microsoft",
    package: 44.0
  },
  {
    id: "dev-patel",
    name: "Dev Patel",
    branch: "Information Technology",
    cgpa: 8.45,
    skills: ["Go", "Kubernetes", "AWS", "Terraform"],
    placed: false,
    placedCompanyId: null,
    package: 0
  },
  {
    id: "ananya-kulkarni",
    name: "Ananya Kulkarni",
    branch: "Artificial Intelligence & Data Science",
    cgpa: 8.12,
    skills: ["Python", "TensorRT", "Computer Vision", "Docker"],
    placed: false,
    placedCompanyId: null,
    package: 0
  }
];

const jobs = [
  {
    id: "job-1",
    companyId: "google-deepmind",
    role: "AI Acceleration & Distributed Systems Engineer",
    package: 58.5,
    type: "Full-Time",
    minCgpa: 8.5,
    status: "Open",
    deadline: "2026-10-15"
  },
  {
    id: "job-2",
    companyId: "google-deepmind",
    role: "Quantum Algorithms Research Fellow",
    package: 52.0,
    type: "Internship",
    minCgpa: 9.0,
    status: "Open",
    deadline: "2026-10-20"
  },
  {
    id: "job-3",
    companyId: "google-deepmind",
    role: "Security Architecture Specialist",
    package: 38.0,
    type: "Full-Time",
    minCgpa: 7.8,
    status: "Closed",
    deadline: "2026-09-15"
  },
  {
    id: "job-4",
    companyId: "microsoft",
    role: "Cloud Infrastructure Architect",
    package: 44.0,
    type: "Full-Time",
    minCgpa: 8.0,
    status: "Open",
    deadline: "2026-10-30"
  },
  {
    id: "job-5",
    companyId: "microsoft",
    role: "Cybersecurity Threat Hunter",
    package: 36.0,
    type: "Full-Time",
    minCgpa: 7.5,
    status: "Closed",
    deadline: "2026-09-01"
  }
];

module.exports = { companies, students, jobs };
