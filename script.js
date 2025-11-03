// Typewriter Effect
const texts = [
    "A Passionate & Creative Web Developer",
    "Building Beautiful Digital Experiences",
    "Turning Ideas Into Reality"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    const typewriterElement = document.getElementById('typewriter');

    if (!isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500);
            return;
        }
    }

    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

window.addEventListener('load', typeWriter);

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    const toggleBtn = document.querySelector('.theme-toggle');

    html.setAttribute('data-theme', newTheme);
    toggleBtn.textContent = newTheme === 'light' ? '🌙' : '🌞';
}

// About Avatar Image Toggling - RESTORED
const avatar = document.getElementById('aboutAvatar');
const imgs = avatar.querySelectorAll('.avatar-img');
let showingFirst = true;

// Automatically toggle between images every 4 seconds
setInterval(() => {
    showingFirst = !showingFirst;
    imgs.forEach(img => img.classList.remove('visible'));
    imgs[showingFirst ? 0 : 1].classList.add('visible');
}, 4000);

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Journey Timeline Items Animation on Scroll
const journeyObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Grow the timeline as items become visible
            const timeline = document.querySelector('.journey-timeline');
            const allItems = document.querySelectorAll('.journey-item');
            const visibleItems = document.querySelectorAll('.journey-item.visible');
            const lastVisibleItem = visibleItems[visibleItems.length - 1];

            if (lastVisibleItem) {
                const itemOffset = lastVisibleItem.offsetTop + lastVisibleItem.offsetHeight / 2;
                const timelineHeight = (itemOffset / timeline.offsetHeight) * 100;
                timeline.style.setProperty('--timeline-height', `${timelineHeight}%`);
            }
        }
    });
}, journeyObserverOptions);

// Observe each journey item individually
document.querySelectorAll('.journey-item').forEach(el => {
    journeyObserver.observe(el);
});

// Dynamic timeline growth based on scroll
function updateTimelineHeight() {
    const timeline = document.querySelector('.journey-timeline');
    const timelineRect = timeline.getBoundingClientRect();
    const items = document.querySelectorAll('.journey-item');

    let lastVisibleIndex = -1;
    items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemMiddle = rect.top + rect.height / 2;

        if (itemMiddle < window.innerHeight * 0.7) {
            lastVisibleIndex = index;
        }
    });

    if (lastVisibleIndex >= 0) {
        const lastItem = items[lastVisibleIndex];
        const itemTop = lastItem.offsetTop;
        const itemHeight = lastItem.offsetHeight;
        const targetHeight = itemTop + itemHeight / 2;

        timeline.style.setProperty('--timeline-progress', `${targetHeight}px`);
    }
}

window.addEventListener('scroll', updateTimelineHeight);
window.addEventListener('load', updateTimelineHeight);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Effects on Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Modal Functions
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const video = document.getElementById('projectVideo');
    const source = video.querySelector('source');

    const projectData = {
        project1: {
            title: "Smart Car Parking System - Live Demo",
            description: "A smart parking management system that automates vehicle entry, space allocation, and payment tracking with real-time monitoring.",
            technologies: ["React", "WebSocket", "Node.js", "CSS Animations"],
            video: "videos/parking_system.mp4"
        },
        project2: {
            title: " Library Management System - Live Demo",
            description: "A digital library solution that manages book records, user accounts, and borrowing activities efficiently with automated tracking.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
            video: "videos/LMS.mp4"
        },
        project3: {
            title: "Assignment & Attendance Management System - Live Demo",
            description: "A web-based tool that helps students and teachers manage assignments, track attendance, and monitor academic progress seamlessly.",
            technologies: ["D3.js", "Chart.js", "JavaScript", "HTML", "CSS"],
            video: "videos/attendance_tracker.mp4"
        }
    };

    modalTitle.textContent = projectData[projectId].title;
    modalDescription.textContent = projectData[projectId].description;

    // Display technologies used
    modalTech.innerHTML = `<strong>Technologies Used:</strong> ${projectData[projectId].technologies.join(', ')}`;

    // Update video
    source.src = projectData[projectId].video;
    video.load();
    video.play();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}


function closeModal() {
    const modal = document.getElementById('projectModal');
    const video = document.getElementById('projectVideo');
    video.pause();
    video.currentTime = 0; // reset video
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form Submission
function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon!`);
    e.target.reset();
}

// ===== FAST LOADING OPTIMIZATIONS =====

// Image loading optimization
function optimizeImageLoading() {
    // Add loaded class to images when they're loaded
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            // Fallback in case load event doesn't fire
            setTimeout(() => {
                if (!img.classList.contains('loaded') && img.complete) {
                    img.classList.add('loaded');
                }
            }, 1000);
        }
    });
}

// Video loading optimization
function optimizeVideoLoading() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Set video to load metadata only for faster initial load
        video.preload = 'metadata';
        
        // Load full video when it's near the viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    // Switch to auto preload when video is visible
                    video.preload = 'auto';
                    observer.unobserve(video);
                }
            });
        }, { rootMargin: '100px' });
        
        observer.observe(video);
    });
}

// Initialize all optimizations when page loads
window.addEventListener('load', function() {
    optimizeImageLoading();
    optimizeVideoLoading();
});

// Console Easter Egg
console.log('%c🚀 Welcome to my Portfolio!', 'font-size: 24px; color: #ff8906; font-weight: bold;');
console.log('%c💼 Looking for a developer? Let\'s connect!', 'font-size: 16px; color: #f25f4c;');