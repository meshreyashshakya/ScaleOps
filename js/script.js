// ── Fade-Up Scroll Animation ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

// ── Mobile Nav Menu ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

if (hamburger && mobileNav) {
  // Toggle open/close when hamburger is tapped
  hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));

  // Close button (X) inside the menu
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  }

  // Close when any nav link inside the mobile menu is tapped
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  // Close when tapping outside the menu
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
}

window.closeMobileNav = function() {
  if (mobileNav) mobileNav.classList.remove('open');
};

// ── Nav Bar Sticky Background ──
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(248, 250, 252, 0.98)'
      : 'rgba(248, 250, 252, 0.8)';
  });
}

// ── Contact Form Handling ──
window.handleSubmit = async function(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form[0].value,
    email: form[1].value,
    business: form[2].value,
    revenue: form[3].value,
    problem: form[4].value,
  };

 await fetch('https://hook.eu1.make.com/nf688nna35jwn84gdebuof0y06xbhkxz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
  form.reset();
};

// ── Smooth Scroll for Anchors ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Interactive AI Chat Simulator ──
document.addEventListener('DOMContentLoaded', () => {
  const chatBody = document.querySelector('.chat-body');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');

  if (!chatBody || !chatInput || !sendBtn) return;

  const responses = {
    pricing: "We build tailored lead structures. Our systems typically pay for themselves within 2 weeks by recovering missed leads. Would you like a customized quote on a quick call?",
    cost: "We build tailored lead structures. Our systems typically pay for themselves within 2 weeks by recovering missed leads. Would you like a customized quote on a quick call?",
    work: "We set up a 24/7 AI lead engine, high-converting pages, and content systems in 48-72 hours. Everything links directly to your CRM. Shall we discuss details?",
    fit: "We scale agencies, coaching brands, e-commerce, and high-ticket service operations. If you have traffic but struggle with quick follow-ups, we are a perfect fit!",
    who: "We are sentiop. We build end-to-end AI client acquisition systems that scale businesses and book calls automatically. No manual effort required.",
    demo: "You are talking to the demo right now! Our AI replies in under 3 seconds, qualifies leads, and drops booking links. We can launch this for your business in 48h."
  };

  function appendMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = `msg ${isUser ? 'user' : 'bot'}`;
    msg.style.opacity = '1';
    msg.style.animation = 'none'; // skip initial delay animation
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, true);
    chatInput.value = '';

    // Show typing state
    const typing = document.createElement('div');
    typing.className = 'msg bot typing-indicator';
    typing.style.opacity = '1';
    typing.style.color = 'var(--muted)';
    typing.textContent = 'sentiop AI is typing...';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate AI thinking and response
    setTimeout(() => {
      typing.remove();
      const lower = text.toLowerCase();
      let reply = "That's exactly why we build these systems. The AI handles qualifying and booking, responding in under 60 seconds to secure the client. Should we set up a 15-min demo call?";

      if (lower.includes('pricing') || lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
        reply = responses.pricing;
      } else if (lower.includes('how does') || lower.includes('work')) {
        reply = responses.work;
      } else if (lower.includes('fit') || lower.includes('niche') || lower.includes('who is')) {
        reply = responses.fit;
      } else if (lower.includes('demo') || lower.includes('action')) {
        reply = responses.demo;
      }

      appendMessage(reply, false);
    }, 1200);
  }

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});

// ── ROI Calculator Interactivity ──
document.addEventListener('DOMContentLoaded', () => {
  const calcLeads = document.getElementById('calcLeads');
  const calcValue = document.getElementById('calcValue');
  const calcLeadsVal = document.getElementById('calcLeadsVal');
  const calcValueVal = document.getElementById('calcValueVal');
  const calcLeakedRevenue = document.getElementById('calcLeakedRevenue');
  const calcCapturedRevenue = document.getElementById('calcCapturedRevenue');

  if (!calcLeads || !calcValue || !calcLeadsVal || !calcValueVal || !calcLeakedRevenue || !calcCapturedRevenue) return;

  function calculateROI() {
    const leads = parseInt(calcLeads.value, 10);
    const value = parseInt(calcValue.value, 10);

    // Update slider label values
    calcLeadsVal.textContent = leads.toLocaleString();
    calcValueVal.textContent = `$${value.toLocaleString()}`;

    // Math:
    // With slow response times, close rates hover around 3-5%.
    // Responding in <60s boosts response and qualification, lifting close rates by an average of 10% (from 5% to 15%).
    // Monthly Leaked Revenue (lost opportunity) = leads * 10% opportunity * deal value
    const monthlyLeaked = Math.round(leads * 0.10 * value);
    // Captured Annual Revenue = Monthly Leaked * 12
    const annualCaptured = monthlyLeaked * 12;

    // Display with animation/counting effect
    calcLeakedRevenue.textContent = `$${monthlyLeaked.toLocaleString()}`;
    calcCapturedRevenue.textContent = `$${annualCaptured.toLocaleString()}`;
  }

  // Bind events
  calcLeads.addEventListener('input', calculateROI);
  calcValue.addEventListener('input', calculateROI);

  // Initial run
  calculateROI();
});

// ── Particle Canvas Background (Antigravity Style) ──
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  // Track mouse for interactions
  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
    }
    update() {
      // Bounce off edges
      if (this.x > width || this.x < 0) this.vx = -this.vx;
      if (this.y > height || this.y < 0) this.vy = -this.vy;
      
      this.x += this.vx;
      this.y += this.vy;

      // Mouse collision/reaction
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          // Slight repulsion and attraction feel
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          // Soft push away
          this.x -= forceDirectionX * force * 2;
          this.y -= forceDirectionY * force * 2;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(13, 148, 136, 0.4)';
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    const numParticles = Math.floor((width * height) / 7500); // Increased density
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      // Connect close particles
      for (let j = i; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 110) {
          ctx.beginPath();
          // Increased base opacity and stroke width for better visibility
          ctx.strokeStyle = `rgba(13, 148, 136, ${0.4 - distance / 110 * 0.4})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  init();
  animate();
});

// ── Interactive Video Showcase & Cursor Tracking ──
document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.getElementById('videoContainer');
  const customCursor = document.getElementById('customPlayCursor');
  const videoModal = document.getElementById('videoModal');
  const modalCloseBtn = document.getElementById('videoModalCloseBtn');
  const modalCloseBg = document.getElementById('videoModalCloseBg');

  if (videoContainer && customCursor) {
    // Track mouse inside the container
    videoContainer.addEventListener('mousemove', (e) => {
      const rect = videoContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Use CSS transform for smooth moving
      customCursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(1)`;
    });

    // Enter container -> show cursor
    videoContainer.addEventListener('mouseenter', () => {
      customCursor.classList.add('active');
    });

    // Leave container -> hide cursor
    videoContainer.addEventListener('mouseleave', () => {
      customCursor.classList.remove('active');
      customCursor.style.transform = `translate(-50%, -50%) scale(0.5)`;
    });

    // Click container -> open modal
    videoContainer.addEventListener('click', () => {
      videoModal.classList.add('open');
      document.body.style.overflow = 'hidden'; // prevent bg scroll
    });
  }

  function closeModal() {
    if (videoModal) {
      videoModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseBg) modalCloseBg.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
