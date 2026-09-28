# Saad Parkar — JSAT Assignment
### College Placement Management System (Theme: PlacementOrbit)
**Candidate:** Saad Parkar  
**Roll Number:** T.24.79  
**Submission:** Full-Stack Node.js Architecture Assignment  

---

## 📌 Project Overview

**PlacementOrbit** is a server-rendered College Placement Management System built using **pure Node.js** without relying on client-side frontend frameworks (no React, no Next.js, no Vite, no TypeScript). 

To fulfill the assignment requirements, the repository is split into two completely decoupled, standalone implementations running against an identical shared dataset:

1. **Implementation A (`/http-app`)**: Pure Node.js using only the built-in `http` module with zero external dependencies (`npm` packages = 0). It demonstrates low-level manual request parsing, manual static file serving with MIME mapping, dynamic parameter parsing, and native template literal rendering.
2. **Implementation B (`/express-app`)**: Modern Node.js web architecture utilizing **Express.js** and **Handlebars (`hbs`)** with modular views, shared layouts, reusable partials, custom helpers, and dedicated middleware layers.
3. **Master Gateway (`server.js`)**: A unified runner that mounts both sub-applications side-by-side on port `3000` with an interactive technical compliance matrix and route inspector.

---

## 📂 Repository Structure

```text
.
├── http-app/                     # IMPLEMENTATION A: Built-in Node.js "http" only
│   ├── package.json              # Zero dependencies
│   ├── data.js                   # Minimal in-memory data store (Companies, Students, Jobs)
│   ├── server.js                 # Low-level HTTP server & manual router
│   ├── templates.js              # HTML page builders using template literals
│   └── public/
│       ├── css/style.css         # Custom CSS glassmorphism & cosmic telemetry theme
│       └── js/main.js            # Vanilla JS micro-interactions (3D card tilt, filter)
│
├── express-app/                  # IMPLEMENTATION B: Express.js + Handlebars (hbs)
│   ├── package.json              # Express + hbs dependencies
│   ├── data.js                   # Identical shared in-memory data store
│   ├── server.js                 # Express server with routes & custom helpers
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.hbs          # Master HTML layout
│   │   ├── partials/
│   │   │   ├── navbar.hbs        # Pill-shaped floating navbar
│   │   │   ├── footer.hbs        # Live telemetry status footer
│   │   │   ├── company-card.hbs  # Modular company display card
│   │   │   └── student-card.hbs  # Modular student placement card
│   │   ├── home.hbs              # Dashboard overview
│   │   ├── companies.hbs         # Enterprise listing
│   │   ├── company.hbs           # Detailed company view + interview rounds
│   │   ├── students.hbs          # Cadet roster with placement filters
│   │   ├── student.hbs           # Individual student profile dossier
│   │   ├── jobs.hbs              # Company jobs overview & empty radar state
│   │   └── 404.hbs               # Cosmic 404 error page
│   └── public/
│       ├── css/style.css         # Design system stylesheet
│       └── js/main.js            # Micro-interactions script
│
├── server.js                     # Unified Port 3000 Master Gateway
└── package.json                  # Root runner scripts
```

---

## 📊 Shared Dataset Specifications

Both applications consume an identical in-memory JavaScript dataset (`data.js`) without external database bloat:

- **3 Companies**: 
  - `Google DeepMind` (AI / Research)
  - `Microsoft` (Cloud & Enterprise Software)
  - `Tesla` (Autonomous Systems & Robotics — configured with 0 active jobs to showcase the empty radar state)
- **4 Students**:
  - `Aarav Sharma` (Placed @ Google DeepMind, ₹42.5 LPA)
  - `Rhea Sen` (Placed @ Microsoft, ₹34.0 LPA)
  - `Kabir Mehta` (Seeking placement — demonstrates unplaced badge & action CTA)
  - `Ananya Kulkarni` (Seeking placement — demonstrates unplaced badge & action CTA)
- **5 Jobs**:
  - Roles across research, systems engineering, frontend, and cloud infra.
  - Features both **Open** and **Closed** status badges to showcase conditional branches.

---

## 🛠️ Feature Comparison Matrix

| Technical Rubric | Implementation A (`/http-app`) | Implementation B (`/express-app`) |
| :--- | :--- | :--- |
| **Dependencies** | **0 dependencies** (`http`, `fs`, `path`, `url`) | `express`, `hbs` |
| **Routing** | Manual via `req.url`, `req.method`, `new URL()` | Express Router via `app.get()`, `req.params` |
| **Static Files** | Custom `fs.readFile` with file extension MIME table | `express.static("public")` |
| **Templating** | ES6 Template Literals (`templates.js`) | Handlebars templates (`.hbs`) |
| **Modular Views** | Functional component renderers | Master layout (`main.hbs`) + 4 partials |
| **Logic / Conditionals**| Native JS ternary & `if/else` | `{{#if}}`, `{{#else}}`, `{{#unless}}`, `{{#each}}` |
| **Custom Helpers** | Pure utility functions | `formatPackage`, `eq`, `initials` |
| **HTTP Status Handling**| Explicit `200`, `404`, `405` (Method Not Allowed), `500` | 404 middleware + global 500 error handler |
| **REST API** | `GET /api/companies` (`application/json`) | Integrated API response support |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18.0.0 or higher recommended)
- npm

### Installation
Clone the repository and install the dependencies:
```bash
git clone <your-repository-url>
cd placement-orbit
npm install
```

### Running the Apps

#### Option 1: Run the Unified Gateway (Recommended)
Spins up both applications accessible from a single master launchpad:
```bash
npm start
```
- **Unified Gateway:** [http://localhost:3000/](http://localhost:3000/)
- **Implementation A (Native HTTP):** [http://localhost:3000/http-app/](http://localhost:3000/http-app/)
- **Implementation B (Express + HBS):** [http://localhost:3000/express-app/](http://localhost:3000/express-app/)
- **REST API Endpoint:** [http://localhost:3000/api/companies](http://localhost:3000/api/companies)

#### Option 2: Run Implementation A Standalone (Zero Dependencies)
```bash
cd http-app
node server.js
```
*Runs on `http://localhost:3001`*

#### Option 3: Run Implementation B Standalone (Express + Handlebars)
```bash
cd express-app
node server.js
```
*Runs on `http://localhost:3002`*

---

## 🛣️ Verified Route Endpoints

### Implementation A: Pure Node.js `http` Module
- `GET /http-app/` — Home Mission Control dashboard
- `GET /http-app/companies` — Enterprise directory
- `GET /http-app/company/:id` — Company details (e.g. `/http-app/company/google-deepmind`)
- `GET /http-app/students` — Student placement roster
- `GET /http-app/student/:id` — Student dossier (e.g. `/http-app/student/aarav-sharma`)
- `GET /http-app/jobs/:company` — Jobs per company (e.g. `/http-app/jobs/google-deepmind`)
- `GET /http-app/jobs/tesla` — Demonstrates empty state when 0 jobs exist
- `GET /api/companies` — JSON API endpoint (`Content-Type: application/json`)
- `GET /http-app/unknown-route` — Triggers 404 error page
- `POST /http-app/` — Triggers 405 Method Not Allowed

### Implementation B: Express.js + Handlebars (`hbs`)
- `GET /express-app/` — Home Mission Control dashboard
- `GET /express-app/companies` — Enterprise directory (renders `companies.hbs`)
- `GET /express-app/company/:id` — Company details (renders `company.hbs`)
- `GET /express-app/students` — Cadet roster (renders `students.hbs`)
- `GET /express-app/student/:id` — Cadet profile dossier (renders `student.hbs`)
- `GET /express-app/jobs/:company` — Job listings (renders `jobs.hbs`)
- `GET /express-app/jobs/tesla` — Demonstrates `{{#unless jobs.length}}` empty state
- `GET /express-app/non-existent-route` — Triggers 404 error template (`404.hbs`)

---

## 🎨 Design System: "Mission Control for Careers"

- **Color Palette:**
  - Background: `#070B1A` with animated gradient mesh & subtle radial telemetry
  - Primary Accents: Violet `#7C3AED` to Cyan `#22D3EE`
  - Call-To-Action: Hot Pink `#F43F5E`
  - Status Indicators: Neon Green `#10B981` (Placed/Open), Amber `#F59E0B` (In-Process), Red `#EF4444` (Not Placed/Closed)
- **Typography:** Space Grotesk (Headings), Inter (UI Body), JetBrains Mono (CGPA, Packages, Trajectory IDs)
- **Micro-Interactions:** Pure vanilla JS for subtle 3D card tilt on mouse move, live client-side search filtering, and count-up telemetry metrics.

---

## 👨‍💻 Author

**Saad Parkar**  
Roll Number: **T.24.79**  
*All Rights Reserved Saad Parkar T.24.79*
