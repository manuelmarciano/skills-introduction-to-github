document.getElementById('year').textContent = new Date().getFullYear();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
);

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
filters.forEach(btn => {
    btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        projects.forEach(p => {
            const show = cat === 'all' || p.dataset.cat === cat;
            p.classList.toggle('hidden', !show);
        });
    });
});

const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.nombre || !data.email) {
        formMsg.style.color = '#a04040';
        formMsg.textContent = 'Por favor completá nombre y email.';
        return;
    }
    formMsg.style.color = '';
    formMsg.textContent = `¡Gracias, ${data.nombre.split(' ')[0]}! Te respondemos en menos de 24 hs.`;
    form.reset();
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            en.target.style.opacity = '1';
            en.target.style.transform = 'translateY(0)';
            observer.unobserve(en.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .project, .testimonials blockquote, .section-head').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});
