// Particle animation (snow / floating dots)
(function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const PARTICLE_COUNT = 80;
    const MAX_SPEED = 0.3;
    const MIN_SPEED = 0.1;
    const PARTICLE_SIZE = 2.5;

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * PARTICLE_SIZE + 1,
                speedY: Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
                speedX: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.4 + 0.1,
            });
        }
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 230, 255, ${p.opacity})`; // brighter particles
            ctx.fill();
        }
    }

    function updateParticles() {
        for (let p of particles) {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y > height + p.radius) {
                p.y = -p.radius;
                p.x = Math.random() * width;
            }
            if (p.x > width + p.radius) p.x = -p.radius;
            if (p.x < -p.radius) p.x = width + p.radius;
        }
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    resizeCanvas();
    animate();
})();

// Scroll animation using Intersection Observer
(function() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: keep visible after first trigger
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px' // trigger a bit before section enters
    });

    sections.forEach(section => observer.observe(section));

    // Also ensure hero is visible immediately on load (it will get class later if needed)
    // But we want hero to be visible without waiting for scroll.
    document.querySelector('.hero').classList.add('visible');
})();

// Mailto form (no action needed, but we keep the placeholder)
(function() {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // mailto behavior is default
        });
    }
})();