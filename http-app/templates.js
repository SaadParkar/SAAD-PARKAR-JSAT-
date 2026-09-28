// PlacementOrbit - Implementation A (Template Literals HTML Engine)

function renderLayout(title, content, activeNav = 'home', basePath = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — PlacementOrbit</title>
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
  <link rel="stylesheet" href="${basePath}/css/style.css" />
</head>
<body>
  <!-- Top Architecture Switcher -->
  <div class="orbit-app-switcher">
    <div class="switcher-title">
      <span class="pulse-neon">●</span>
      <span>MISSION CONTROL ARCHITECTURE:</span>
    </div>
    <div class="switcher-tabs">
      <a href="${basePath}/" class="tab-btn active" title="Pure Node.js built-in http module (Zero dependencies)">
        <span>🛰️ Implementation A: Native HTTP</span>
        <span class="badge-mode">Active</span>
      </a>
      <a href="/express-app/" class="tab-btn" title="Express.js + Handlebars (hbs) implementation">
        <span>⚡ Implementation B: Express + HBS</span>
      </a>
      <a href="/api/companies" target="_blank" class="tab-btn" title="View JSON Endpoint">
        <span>{ } GET /api/companies</span>
      </a>
    </div>
  </div>

  <!-- Floating Pill Navbar -->
  <nav class="orbit-nav">
    <a href="${basePath}/" class="nav-brand">
      <div class="nav-brand-icon">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">satellite_alt</span>
      </div>
      <div>
        <span class="nav-brand-text">PlacementOrbit</span>
      </div>
    </a>

    <div class="nav-links">
      <a href="${basePath}/" class="nav-link ${activeNav === 'home' ? 'active' : ''}">Home</a>
      <a href="${basePath}/companies" class="nav-link ${activeNav === 'companies' ? 'active' : ''}">Companies</a>
      <a href="${basePath}/students" class="nav-link ${activeNav === 'students' ? 'active' : ''}">Students</a>
      <a href="${basePath}/jobs/google-deepmind" class="nav-link ${activeNav === 'jobs' ? 'active' : ''}">Jobs</a>
    </div>

    <div class="nav-actions">
      <span class="badge-mode">Node http // 200 OK</span>
      <a href="${basePath}/students" class="btn btn-ghost" style="padding: 4px 10px; font-size: 0.8rem;">
        <span class="material-symbols-outlined" style="font-size: 16px;">military_tech</span>
        <span>Flight Deck</span>
      </a>
    </div>
  </nav>

  <!-- Main Viewport -->
  <main class="orbit-main">
    ${content}
  </main>

  <!-- Telemetry Strip Footer -->
  <footer class="orbit-footer">
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
      <span style="color: var(--status-placed);" class="pulse-neon">●</span>
      <span style="color: var(--accent-cyan-bright); font-weight: 600;">TELEMETRY ONLINE</span>
      <span style="color: rgba(255,255,255,0.2);">•</span>
      <span>Node.js Native HTTP Server | Systems Nominal</span>
      <span style="color: rgba(255,255,255,0.2);">•</span>
      <span style="font-family: var(--font-mono); color: #dee1f7; font-weight: 600; letter-spacing: 0.05em; background: rgba(124, 58, 237, 0.25); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(124, 58, 237, 0.4);">
        ALL RIGHTS RESERVED SAAD PARKAR T.24.79
      </span>
    </div>
    <div style="display: flex; align-items: center; gap: 18px;">
      <span>Latency: <strong style="color: var(--accent-cyan-bright);">8ms</strong></span>
      <span>Cadet: <strong style="color: #5de6ff;">Saad Parkar (T.24.79)</strong></span>
      <a href="/api/companies">REST API</a>
      <a href="${basePath}/companies">Enterprise Docks</a>
    </div>
  </footer>

  <script src="${basePath}/js/main.js"></script>
</body>
</html>`;
}

function renderHome(companies, students, jobs, basePath = '') {
  const placedCount = students.filter(s => s.placed).length;
  const placementRate = ((placedCount / students.length) * 100).toFixed(1);
  const highestPackage = Math.max(...students.map(s => s.package || 0));

  return `
  <!-- HERO BANNER -->
  <div style="margin-bottom: 2rem;">
    <div style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; border-radius: 9999px; background: rgba(37, 41, 58, 0.7); border: 1px solid rgba(93, 230, 255, 0.3); margin-bottom: 1rem;">
      <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-cyan-bright); box-shadow: 0 0 8px #5de6ff;" class="pulse-neon"></span>
      <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-cyan-bright); letter-spacing: 0.08em; font-weight: 600;">MISSION CONTROL // NATIVE HTTP ENGINE</span>
      <span style="color: rgba(255,255,255,0.3);">•</span>
      <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #d2bbff;">BUILT-IN 'http' MODULE ONLY</span>
    </div>

    <div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 1.5rem;">
      <div style="max-width: 720px;">
        <h1 style="font-size: 2.8rem; line-height: 1.15; margin-bottom: 0.8rem;">
          Orchestrating <span class="text-gradient">Student Trajectories</span> into Global Orbits
        </h1>
        <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6;">
          Real-time propulsion telemetry, tier-segmented company docks, automated algorithmic shortlisting, and candidate offer matrix for the campus fleet.
        </p>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${basePath}/companies" class="btn btn-primary">
          <span class="material-symbols-outlined" style="font-size: 18px;">rocket_launch</span>
          <span>Explore Companies</span>
        </a>
        <a href="${basePath}/students" class="btn btn-ghost">
          <span class="material-symbols-outlined" style="font-size: 18px;">groups</span>
          <span>View Students</span>
        </a>
      </div>
    </div>
  </div>

  <!-- CONTINUOUS MARQUEE COMPANY TICKER -->
  <div class="marquee-container">
    <div class="marquee-track">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="badge-dot" style="background: var(--accent-cyan-bright); box-shadow: 0 0 6px #5de6ff;"></span>
        <strong>GOOGLE DEEPMIND</strong>
        <span style="color: var(--text-dim);">[TIER-1 AI LABS • ₹58.5 LPA]</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="badge-dot" style="background: var(--accent-violet); box-shadow: 0 0 6px #7c3aed;"></span>
        <strong>MICROSOFT AZURE</strong>
        <span style="color: var(--accent-cyan-bright);">[ACTIVE RADAR • 44.0 LPA]</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="badge-dot" style="background: var(--status-open); box-shadow: 0 0 6px #10b981;"></span>
        <strong>TESLA AUTONOMY</strong>
        <span style="color: var(--text-dim);">[HARDWARE & VISION LABS]</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="badge-dot" style="background: var(--accent-cyan-bright); box-shadow: 0 0 6px #5de6ff;"></span>
        <strong>GOOGLE DEEPMIND</strong>
        <span style="color: var(--text-dim);">[TIER-1 AI LABS • ₹58.5 LPA]</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="badge-dot" style="background: var(--accent-violet); box-shadow: 0 0 6px #7c3aed;"></span>
        <strong>MICROSOFT AZURE</strong>
        <span style="color: var(--accent-cyan-bright);">[ACTIVE RADAR • 44.0 LPA]</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="badge-dot" style="background: var(--status-open); box-shadow: 0 0 6px #10b981;"></span>
        <strong>TESLA AUTONOMY</strong>
        <span style="color: var(--text-dim);">[HARDWARE & VISION LABS]</span>
      </div>
    </div>
  </div>

  <!-- BENTO GRID SYSTEM -->
  <div class="bento-grid">
    <!-- BENTO 1: Main Telemetry Metric (Col 7) -->
    <div class="card-glass col-7" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="padding: 8px; border-radius: 8px; background: var(--surface-high); color: var(--accent-cyan-bright);">
              <span class="material-symbols-outlined" style="font-size: 20px;">query_stats</span>
            </div>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-cyan-bright); letter-spacing: 0.08em; text-transform: uppercase;">Propulsion Telemetry</span>
              <h2 style="font-size: 1.3rem;">Campus Placement Orbit Index</h2>
            </div>
          </div>
          <span class="badge badge-placed">
            <span class="badge-dot"></span>
            ${students.length} Cadets Enrolled
          </span>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 1.5rem; margin: 1.5rem 0;">
          <!-- Radial Arc Gauge -->
          <div class="radial-meter">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="transparent" stroke="rgba(255,255,255,0.06)" stroke-width="10"></circle>
              <circle cx="60" cy="60" r="50" fill="transparent" stroke="url(#arcG)" stroke-width="10" stroke-dasharray="314" stroke-dashoffset="${314 - (314 * (placedCount / students.length))}" stroke-linecap="round"></circle>
              <defs>
                <linearGradient id="arcG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#7C3AED"></stop>
                  <stop offset="100%" stop-color="#5DE6FF"></stop>
                </linearGradient>
              </defs>
            </svg>
            <div class="radial-meter-content">
              <span class="telemetry-val" style="font-size: 2rem; color: #fff;" data-counter data-target="${placementRate}" data-decimals="1" data-suffix="%">${placementRate}%</span>
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--accent-cyan-bright);">PLACED RATE</span>
            </div>
          </div>

          <!-- Secondary Pillars -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; flex: 1; min-width: 240px;">
            <div style="background: rgba(9, 13, 28, 0.6); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; display: block;">Total Placed</span>
              <span class="telemetry-val" style="font-size: 1.6rem; color: var(--accent-cyan-bright);">${placedCount} / ${students.length}</span>
              <span style="display: block; font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">2 In Orbit, 2 Seeking</span>
            </div>

            <div style="background: rgba(9, 13, 28, 0.6); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; display: block;">Highest CTC Orbit</span>
              <span class="telemetry-val" style="font-size: 1.6rem; color: #d2bbff;">₹${highestPackage} <span style="font-size: 0.9rem;">LPA</span></span>
              <span style="display: block; font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">Google DeepMind</span>
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; margin-top: 1rem; font-size: 0.82rem;">
        <span style="color: var(--text-muted);">Demonstrating In-Memory Arrays without Database</span>
        <a href="${basePath}/students" style="color: var(--accent-cyan-bright); font-family: var(--font-mono); font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
          <span>AUDIT CADET MATRIX</span>
          <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
        </a>
      </div>
    </div>

    <!-- BENTO 2: Live Encounter Radar (Col 5) -->
    <div class="card-glass col-5" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1.2rem;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="padding: 8px; border-radius: 8px; background: var(--surface-high); color: var(--accent-cyan-bright);">
              <span class="material-symbols-outlined" style="font-size: 20px;">radar</span>
            </div>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-cyan-bright); letter-spacing: 0.08em; text-transform: uppercase;">Active Docks</span>
              <h2 style="font-size: 1.2rem;">Partner Companies</h2>
            </div>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim);">${companies.length} CLUSTERS</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${companies.map(c => {
            const cJobs = jobs.filter(j => j.companyId === c.id);
            const openJobsCount = cJobs.filter(j => j.status === 'Open').length;
            return `
            <div style="background: rgba(9, 13, 28, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <a href="${basePath}/company/${c.id}" style="font-weight: 700; color: #fff; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                  <span>${c.name}</span>
                  <span class="material-symbols-outlined" style="font-size: 14px; color: var(--accent-cyan-bright);">launch</span>
                </a>
                <span style="font-size: 0.75rem; color: var(--text-dim); display: block;">${c.location}</span>
              </div>
              <div style="text-align: right;">
                <span class="badge ${openJobsCount > 0 ? 'badge-open' : 'badge-closed'}">
                  <span class="badge-dot"></span>
                  ${openJobsCount > 0 ? `${openJobsCount} Open` : '0 Jobs (Empty State)'}
                </span>
                <a href="${basePath}/jobs/${c.id}" style="display: block; font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan-bright); margin-top: 4px;">
                  View Jobs →
                </a>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div style="margin-top: 1.5rem; text-align: center;">
        <a href="${basePath}/companies" class="btn btn-ghost" style="width: 100%;">
          <span>View All Enterprise Docks</span>
          <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
        </a>
      </div>
    </div>

    <!-- BENTO 3: Recent Student Placements (Col 12) -->
    <div class="card-glass col-12">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1.2rem;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="padding: 8px; border-radius: 8px; background: var(--surface-high); color: var(--accent-cyan-bright);">
            <span class="material-symbols-outlined" style="font-size: 20px;">dynamic_feed</span>
          </div>
          <div>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-cyan-bright); letter-spacing: 0.08em; text-transform: uppercase;">Cadet Roster</span>
            <h2 style="font-size: 1.3rem;">Cadet Trajectory Stream (Demonstrating Conditional States)</h2>
          </div>
        </div>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">4 STUDENTS TOTAL</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
        ${students.map(s => {
          const comp = companies.find(c => c.id === s.placedCompanyId);
          return `
          <div style="background: rgba(9, 13, 28, 0.7); border: 1px solid ${s.placed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.08)'}; border-radius: 14px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <a href="${basePath}/student/${s.id}" style="font-weight: 700; color: #fff; font-size: 1rem; display: block;">
                    ${s.name}
                  </a>
                  <span style="font-size: 0.75rem; color: var(--text-dim);">${s.branch}</span>
                </div>
                <span class="badge ${s.placed ? 'badge-placed' : 'badge-not-placed'}">
                  <span class="badge-dot"></span>
                  ${s.placed ? 'PLACED' : 'NOT PLACED'}
                </span>
              </div>

              <div style="margin: 10px 0; padding: 8px 10px; background: rgba(255,255,255,0.03); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem;">
                  <span style="color: var(--text-dim);">CGPA: <strong style="color: #fff;">${s.cgpa}</strong></span>
                  <span style="color: ${s.placed ? 'var(--status-placed)' : 'var(--text-dim)'}; font-weight: 700;">
                    ${s.placed ? `₹${s.package} LPA` : 'Seeking Orbit'}
                  </span>
                </div>
                ${s.placed ? `<span style="font-size: 0.72rem; color: var(--accent-cyan-bright); display: block; margin-top: 4px;">Placed at ${comp ? comp.name : s.placedCompanyId}</span>` : ''}
              </div>

              <div style="margin-top: 6px;">
                ${s.skills.slice(0, 3).map(sk => `<span class="skill-chip">${sk}</span>`).join('')}
              </div>
            </div>

            <div style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; text-align: right;">
              <a href="${basePath}/student/${s.id}" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan-bright);">
                Inspect Dossier →
              </a>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

function renderCompanies(companies, jobs, basePath = '') {
  return `
  <div style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
    <div>
      <div style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 9999px; background: rgba(37, 41, 58, 0.7); border: 1px solid rgba(93, 230, 255, 0.3); margin-bottom: 8px;">
        <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--accent-cyan-bright);"></span>
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan-bright);">ENTERPRISE DOCKS</span>
      </div>
      <h1 style="font-size: 2.2rem;">Recruiting Companies</h1>
      <p style="color: var(--text-muted); font-size: 0.95rem;">Active partner enterprises conducting placement trajectories and interview rounds.</p>
    </div>

    <!-- Quick Search Input -->
    <div>
      <input type="text" id="telemetrySearch" placeholder="Filter company name or industry..." 
             style="background: rgba(9, 13, 28, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 8px 14px; font-family: var(--font-mono); font-size: 0.8rem; color: #fff; width: 280px;" />
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem;">
    ${companies.map(c => {
      const cJobs = jobs.filter(j => j.companyId === c.id);
      const openCount = cJobs.filter(j => j.status === 'Open').length;
      return `
      <div class="card-glass" data-filter-item style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: var(--surface-high); border: 1px solid rgba(93, 230, 255, 0.3); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--accent-cyan-bright);">
              ${c.name.charAt(0)}
            </div>
            <span class="badge ${cJobs.length > 0 ? 'badge-open' : 'badge-closed'}">
              <span class="badge-dot"></span>
              ${cJobs.length} Jobs Listed
            </span>
          </div>

          <h2 style="font-size: 1.35rem; margin-bottom: 4px;">${c.name}</h2>
          <span style="display: inline-block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-cyan-bright); margin-bottom: 8px;">
            ${c.industry}
          </span>
          <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 12px; display: flex; align-items: center; gap: 4px;">
            <span class="material-symbols-outlined" style="font-size: 15px;">location_on</span>
            <span>${c.location}</span>
          </p>

          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">
            ${c.about}
          </p>

          <div style="background: rgba(9, 13, 28, 0.6); padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 1rem;">
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-dim); text-transform: uppercase; display: block; margin-bottom: 4px;">
              Hiring Pipeline (${c.rounds.length} Rounds)
            </span>
            <span style="font-size: 0.8rem; color: #fff;">
              ${c.rounds[0]} → ${c.rounds[1] || 'Final Gate'}
            </span>
          </div>
        </div>

        <div style="display: flex; gap: 8px; border-top: 1px solid rgba(255,255,255,0.08); pt: 1rem; padding-top: 1rem;">
          <a href="${basePath}/company/${c.id}" class="btn btn-ghost" style="flex: 1; font-size: 0.82rem;">
            <span>Company Dossier</span>
          </a>
          <a href="${basePath}/jobs/${c.id}" class="btn btn-primary" style="flex: 1; font-size: 0.82rem;">
            <span>View Jobs (${cJobs.length})</span>
          </a>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function renderCompanyDetail(company, companyJobs, basePath = '') {
  return `
  <div style="margin-bottom: 1.5rem;">
    <a href="${basePath}/companies" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan-bright); display: inline-flex; align-items: center; gap: 6px; margin-bottom: 1rem;">
      <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
      <span>Back to Companies</span>
    </a>
  </div>

  <div class="bento-grid">
    <!-- Left Dossier Column (Col 7) -->
    <div class="card-glass-elevated col-7">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 2px 10px; border-radius: 9999px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); margin-bottom: 6px;">
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: #d2bbff;">VERIFIED ORBITAL PARTNER</span>
          </div>
          <h1 style="font-size: 2.2rem;">${company.name}</h1>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan-bright); display: block; margin-top: 4px;">
            ${company.industry}
          </span>
          <p style="font-size: 0.85rem; color: var(--text-dim); margin-top: 4px;">
            📍 ${company.location} • <a href="${company.website}" target="_blank" style="color: var(--accent-cyan-bright); text-decoration: underline;">${company.website}</a>
          </p>
        </div>

        <div style="width: 56px; height: 56px; border-radius: 16px; background: var(--surface-high); border: 1px solid var(--accent-cyan); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; color: #fff; box-shadow: 0 0 16px rgba(93, 230, 255, 0.3);">
          ${company.name.charAt(0)}
        </div>
      </div>

      <div style="margin: 1.5rem 0; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08);">
        <h3 style="font-size: 1.1rem; margin-bottom: 8px;">About The Mission</h3>
        <p style="color: var(--text-muted); line-height: 1.7; font-size: 0.95rem;">
          ${company.about}
        </p>
      </div>

      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.1rem;">Hiring Rounds Pipeline</h3>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-cyan-bright);">${company.rounds.length} Phase Gate</span>
        </div>

        <div class="stepper-pipeline">
          ${company.rounds.map((round, idx) => `
          <div class="step-item ${idx === 0 ? 'active' : ''}">
            <div class="step-marker">${idx + 1}</div>
            <div style="padding-top: 4px;">
              <h4 style="font-size: 0.92rem; color: #fff;">Round ${idx + 1}: ${round}</h4>
              <span style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">
                ${idx === 0 ? 'Diagnostic Screening' : (idx === company.rounds.length - 1 ? 'Final Executive Offer Gate' : 'Technical Evaluation')}
              </span>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 1rem;">
        <a href="${basePath}/jobs/${company.id}" class="btn btn-primary" style="flex: 1;">
          <span class="material-symbols-outlined" style="font-size: 18px;">work</span>
          <span>View Active Openings (${companyJobs.length})</span>
        </a>
      </div>
    </div>

    <!-- Right Summary Column (Col 5) -->
    <div class="card-glass col-5">
      <h3 style="font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
        Trajectory Openings
      </h3>

      ${companyJobs.length === 0 ? `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div class="radar-empty">
          <span class="material-symbols-outlined" style="font-size: 32px; color: var(--accent-cyan-bright);">radar</span>
        </div>
        <h4 style="font-size: 1rem; margin-bottom: 6px;">Zero Openings in this Sector</h4>
        <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 1rem;">
          ${company.name} does not have open trajectories posted at this time.
        </p>
        <a href="${basePath}/jobs/${company.id}" class="btn btn-ghost" style="font-size: 0.8rem;">
          View Empty State Screen →
        </a>
      </div>
      ` : `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${companyJobs.map(job => `
        <div style="background: rgba(9, 13, 28, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <h4 style="font-size: 0.95rem; color: #fff;">${job.role}</h4>
            <span class="badge ${job.status === 'Open' ? 'badge-open' : 'badge-closed'}">
              <span class="badge-dot"></span>
              ${job.status}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">
            <span>Cutoff: ≥${job.minCgpa} CGPA</span>
            <span style="color: var(--accent-cyan-bright); font-weight: 700;">₹${job.package} LPA</span>
          </div>
        </div>`).join('')}

        <a href="${basePath}/jobs/${company.id}" class="btn btn-primary" style="margin-top: 1rem;">
          Inspect All Jobs at ${company.name}
        </a>
      </div>
      `}
    </div>
  </div>`;
}

function renderStudents(students, companies, basePath = '') {
  const placedStudents = students.filter(s => s.placed);
  const unplacedStudents = students.filter(s => !s.placed);

  return `
  <div style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
    <div>
      <div style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 9999px; background: rgba(37, 41, 58, 0.7); border: 1px solid rgba(93, 230, 255, 0.3); margin-bottom: 8px;">
        <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--accent-cyan-bright);"></span>
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan-bright);">CADET FLIGHT DECK</span>
      </div>
      <h1 style="font-size: 2.2rem;">Cadet Leaderboard & Roster</h1>
      <p style="color: var(--text-muted); font-size: 0.95rem;">Demonstrating conditional branches: 2 Placed Cadets vs 2 Seeking Placement.</p>
    </div>

    <div>
      <input type="text" id="telemetrySearch" placeholder="Filter cadet name, branch, skills..." 
             style="background: rgba(9, 13, 28, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 8px 14px; font-family: var(--font-mono); font-size: 0.8rem; color: #fff; width: 280px;" />
    </div>
  </div>

  <!-- PODIUM FOR TOP PLACED STUDENTS -->
  <div style="margin-bottom: 2rem;">
    <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: var(--accent-cyan-bright); display: flex; align-items: center; gap: 8px;">
      <span class="material-symbols-outlined" style="font-size: 18px;">military_tech</span>
      <span>Orbital Apex Tier (Top Placed Vanguard)</span>
    </h3>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
      ${placedStudents.map((s, idx) => {
        const comp = companies.find(c => c.id === s.placedCompanyId);
        return `
        <div class="card-glass-elevated" style="border: 2px solid ${idx === 0 ? 'var(--accent-cyan)' : 'var(--accent-violet)'};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="badge" style="background: rgba(124, 58, 237, 0.3); border: 1px solid #7c3aed; color: #fff;">
              RANK #${idx + 1} APEX
            </span>
            <span class="badge badge-placed">
              <span class="badge-dot"></span>
              OFFER LOCKED
            </span>
          </div>

          <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 1rem;">
            <div style="width: 50px; height: 50px; border-radius: 14px; background: var(--surface-high); border: 1px solid rgba(93, 230, 255, 0.4); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: #fff;">
              ${s.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 style="font-size: 1.2rem; color: #fff;">${s.name}</h4>
              <span style="font-size: 0.78rem; color: var(--text-dim);">${s.branch}</span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: rgba(9, 13, 28, 0.8); padding: 12px; border-radius: 12px; margin-bottom: 1rem;">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase;">Cumulative CGPA</span>
              <span class="telemetry-val" style="font-size: 1.3rem; color: #fff; display: block;">${s.cgpa} / 10</span>
            </div>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase;">Apex Placement</span>
              <span class="telemetry-val" style="font-size: 1.3rem; color: var(--accent-cyan-bright); display: block;">₹${s.package} LPA</span>
              <span style="font-size: 0.72rem; color: var(--text-dim);">${comp ? comp.name : ''}</span>
            </div>
          </div>

          <div>
            ${s.skills.map(sk => `<span class="skill-chip">${sk}</span>`).join('')}
          </div>

          <div style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px;">
            <a href="${basePath}/student/${s.id}" class="btn btn-primary" style="width: 100%; font-size: 0.85rem;">
              Inspect Cadet Master Dossier →
            </a>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>

  <!-- ALL STUDENTS ROSTER GRID -->
  <div>
    <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: #fff;">
      Complete Cadet Cohort (All 4 Verified Records)
    </h3>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem;">
      ${students.map(s => {
        const comp = companies.find(c => c.id === s.placedCompanyId);
        return `
        <div class="card-glass" data-filter-item style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <div>
                <h4 style="font-size: 1.1rem; color: #fff;">${s.name}</h4>
                <span style="font-size: 0.75rem; color: var(--text-dim);">${s.branch}</span>
              </div>
              <span class="badge ${s.placed ? 'badge-placed' : 'badge-not-placed'}">
                <span class="badge-dot"></span>
                ${s.placed ? 'PLACED' : 'SEEKING'}
              </span>
            </div>

            <div style="background: rgba(9, 13, 28, 0.7); border-radius: 10px; padding: 10px; margin: 10px 0;">
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem;">
                <span style="color: var(--text-dim);">CGPA: <strong style="color: #fff;">${s.cgpa}</strong></span>
                <span style="font-weight: 700; color: ${s.placed ? 'var(--status-placed)' : '#f87171'};">
                  ${s.placed ? `₹${s.package} LPA` : 'In Pipeline'}
                </span>
              </div>
              ${s.placed ? `<span style="font-size: 0.72rem; color: var(--accent-cyan-bright); display: block; margin-top: 4px;">Assigned: ${comp ? comp.name : s.placedCompanyId}</span>` : `<span style="font-size: 0.72rem; color: var(--text-dim); display: block; margin-top: 4px;">Open for shortlists</span>`}
            </div>

            <div style="margin-top: 6px;">
              ${s.skills.map(sk => `<span class="skill-chip">${sk}</span>`).join('')}
            </div>
          </div>

          <div style="margin-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px;">
            <a href="${basePath}/student/${s.id}" class="btn btn-ghost" style="width: 100%; font-size: 0.8rem;">
              View Cadet Dossier →
            </a>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function renderStudentDetail(student, company, basePath = '') {
  return `
  <div style="margin-bottom: 1.5rem;">
    <a href="${basePath}/students" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan-bright); display: inline-flex; align-items: center; gap: 6px; margin-bottom: 1rem;">
      <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
      <span>Back to Cadets Flight Deck</span>
    </a>
  </div>

  <div class="bento-grid">
    <!-- Cadet Hero Profile (Col 7) -->
    <div class="card-glass-elevated col-7">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="width: 64px; height: 64px; border-radius: 18px; background: var(--surface-high); border: 2px solid var(--accent-cyan); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: #fff; box-shadow: 0 0 16px rgba(93, 230, 255, 0.35);">
            ${student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h1 style="font-size: 2rem;">${student.name}</h1>
              <span class="badge ${student.placed ? 'badge-placed' : 'badge-not-placed'}">
                <span class="badge-dot"></span>
                ${student.placed ? 'PLACED' : 'SEEKING PLACEMENT'}
              </span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim); display: block; margin-top: 2px;">
              ${student.branch} // CADET ID: ${student.id}
            </span>
          </div>
        </div>
      </div>

      <!-- Conditional Placement Status Box -->
      ${student.placed ? `
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 14px; padding: 1.2rem; margin: 1.2rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--status-placed); font-weight: 700; text-transform: uppercase;">
            ✓ OFFICIAL PLACEMENT CONFIRMED
          </span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fff;">
            Offer Dossier Verified
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span style="font-size: 1.2rem; font-weight: 700; color: #fff; display: block;">
              ${company ? company.name : student.placedCompanyId}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-dim);">Assigned Global Trajectory Dock</span>
          </div>
          <div style="text-align: right;">
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;">ANNUAL VALUATION</span>
            <div class="telemetry-val" style="font-size: 1.8rem; color: var(--accent-cyan-bright); line-height: 1;">
              ₹${student.package} <span style="font-size: 0.9rem;">LPA</span>
            </div>
          </div>
        </div>
      </div>
      ` : `
      <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 14px; padding: 1.2rem; margin: 1.2rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #f87171; font-weight: 700; text-transform: uppercase;">
            ACTIVE FLIGHT SEEKING TRAJECTORY
          </span>
          <span class="badge badge-process">In Assessment Rounds</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
          Cadet is actively interviewing and open for direct campus shortlists. Tech stack matches automated interview vectors.
        </p>
      </div>
      `}

      <!-- Core Technical Competencies -->
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08);">
        <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">Core Technical Competencies</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${student.skills.map((skill, i) => `
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-family: var(--font-mono); margin-bottom: 4px;">
              <span>${skill}</span>
              <span style="color: var(--accent-cyan-bright);">${88 + (i * 3)}% Mastery</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
              <div style="height: 100%; width: ${88 + (i * 3)}%; background: linear-gradient(90deg, var(--accent-violet), var(--accent-cyan)); border-radius: 3px;"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Right Column (Col 5): CGPA Gauge & Academic Record -->
    <div class="card-glass col-5">
      <h3 style="font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
        Academic Velocity Telemetry
      </h3>

      <div style="display: flex; flex-direction: column; align-items: center; margin: 1.5rem 0;">
        <div class="radial-meter" style="width: 160px; height: 160px;">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="transparent" stroke="rgba(255,255,255,0.06)" stroke-width="10"></circle>
            <circle cx="60" cy="60" r="50" fill="transparent" stroke="url(#studentG)" stroke-width="10" stroke-dasharray="314" stroke-dashoffset="${314 - (314 * (student.cgpa / 10))}" stroke-linecap="round"></circle>
            <defs>
              <linearGradient id="studentG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#5DE6FF"></stop>
                <stop offset="100%" stop-color="#7C3AED"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div class="radial-meter-content">
            <span class="telemetry-val" style="font-size: 2.2rem; color: #fff;">${student.cgpa}</span>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-dim);">CUMULATIVE CGPA</span>
          </div>
        </div>
      </div>

      <div style="background: rgba(9, 13, 28, 0.7); border-radius: 12px; padding: 12px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 1rem;">
        <div class="terminal-row">
          <span>Cadet Status:</span>
          <strong style="color: ${student.placed ? 'var(--status-placed)' : 'var(--accent-cyan-bright)'};">
            ${student.placed ? 'Flight Confirmed' : 'Active Seeking'}
          </strong>
        </div>
        <div class="terminal-row">
          <span>Major Wing:</span>
          <span>${student.branch}</span>
        </div>
        <div class="terminal-row">
          <span>Class:</span>
          <span>Batch of 2025</span>
        </div>
      </div>

      <button class="btn btn-ghost" style="width: 100%;" onclick="showToast('Cadet record encrypted & synchronized to orbital archive.')">
        <span class="material-symbols-outlined" style="font-size: 16px;">share</span>
        <span>Share Cadet Verification URL</span>
      </button>
    </div>
  </div>`;
}

function renderJobs(company, companyJobs, basePath = '') {
  return `
  <div style="margin-bottom: 1.5rem;">
    <a href="${basePath}/companies" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan-bright); display: inline-flex; align-items: center; gap: 6px; margin-bottom: 1rem;">
      <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
      <span>Back to Companies</span>
    </a>

    <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
      <div>
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 9999px; background: rgba(37, 41, 58, 0.7); border: 1px solid rgba(93, 230, 255, 0.3); margin-bottom: 8px;">
          <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--accent-cyan-bright);"></span>
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan-bright);">OPPORTUNITY MATRIX</span>
        </div>
        <h1 style="font-size: 2.2rem;">Jobs at ${company.name}</h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Active career trajectories and recruitment gates for ${company.name}.</p>
      </div>

      <div style="display: flex; gap: 8px;">
        <a href="${basePath}/company/${company.id}" class="btn btn-ghost">
          <span>Company Dossier</span>
        </a>
      </div>
    </div>
  </div>

  ${companyJobs.length === 0 ? `
  <!-- EVOCATIVE EMPTY STATE PANEL (Demonstrated on Tesla with 0 jobs) -->
  <div class="card-glass-elevated" style="text-align: center; padding: 3.5rem 1.5rem; max-width: 720px; margin: 2rem auto;">
    <div class="radar-empty">
      <span class="material-symbols-outlined" style="font-size: 40px; color: var(--accent-cyan-bright);">radar</span>
    </div>
    
    <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 9999px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); margin-bottom: 12px;">
      <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--status-closed);"></span>
      <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #f87171; text-transform: uppercase;">
        SECTOR QUIET // ZERO RECRUITMENT VECTORS
      </span>
    </div>

    <h2 style="font-size: 1.8rem; margin-bottom: 10px;">No Active Trajectories Detected in this Sector</h2>
    <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem auto; font-size: 0.95rem; line-height: 1.6;">
      All current placement allocations for <strong>${company.name}</strong> have either completed their admission quota or have not yet entered the orbital recruitment window.
    </p>

    <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
      <button class="btn btn-primary" onclick="showToast('Automated Radar Ping enabled for ${company.name}!')">
        <span class="material-symbols-outlined" style="font-size: 18px;">notifications_active</span>
        <span>Configure Radar Alert 🔔</span>
      </button>
      <a href="${basePath}/companies" class="btn btn-ghost">
        <span>View All Companies</span>
      </a>
    </div>
  </div>
  ` : `
  <!-- LIST OF JOBS -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem;">
    ${companyJobs.map(job => `
    <div class="card-glass" style="display: flex; flex-direction: column; justify-content: space-between; border-color: ${job.status === 'Open' ? 'rgba(93, 230, 255, 0.25)' : 'rgba(255,255,255,0.08)'};">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
          <span class="badge ${job.status === 'Open' ? 'badge-open' : 'badge-closed'}">
            <span class="badge-dot"></span>
            ${job.status}
          </span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">
            Deadline: ${job.deadline}
          </span>
        </div>

        <h3 style="font-size: 1.25rem; margin-bottom: 6px; color: #fff;">${job.role}</h3>
        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-cyan-bright); display: block; margin-bottom: 12px;">
          Type: ${job.type} • Min CGPA: ≥${job.minCgpa}
        </span>

        <div style="background: rgba(9, 13, 28, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px; margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;">Compensation</span>
            <div class="telemetry-val" style="font-size: 1.5rem; color: var(--accent-cyan-bright);">
              ₹${job.package} <span style="font-size: 0.8rem;">LPA</span>
            </div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem;">
        ${job.status === 'Open' ? `
        <button class="btn btn-primary" style="width: 100%;" onclick="showToast('Application submitted for ${job.role}!')">
          <span class="material-symbols-outlined" style="font-size: 18px;">rocket_launch</span>
          <span>Apply Trajectory</span>
        </button>
        ` : `
        <button class="btn btn-ghost" style="width: 100%; opacity: 0.6; cursor: not-allowed;" disabled>
          <span>Applications Closed</span>
        </button>
        `}
      </div>
    </div>`).join('')}
  </div>
  `}
  `;
}

function render404(requestedUrl, basePath = '') {
  return `
  <div style="text-align: center; max-width: 780px; margin: 1rem auto 3rem auto;">
    <div style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 14px; border-radius: 9999px; background: rgba(200, 26, 66, 0.2); border: 1px solid rgba(200, 26, 66, 0.4); margin-bottom: 1.2rem;">
      <span style="width: 8px; height: 8px; border-radius: 50%; background: #f43f5e;" class="pulse-neon"></span>
      <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #ffb2b7; letter-spacing: 0.08em; text-transform: uppercase;">
        ERR_TRAJECTORY_SECTOR_NOT_FOUND // VECTOR ANOMALY
      </span>
    </div>

    <h1 class="glitch-title">404 // LOST IN ORBIT</h1>
    
    <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; margin: 1.2rem auto 2rem auto; max-width: 580px;">
      Cadet, your telemetry signal drifted outside charted mission coordinates. The route <code style="color: var(--accent-cyan-bright); font-family: var(--font-mono);">${requestedUrl}</code> has fallen into a quantum gravity well or does not exist in this sector.
    </p>

    <!-- Levitating Astronaut Illustration & Portal -->
    <div style="position: relative; width: 220px; height: 220px; margin: 0 auto 2rem auto; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; inset: 0; border-radius: 50%; border: 1px solid rgba(93, 230, 255, 0.3);" class="pulse-neon"></div>
      <div style="position: absolute; inset: 15px; border-radius: 50%; border: 1px dashed rgba(124, 58, 237, 0.4);"></div>
      <div style="position: absolute; inset: 30px; border-radius: 50%; background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(9, 13, 28, 0.9) 70%);"></div>
      
      <div class="astro-float" style="position: relative; z-index: 2;">
        <span class="material-symbols-outlined" style="font-size: 72px; color: var(--accent-cyan-bright); text-shadow: 0 0 20px #5de6ff;">
          astro_space_center
        </span>
      </div>
    </div>

    <!-- Diagnostic Daemon Box -->
    <div class="terminal-box" style="text-align: left; max-width: 540px; margin: 0 auto 2rem auto;">
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 8px;">
        <span>DIAGNOSTIC_DAEMON_v4.1</span>
        <span style="color: var(--accent-cyan-bright);">BEACON: TRANSLATING</span>
      </div>
      <div class="terminal-row">
        <span>REQUESTED_URL:</span>
        <strong style="color: #fff;">${requestedUrl}</strong>
      </div>
      <div class="terminal-row">
        <span>HTTP_CODE:</span>
        <strong style="color: #f43f5e;">404 (UNREACHABLE_SECTOR)</strong>
      </div>
      <div class="terminal-row">
        <span>STATUS:</span>
        <span style="color: var(--accent-cyan-bright);">FAILSAFE_ROUTER_ACTIVE</span>
      </div>
    </div>

    <!-- Recovery Actions -->
    <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
      <a href="${basePath}/" class="btn btn-primary">
        <span class="material-symbols-outlined" style="font-size: 18px;">rocket_launch</span>
        <span>Return to Base (Home)</span>
      </a>
      <a href="${basePath}/companies" class="btn btn-ghost">
        <span>Companies Hub</span>
      </a>
      <a href="${basePath}/students" class="btn btn-ghost">
        <span>Cadet Leaderboard</span>
      </a>
    </div>
  </div>`;
}

module.exports = {
  renderLayout,
  renderHome,
  renderCompanies,
  renderCompanyDetail,
  renderStudents,
  renderStudentDetail,
  renderJobs,
  render404
};
