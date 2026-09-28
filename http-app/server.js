/**
 * ============================================================================
 * PlacementOrbit — Implementation A: Native Node.js "http" Module Engine
 * ============================================================================
 * CRITICAL ASSIGNMENT SPECIFICATIONS:
 * 1. Node built-in "http" module ONLY. No Express, no Handlebars, no npm packages.
 * 2. Manual routing using req.url, req.method and the built-in URL class.
 * 3. Static routes: GET /, /companies, /students.
 * 4. Dynamic routes with manually parsed parameters:
 *    - /company/:id
 *    - /student/:id
 *    - /jobs/:company
 * 5. GET /api/companies returning JSON (Content-Type: application/json).
 * 6. Serve static CSS/JS files manually (fs + correct Content-Type).
 * 7. HTML built with template literals.
 * 8. Status codes: 200, 404 (unknown route or invalid id), 405 (non-GET method), 500 (try/catch).
 * 9. Clear comments explaining each routing step.
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Import minimal shared in-memory dataset
const { companies, students, jobs } = require('./data');

// Import HTML template literal rendering functions
const {
  renderLayout,
  renderHome,
  renderCompanies,
  renderCompanyDetail,
  renderStudents,
  renderStudentDetail,
  renderJobs,
  render404
} = require('./templates');

// Configuration
const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types dictionary for static file serving
const MIME_TYPES = {
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

/**
 * Core Request Dispatcher
 * Handles every incoming HTTP request manually
 */
function requestHandler(req, res) {
  try {
    // ------------------------------------------------------------------------
    // STEP 1: Parse the incoming request URL using the built-in URL class
    // ------------------------------------------------------------------------
    // We provide a fallback host header since req.url only gives path + query
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = parsedUrl.pathname;

    // Detect if this request is routed through a gateway under a prefix (/http-app)
    let basePath = req.baseUrl || '';
    if (!basePath && (req.originalUrl || '').startsWith('/http-app')) {
      basePath = '/http-app';
    }
    if (pathname.startsWith('/http-app')) {
      basePath = '/http-app';
      pathname = pathname.substring(basePath.length) || '/';
    }

    // ------------------------------------------------------------------------
    // STEP 2: Enforce HTTP Method Validation
    // Non-GET requests should return 405 Method Not Allowed
    // ------------------------------------------------------------------------
    if (req.method !== 'GET') {
      res.writeHead(405, { 
        'Content-Type': 'text/plain; charset=UTF-8',
        'Allow': 'GET'
      });
      res.end('405 Method Not Allowed: Only GET operations are supported by PlacementOrbit');
      return;
    }

    // ------------------------------------------------------------------------
    // STEP 3: Serve Static Assets (CSS, JS, Images) manually with fs
    // ------------------------------------------------------------------------
    // Check if path refers to a file under /css/ or /js/
    if (pathname.startsWith('/css/') || pathname.startsWith('/js/')) {
      const filePath = path.join(PUBLIC_DIR, pathname);

      // Verify that the requested file stays within PUBLIC_DIR to prevent directory traversal
      if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden: Traversal Denied');
        return;
      }

      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Static Resource Not Found');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600'
        });
        res.end(fileData);
      });
      return;
    }

    // ------------------------------------------------------------------------
    // STEP 4: REST API Route — GET /api/companies (JSON Endpoint)
    // ------------------------------------------------------------------------
    if (pathname === '/api/companies') {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        status: 'success',
        engine: 'Native Node.js http module',
        count: companies.length,
        companies: companies
      }, null, 2));
      return;
    }

    // ------------------------------------------------------------------------
    // STEP 5: Static Routes
    // - GET /
    // - GET /companies
    // - GET /students
    // ------------------------------------------------------------------------
    if (pathname === '/' || pathname === '') {
      // Home Route: Placement index dashboard with bento metrics
      const htmlBody = renderHome(companies, students, jobs, basePath);
      const fullHtml = renderLayout('Mission Control — Home', htmlBody, 'home', basePath);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(fullHtml);
      return;
    }

    if (pathname === '/companies') {
      // Companies List: Enterprise docks overview
      const htmlBody = renderCompanies(companies, jobs, basePath);
      const fullHtml = renderLayout('Enterprise Docks', htmlBody, 'companies', basePath);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(fullHtml);
      return;
    }

    if (pathname === '/students') {
      // Students List: Flight deck leaderboard with Placed and Seeking status
      const htmlBody = renderStudents(students, companies, basePath);
      const fullHtml = renderLayout('Cadet Leaderboard & Roster', htmlBody, 'students', basePath);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(fullHtml);
      return;
    }

    // ------------------------------------------------------------------------
    // STEP 6: Dynamic Routes (Manually parsing route parameters)
    // - /company/:id
    // - /student/:id
    // - /jobs/:company
    // ------------------------------------------------------------------------

    // Route: /company/:id
    const companyMatch = pathname.match(/^\/company\/([a-zA-Z0-9_-]+)$/);
    if (companyMatch) {
      const companyId = companyMatch[1];
      const company = companies.find(c => c.id === companyId);

      // Validate ID: if company does not exist in array, return 404
      if (!company) {
        send404(req, res, `Company with identifier '${companyId}' not found`, basePath);
        return;
      }

      const companyJobs = jobs.filter(j => j.companyId === company.id);
      const htmlBody = renderCompanyDetail(company, companyJobs, basePath);
      const fullHtml = renderLayout(`${company.name} // Trajectory Dossier`, htmlBody, 'companies', basePath);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(fullHtml);
      return;
    }

    // Route: /student/:id
    const studentMatch = pathname.match(/^\/student\/([a-zA-Z0-9_-]+)$/);
    if (studentMatch) {
      const studentId = studentMatch[1];
      const student = students.find(s => s.id === studentId);

      // Validate ID: if student does not exist, return 404
      if (!student) {
        send404(req, res, `Cadet with identifier '${studentId}' not found in flight registry`, basePath);
        return;
      }

      const company = student.placedCompanyId 
        ? companies.find(c => c.id === student.placedCompanyId) 
        : null;

      const htmlBody = renderStudentDetail(student, company, basePath);
      const fullHtml = renderLayout(`${student.name} // Cadet Dossier`, htmlBody, 'students', basePath);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(fullHtml);
      return;
    }

    // Route: /jobs/:company
    const jobsMatch = pathname.match(/^\/jobs\/([a-zA-Z0-9_-]+)$/);
    if (jobsMatch) {
      const companyId = jobsMatch[1];
      const company = companies.find(c => c.id === companyId);

      // Validate company: if company is invalid, return 404
      if (!company) {
        send404(req, res, `Hiring partner '${companyId}' is not registered in Orbit`, basePath);
        return;
      }

      // Filter jobs for this specific company
      // (Tesla has 0 jobs, which specifically triggers the empty state)
      const companyJobs = jobs.filter(j => j.companyId === company.id);
      const htmlBody = renderJobs(company, companyJobs, basePath);
      const fullHtml = renderLayout(`Jobs at ${company.name}`, htmlBody, 'jobs', basePath);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(fullHtml);
      return;
    }

    // ------------------------------------------------------------------------
    // STEP 7: 404 Handler for Unknown Route
    // ------------------------------------------------------------------------
    send404(req, res, pathname, basePath);

  } catch (error) {
    // ------------------------------------------------------------------------
    // STEP 8: 500 Internal Server Error (Wrapped in try/catch block)
    // ------------------------------------------------------------------------
    console.error('[Implementation A ERROR]:', error);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>500 Internal Server Anomaly</title></head>
      <body style="background:#070B1A;color:#ffb4ab;font-family:monospace;padding:3rem;">
        <h1>500 // INTERNAL TELEMETRY ANOMALY</h1>
        <p>A fatal exception was caught in the native HTTP request pipeline:</p>
        <pre style="background:#171b2a;padding:1rem;border:1px solid #93000a;color:#fff;">${error.message}\n${error.stack}</pre>
      </body>
      </html>
    `);
  }
}

/**
 * 404 Error Response Helper
 */
function send404(req, res, requestedPath, basePath = '') {
  const htmlBody = render404(requestedPath, basePath);
  const fullHtml = renderLayout('404 // Lost in Orbit', htmlBody, '', basePath);

  res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(fullHtml);
}

// Create and start standalone HTTP server if executed directly
const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[Implementation A] Native HTTP server online at http://localhost:${PORT}`);
    console.log(`[Implementation A] Testing routes:`);
    console.log(`  - GET http://localhost:${PORT}/`);
    console.log(`  - GET http://localhost:${PORT}/companies`);
    console.log(`  - GET http://localhost:${PORT}/students`);
    console.log(`  - GET http://localhost:${PORT}/company/google-deepmind`);
    console.log(`  - GET http://localhost:${PORT}/student/aarav-sharma`);
    console.log(`  - GET http://localhost:${PORT}/jobs/google-deepmind`);
    console.log(`  - GET http://localhost:${PORT}/jobs/tesla (Empty State Demonstration)`);
    console.log(`  - GET http://localhost:${PORT}/api/companies (JSON API)`);
  });
}

// Export request handler for root gateway mounting
module.exports = { server, requestHandler };
