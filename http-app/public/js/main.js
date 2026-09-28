// PlacementOrbit — Vanilla JavaScript Micro-Interactions
document.addEventListener('DOMContentLoaded', () => {
  // 1. 3D Card Hover Tilt Effect
  const cards = document.querySelectorAll('.card-glass, .card-glass-elevated');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 2. Count-up Animation for Numeric Telemetry Values
  function animateCounter(el, start, end, duration, decimals = 0, prefix = '', suffix = '') {
    if (!el) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const val = (progress * (end - start) + start);
      el.textContent = prefix + (decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString()) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const statCounters = document.querySelectorAll('[data-counter]');
  statCounters.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const decimals = parseInt(el.getAttribute('data-decimals') || '0');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    animateCounter(el, target * 0.3, target, 1200, decimals, prefix, suffix);
  });

  // 3. Client-Side Instant Search Filter (for students and companies lists)
  const searchInput = document.querySelector('#telemetrySearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filterItems = document.querySelectorAll('[data-filter-item]');
      filterItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 4. Quick Notification Toast
  window.showToast = function(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 60px;
      right: 24px;
      z-index: 100;
      background: rgba(9, 13, 28, 0.95);
      border: 1px solid #5de6ff;
      box-shadow: 0 0 16px rgba(93, 230, 255, 0.3);
      color: #fff;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 10px 16px;
      border-radius: 8px;
      animation: pulse-neon 2s infinite ease-in-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  };
});
