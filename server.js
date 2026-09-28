/**
 * ============================================================================
 * PlacementOrbit — Master Gateway & Mission Control Launchpad
 * Port 3000 Unified Server
 * ============================================================================
 * Hosts both independent implementations:
 *  - Implementation A: /http-app (Pure Node.js built-in 'http' module)
 *  - Implementation B: /express-app (Express.js + Handlebars 'hbs' engine)
 * 
 * Standalone Execution:
 *  - node http-app/server.js    (runs Implementation A on port 3001)
 *  - node express-app/server.js (runs Implementation B on port 3002)
 *  - node server.js             (runs Unified Gateway on port 3000)
 * ============================================================================
 */

const express = require('express');
const http = require('http');
const path = require('path');

// Import both application handlers
const httpApp = require('./http-app/server');
const expressApp = require('./express-app/server').app;

const app = express();
const PORT = process.env.PORT || 3000;

// Delegate /http-app to Implementation A (built-in http module handler)
app.use('/http-app', (req, res) => {
  httpApp.requestHandler(req, res);
});

// Delegate /express-app to Implementation B (Express + Handlebars)
app.use('/express-app', expressApp);

// Direct API endpoint GET /api/companies (delegates to Implementation A)
app.get('/api/companies', (req, res) => {
  httpApp.requestHandler(req, res);
});

// Serve assets for the root gateway
app.use('/css', express.static(path.join(__dirname, 'http-app/public/css')));
app.use('/js', express.static(path.join(__dirname, 'http-app/public/js')));

// Root Dashboard: Master Mission Control Launchpad
app.get('/', (req, res) => {
  res.send(renderMasterLaunchpad());
});

function renderMasterLaunchpad() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PlacementOrbit — Dual Architecture Mission Control</title>
  <script>
    (function() {
      var origDefine = Object.defineProperty;
      Object.defineProperty = function(obj, prop, descriptor) {
        if (obj === window && prop === 'fetch' && descriptor) {
          var origGet = descriptor.get;
          var origSet = descriptor.set;
          var overrideVal;
          return origDefine(obj, prop, {
            configurable: true,
            enumerable: descriptor.enumerable !== undefined ? descriptor.enumerable : true,
            get: function() {
              return overrideVal !== undefined ? overrideVal : (origGet ? origGet.call(this) : descriptor.value);
            },
            set: function(v) {
              overrideVal = v;
              if (origSet) origSet.call(this, v);
            }
          });
        }
        return origDefine.apply(this, arguments);
      };
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/http-app/css/style.css" />
  <style>
    .launch-card {
      background: rgba(30, 41, 59, 0.55);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 24px;
      padding: 2.2rem;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .launch-card:hover {
      transform: translateY(-4px);
    }
    .launch-card.card-a:hover {
      border-color: #5de6ff;
      box-shadow: 0 16px 48px -8px rgba(34, 211, 238, 0.35);
    }
    .launch-card.card-b:hover {
      border-color: #d2bbff;
      box-shadow: 0 16px 48px -8px rgba(124, 58, 237, 0.45);
    }
    .route-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-radius: 8px;
      background: rgba(9, 13, 28, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: #dee1f7;
      margin-bottom: 6px;
      transition: all 0.15s;
    }
    .route-link:hover {
      background: rgba(30, 41, 59, 0.9);
      border-color: var(--accent-cyan);
      color: #fff;
      transform: translateX(3px);
    }
  </style>
</head>
<body>
  <!-- Top App Switcher -->
  <div class="orbit-app-switcher">
    <div class="switcher-title">
      <span class="pulse-neon">●</span>
      <span>MISSION CONTROL GATEWAY // PORT 3000</span>
    </div>
    <div class="switcher-tabs">
      <a href="/http-app/" class="tab-btn">
        <span>🛰️ Implementation A: Native HTTP</span>
      </a>
      <a href="/express-app/" class="tab-btn">
        <span>⚡ Implementation B: Express + HBS</span>
      </a>
      <a href="/api/companies" target="_blank" class="tab-btn">
        <span>{ } GET /api/companies</span>
      </a>
    </div>
  </div>

  <main class="orbit-main" style="padding-top: 6rem; max-width: 1240px;">
    <!-- HERO HEADER -->
    <div style="text-align: center; max-width: 840px; margin: 0 auto 3rem auto;">
      <div style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 14px; border-radius: 9999px; background: rgba(37, 41, 58, 0.7); border: 1px solid rgba(93, 230, 255, 0.35); margin-bottom: 1.2rem;">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-cyan-bright); box-shadow: 0 0 10px #5de6ff;" class="pulse-neon"></span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan-bright); letter-spacing: 0.08em; font-weight: 600;">
          COLLEGE PLACEMENT MANAGEMENT SYSTEM // PLACEMENTORBIT
        </span>
      </div>

      <h1 style="font-size: 3.2rem; line-height: 1.1; margin-bottom: 1rem;">
        Dual Node.js Architecture <br />
        <span class="text-gradient">Mission Control for Careers</span>
      </h1>

      <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6;">
        Two fully independent, production-grade Node.js implementations sharing an identical minimal dataset (3 companies, 4 students, 5 jobs). Zero external UI frameworks, server-rendered HTML, and pure CSS glassmorphism.
      </p>

      <!-- CANDIDATE / DEVELOPER IDENTIFIER -->
      <div style="display: inline-flex; align-items: center; justify-content: center; gap: 14px; margin-top: 1.5rem; padding: 10px 24px; border-radius: 9999px; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(34, 211, 238, 0.4); backdrop-filter: blur(16px); box-shadow: 0 8px 32px -4px rgba(34, 211, 238, 0.25);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="font-size: 20px; color: var(--accent-cyan-bright);">account_circle</span>
          <span style="font-family: var(--font-mono); font-size: 0.88rem; color: #fff; letter-spacing: 0.04em;">
            CANDIDATE: <strong style="color: var(--accent-cyan-bright); font-weight: 700;">SAAD PARKAR</strong>
          </span>
        </div>
        <span style="color: rgba(255,255,255,0.25);">|</span>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px; color: var(--accent-pink);">tag</span>
          <span style="font-family: var(--font-mono); font-size: 0.88rem; color: #fff; letter-spacing: 0.04em;">
            ROLL NUMBER: <strong style="color: var(--accent-pink); font-weight: 700;">T.24.79</strong>
          </span>
        </div>
      </div>
    </div>

    <!-- DUAL LAUNCH CARDS -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem; margin-bottom: 3.5rem;">
      
      <!-- IMPLEMENTATION A -->
      <div class="launch-card card-a">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(34, 211, 238, 0.15); border: 1px solid var(--accent-cyan); display: flex; align-items: center; justify-content: center; color: var(--accent-cyan-bright);">
                <span class="material-symbols-outlined" style="font-size: 24px;">satellite_alt</span>
              </div>
              <div>
                <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan-bright); text-transform: uppercase;">IMPLEMENTATION A</span>
                <h2 style="font-size: 1.5rem; color: #fff;">/http-app</h2>
              </div>
            </div>
            <span class="badge badge-open">
              <span class="badge-dot"></span>
              Pure Node HTTP
            </span>
          </div>

          <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.2rem;">
            <strong>Built-in "http" module ONLY.</strong> Zero Express, zero Handlebars, zero npm packages. Manual routing via <code>req.url</code>, <code>req.method</code>, and URL class. HTML built with template literals.
          </p>

          <div style="background: rgba(9, 13, 28, 0.6); padding: 14px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-cyan-bright); text-transform: uppercase; display: block; margin-bottom: 8px;">
              Verified Routes in Implementation A:
            </span>
            <a href="/http-app/" class="route-link">
              <span>GET /</span>
              <span style="color: var(--accent-cyan-bright);">Home Dashboard →</span>
            </a>
            <a href="/http-app/companies" class="route-link">
              <span>GET /companies</span>
              <span style="color: var(--accent-cyan-bright);">Enterprise Docks →</span>
            </a>
            <a href="/http-app/students" class="route-link">
              <span>GET /students</span>
              <span style="color: var(--accent-cyan-bright);">Cadet Roster →</span>
            </a>
            <a href="/http-app/company/google-deepmind" class="route-link">
              <span>GET /company/google-deepmind</span>
              <span style="color: var(--accent-cyan-bright);">Dossier →</span>
            </a>
            <a href="/http-app/student/aarav-sharma" class="route-link">
              <span>GET /student/aarav-sharma</span>
              <span style="color: var(--accent-cyan-bright);">Placed Cadet →</span>
            </a>
            <a href="/http-app/student/dev-patel" class="route-link">
              <span>GET /student/dev-patel</span>
              <span style="color: var(--accent-cyan-bright);">Seeking Cadet →</span>
            </a>
            <a href="/http-app/jobs/google-deepmind" class="route-link">
              <span>GET /jobs/google-deepmind</span>
              <span style="color: var(--accent-cyan-bright);">Active Jobs →</span>
            </a>
            <a href="/http-app/jobs/tesla" class="route-link" style="border-color: rgba(245, 158, 11, 0.4);">
              <span>GET /jobs/tesla</span>
              <span style="color: #fbbf24;">Empty Sector Demo →</span>
            </a>
            <a href="/http-app/api/companies" target="_blank" class="route-link" style="border-color: rgba(16, 185, 129, 0.4);">
              <span>GET /api/companies</span>
              <span style="color: #34d399;">JSON Response →</span>
            </a>
            <a href="/http-app/unknown-orbit-route" class="route-link" style="border-color: rgba(239, 68, 68, 0.4);">
              <span>GET /unknown-route</span>
              <span style="color: #f87171;">404 Lost in Orbit →</span>
            </a>
          </div>
        </div>

        <div>
          <a href="/http-app/" class="btn btn-primary" style="width: 100%; font-size: 1rem; padding: 0.85rem;">
            <span class="material-symbols-outlined">launch</span>
            <span>Launch Native HTTP App</span>
          </a>
        </div>
      </div>

      <!-- IMPLEMENTATION B -->
      <div class="launch-card card-b">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(124, 58, 237, 0.25); border: 1px solid var(--accent-violet); display: flex; align-items: center; justify-content: center; color: #d2bbff;">
                <span class="material-symbols-outlined" style="font-size: 24px;">bolt</span>
              </div>
              <div>
                <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #d2bbff; text-transform: uppercase;">IMPLEMENTATION B</span>
                <h2 style="font-size: 1.5rem; color: #fff;">/express-app</h2>
              </div>
            </div>
            <span class="badge" style="background: rgba(124, 58, 237, 0.2); border: 1px solid #7c3aed; color: #d2bbff;">
              <span class="badge-dot" style="background: #7c3aed;"></span>
              Express + HBS
            </span>
          </div>

          <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.2rem;">
            <strong>Express.js + Handlebars (hbs package).</strong> Uses <code>express.static("public")</code>, views, layouts, 4 partials (navbar, footer, company-card, student-card), custom helpers (<code>formatPackage</code>, <code>eq</code>, <code>initials</code>), and 404/500 middleware.
          </p>

          <div style="background: rgba(9, 13, 28, 0.6); padding: 14px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: #d2bbff; text-transform: uppercase; display: block; margin-bottom: 8px;">
              Verified Routes in Implementation B:
            </span>
            <a href="/express-app/" class="route-link">
              <span>GET /</span>
              <span style="color: #d2bbff;">Home Dashboard →</span>
            </a>
            <a href="/express-app/companies" class="route-link">
              <span>GET /companies</span>
              <span style="color: #d2bbff;">Enterprise Docks →</span>
            </a>
            <a href="/express-app/students" class="route-link">
              <span>GET /students</span>
              <span style="color: #d2bbff;">Cadet Roster →</span>
            </a>
            <a href="/express-app/company/microsoft" class="route-link">
              <span>GET /company/microsoft</span>
              <span style="color: #d2bbff;">Dossier →</span>
            </a>
            <a href="/express-app/student/rhea-sen" class="route-link">
              <span>GET /student/rhea-sen</span>
              <span style="color: #d2bbff;">Placed Cadet →</span>
            </a>
            <a href="/express-app/student/ananya-kulkarni" class="route-link">
              <span>GET /student/ananya-kulkarni</span>
              <span style="color: #d2bbff;">Seeking Cadet →</span>
            </a>
            <a href="/express-app/jobs/microsoft" class="route-link">
              <span>GET /jobs/microsoft</span>
              <span style="color: #d2bbff;">Active Jobs →</span>
            </a>
            <a href="/express-app/jobs/tesla" class="route-link" style="border-color: rgba(245, 158, 11, 0.4);">
              <span>GET /jobs/tesla</span>
              <span style="color: #fbbf24;">Empty Sector ({{#unless}}) →</span>
            </a>
            <a href="/express-app/non-existent-sector" class="route-link" style="border-color: rgba(239, 68, 68, 0.4);">
              <span>GET /unknown-route</span>
              <span style="color: #f87171;">404 Middleware Page →</span>
            </a>
          </div>
        </div>

        <div>
          <a href="/express-app/" class="btn btn-primary" style="width: 100%; font-size: 1rem; padding: 0.85rem; background: linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%);">
            <span class="material-symbols-outlined">launch</span>
            <span>Launch Express + HBS App</span>
          </a>
        </div>
      </div>
    </div>

    <!-- TECHNICAL COMPLIANCE MATRIX -->
    <div class="card-glass-elevated" style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.3rem; margin-bottom: 1.2rem; display: flex; align-items: center; gap: 8px;">
        <span class="material-symbols-outlined" style="color: var(--accent-cyan-bright);">checklist</span>
        <span>Assignment Technical Rubric Compliance Matrix</span>
      </h3>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; font-family: var(--font-body); text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.12); color: var(--accent-cyan-bright); font-family: var(--font-mono); font-size: 0.75rem;">
              <th style="padding: 10px 14px;">REQUIREMENT</th>
              <th style="padding: 10px 14px;">IMPLEMENTATION A (/http-app)</th>
              <th style="padding: 10px 14px;">IMPLEMENTATION B (/express-app)</th>
            </tr>
          </thead>
          <tbody style="color: var(--text-muted);">
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <td style="padding: 10px 14px; font-weight: 600; color: #fff;">Framework / Libraries</td>
              <td style="padding: 10px 14px; color: var(--status-placed);">Node built-in "http" ONLY (0 npm packages)</td>
              <td style="padding: 10px 14px; color: var(--status-placed);">Express.js + "hbs" (Handlebars)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <td style="padding: 10px 14px; font-weight: 600; color: #fff;">Routing Technique</td>
              <td style="padding: 10px 14px;">Manual: <code>req.url</code>, <code>req.method</code>, <code>new URL()</code></td>
              <td style="padding: 10px 14px;">Express Router: <code>app.get()</code>, <code>req.params</code></td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <td style="padding: 10px 14px; font-weight: 600; color: #fff;">Templating Engine</td>
              <td style="padding: 10px 14px;">HTML Template Literals (ES6)</td>
              <td style="padding: 10px 14px;">Handlebars .hbs (layouts, views, partials)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <td style="padding: 10px 14px; font-weight: 600; color: #fff;">Static File Serving</td>
              <td style="padding: 10px 14px;">Manual <code>fs.readFile</code> + Content-Type MIME map</td>
              <td style="padding: 10px 14px;"><code>express.static("public")</code></td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <td style="padding: 10px 14px; font-weight: 600; color: #fff;">Minimal Data Set</td>
              <td style="padding: 10px 14px;">3 companies, 4 students, 5 jobs (Shared)</td>
              <td style="padding: 10px 14px;">3 companies, 4 students, 5 jobs (Shared)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <td style="padding: 10px 14px; font-weight: 600; color: #fff;">Conditional States</td>
              <td style="padding: 10px 14px;">2 Placed, 2 Unplaced; Open &amp; Closed jobs; Tesla Empty State</td>
              <td style="padding: 10px 14px;">2 Placed, 2 Unplaced; Open &amp; Closed jobs; Tesla Empty State</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <td style="padding: 10px 14px; font-weight: 600; color: #fff;">Error Handling</td>
              <td style="padding: 10px 14px;">Explicit 200, 404, 405 (Non-GET), 500 (try/catch)</td>
              <td style="padding: 10px 14px;">404 Middleware + 500 Error Middleware</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: 600; color: #fff;">Custom Helpers / Partials</td>
              <td style="padding: 10px 14px;">Modular JS functional renderers</td>
              <td style="padding: 10px 14px;"><code>formatPackage</code>, <code>eq</code>, <code>initials</code>; 4 Partials</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <footer class="orbit-footer">
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
      <span style="color: var(--status-placed);" class="pulse-neon">●</span>
      <span style="color: var(--accent-cyan-bright); font-weight: 600;">GATEWAY ONLINE</span>
      <span style="color: rgba(255,255,255,0.2);">•</span>
      <span>Dual Architecture Suite | Port 3000 Active</span>
      <span style="color: rgba(255,255,255,0.2);">•</span>
      <span style="font-family: var(--font-mono); color: #dee1f7; font-weight: 600; letter-spacing: 0.05em; background: rgba(124, 58, 237, 0.25); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(124, 58, 237, 0.4);">
        ALL RIGHTS RESERVED SAAD PARKAR T.24.79
      </span>
    </div>
    <div style="display: flex; align-items: center; gap: 18px;">
      <a href="/http-app/">Launch Implementation A</a>
      <a href="/express-app/">Launch Implementation B</a>
      <a href="/api/companies">REST JSON</a>
    </div>
  </footer>
</body>
</html>`;
}

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PlacementOrbit Gateway] Online on port ${PORT}`);
    console.log(`  → Mission Control Gateway: http://localhost:${PORT}/`);
    console.log(`  → Implementation A (Native HTTP): http://localhost:${PORT}/http-app/`);
    console.log(`  → Implementation B (Express + HBS): http://localhost:${PORT}/express-app/`);
    console.log(`  → REST API (JSON): http://localhost:${PORT}/api/companies`);
  });
}

module.exports = app;
