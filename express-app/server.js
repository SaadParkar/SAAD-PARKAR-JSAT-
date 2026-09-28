/**
 * ============================================================================
 * PlacementOrbit — Implementation B: Express.js + Handlebars (hbs) Engine
 * ============================================================================
 * CRITICAL ASSIGNMENT SPECIFICATIONS:
 * 1. Express routing with express.static("public").
 * 2. Static routes: /, /companies, /students.
 * 3. Dynamic routes using req.params:
 *    - /company/:id
 *    - /student/:id
 *    - /jobs/:company
 * 4. Data passed from server to templates via res.render().
 * 5. Views: layouts/main.hbs, home, companies, company, students, student, jobs, 404.
 * 6. Partials: navbar, footer, company-card, student-card.
 * 7. Use {{#each}} for every list, {{#if}}/{{else}} for Placed/Not Placed,
 *    Open/Closed and empty states, and {{#unless}} at least once.
 * 8. At least 2 custom helpers registered: formatPackage, eq, initials.
 * 9. 404 middleware with res.status(404).render("404").
 * 10. 500 error-handling middleware.
 * ============================================================================
 */

const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Import minimal shared in-memory dataset
const { companies, students, jobs } = require('./data');

const app = express();
const PORT = process.env.PORT || 3002;

// ----------------------------------------------------------------------------
// VIEW ENGINE CONFIGURATION (Handlebars via hbs package)
// ----------------------------------------------------------------------------
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layouts/main' });

const fs = require('fs');

// Register Handlebars Partials synchronously
const partialsDir = path.join(__dirname, 'views/partials');
if (fs.existsSync(partialsDir)) {
  fs.readdirSync(partialsDir).forEach(file => {
    if (file.endsWith('.hbs')) {
      const name = path.basename(file, '.hbs');
      const content = fs.readFileSync(path.join(partialsDir, file), 'utf8');
      hbs.registerPartial(name, content);
    }
  });
}
hbs.registerPartials(partialsDir);

// ----------------------------------------------------------------------------
// REGISTER CUSTOM HANDLEBARS HELPERS (Requirement: At least 2 custom helpers)
// ----------------------------------------------------------------------------

/**
 * Custom Helper 1: formatPackage
 * Formats numeric package into Indian Lakhs Per Annum notation (e.g., 58.5 -> ₹58.5 LPA)
 */
hbs.registerHelper('formatPackage', (val) => {
  if (typeof val === 'number' && val > 0) {
    return `₹${val} LPA`;
  }
  return 'Seeking Orbit';
});

/**
 * Custom Helper 2: eq
 * Equality check for conditional template branches
 */
hbs.registerHelper('eq', (a, b) => {
  return a === b;
});

/**
 * Custom Helper 3: initials
 * Extracts capital initials from person or company name for avatars
 */
hbs.registerHelper('initials', (name) => {
  if (!name || typeof name !== 'string') return 'PO';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

// ----------------------------------------------------------------------------
// STATIC ASSET SERVING
// ----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to detect basePath when mounted under a gateway (/express-app)
app.use((req, res, next) => {
  res.locals.basePath = req.baseUrl || (req.originalUrl.startsWith('/express-app') ? '/express-app' : '');
  next();
});

// ----------------------------------------------------------------------------
// STATIC ROUTES
// ----------------------------------------------------------------------------

/**
 * Route: GET /
 * Home Dashboard View
 */
app.get('/', (req, res) => {
  const placedCount = students.filter(s => s.placed).length;
  const placementRate = ((placedCount / students.length) * 100).toFixed(1);
  const highestPackage = Math.max(...students.map(s => s.package || 0));
  const gaugeOffset = 314 - (314 * (placedCount / students.length));

  res.render('home', {
    title: 'Mission Control Dashboard',
    activeNav: 'home',
    companies,
    students,
    jobs,
    stats: {
      totalStudents: students.length,
      placedCount,
      placementRate,
      highestPackage,
      gaugeOffset
    }
  });
});

/**
 * Route: GET /companies
 * Companies Listing View
 */
app.get('/companies', (req, res) => {
  res.render('companies', {
    title: 'Enterprise Docks & Companies',
    activeNav: 'companies',
    companies,
    jobs
  });
});

/**
 * Route: GET /students
 * Students Leaderboard & Roster View
 */
app.get('/students', (req, res) => {
  res.render('students', {
    title: 'Cadet Flight Deck & Leaderboard',
    activeNav: 'students',
    students,
    companies
  });
});

// ----------------------------------------------------------------------------
// DYNAMIC ROUTES (Using req.params)
// ----------------------------------------------------------------------------

/**
 * Route: GET /company/:id
 * Dynamic Route: Detailed Company Dossier
 */
app.get('/company/:id', (req, res) => {
  const { id } = req.params;
  const company = companies.find(c => c.id === id);

  // If company not found, forward to 404
  if (!company) {
    return res.status(404).render('404', {
      title: '404 // Lost in Orbit',
      url: req.originalUrl
    });
  }

  const companyJobs = jobs.filter(j => j.companyId === company.id);

  res.render('company', {
    title: `${company.name} // Trajectory Dossier`,
    activeNav: 'companies',
    company,
    jobs: companyJobs
  });
});

/**
 * Route: GET /student/:id
 * Dynamic Route: Cadet Flight Profile Dossier
 */
app.get('/student/:id', (req, res) => {
  const { id } = req.params;
  const student = students.find(s => s.id === id);

  // If student not found, forward to 404
  if (!student) {
    return res.status(404).render('404', {
      title: '404 // Lost in Orbit',
      url: req.originalUrl
    });
  }

  const company = student.placedCompanyId 
    ? companies.find(c => c.id === student.placedCompanyId) 
    : null;

  const gaugeOffset = 314 - (314 * (student.cgpa / 10));

  res.render('student', {
    title: `${student.name} // Cadet Dossier`,
    activeNav: 'students',
    student,
    company,
    gaugeOffset
  });
});

/**
 * Route: GET /jobs/:company
 * Dynamic Route: Jobs for a specific company
 * (Demonstrates empty state on company 'tesla' which has 0 jobs)
 */
app.get('/jobs/:company', (req, res) => {
  const { company: companyId } = req.params;
  const company = companies.find(c => c.id === companyId);

  // If company not found, forward to 404
  if (!company) {
    return res.status(404).render('404', {
      title: '404 // Lost in Orbit',
      url: req.originalUrl
    });
  }

  const companyJobs = jobs.filter(j => j.companyId === company.id);

  res.render('jobs', {
    title: `Jobs at ${company.name}`,
    activeNav: 'jobs',
    company,
    jobs: companyJobs
  });
});

// ----------------------------------------------------------------------------
// 404 MIDDLEWARE
// Catches all unmatched routes and renders views/404.hbs with 404 status
// ----------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 // Lost in Orbit',
    url: req.originalUrl
  });
});

// ----------------------------------------------------------------------------
// 500 ERROR-HANDLING MIDDLEWARE
// ----------------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('[Implementation B ERROR]:', err);
  res.status(500).send(`
    <!DOCTYPE html>
    <html>
    <head><title>500 Internal Express Anomaly</title></head>
    <body style="background:#070B1A;color:#ffb4ab;font-family:monospace;padding:3rem;">
      <h1>500 // INTERNAL TELEMETRY ANOMALY</h1>
      <p>Caught in Express error-handling middleware:</p>
      <pre style="background:#171b2a;padding:1rem;border:1px solid #93000a;color:#fff;">${err.message}\n${err.stack}</pre>
    </body>
    </html>
  `);
});

// Start standalone server if executed directly
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Implementation B] Express + HBS server online at http://localhost:${PORT}`);
    console.log(`[Implementation B] Testing routes:`);
    console.log(`  - GET http://localhost:${PORT}/`);
    console.log(`  - GET http://localhost:${PORT}/companies`);
    console.log(`  - GET http://localhost:${PORT}/students`);
    console.log(`  - GET http://localhost:${PORT}/company/google-deepmind`);
    console.log(`  - GET http://localhost:${PORT}/student/aarav-sharma`);
    console.log(`  - GET http://localhost:${PORT}/jobs/google-deepmind`);
    console.log(`  - GET http://localhost:${PORT}/jobs/tesla (Empty State Demonstration)`);
  });
}

module.exports = { app };
