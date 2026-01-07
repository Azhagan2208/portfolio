// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
        navMenu.classList.remove('active');
    });
}

// Form validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Check if fields are empty
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields!');
        return;
    }

    // Check if email is valid
    if (!email.includes('@')) {
        alert('Please enter a valid email address!');
        return;
    }

    // Prepare button for loading state
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerText;
    btn.innerText = 'Sending...';

    // Formspree Configuration
    // REPLACE 'YOUR_FORM_ID' WITH YOUR ACTUAL FORMSPREE FORM ID (e.g., https://formspree.io/f/xyzaqwer)
    const formspreeEndpoint = 'https://formspree.io/f/xaqngzlw';

    // Prepare form data
    const formData = new FormData(contactForm);

    // Custom Alert Function
    function showAlert(message, type) {
        const alertBox = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        const alertIcon = document.getElementById('alert-icon');
        const closeBtn = document.getElementById('alert-close');

        alertMessage.textContent = message;

        // Reset icon classes
        alertIcon.className = 'fas';

        if (type === 'success') {
            alertIcon.classList.add('fa-check-circle', 'success');
        } else {
            alertIcon.classList.add('fa-exclamation-circle', 'error');
        }

        alertBox.classList.add('show');

        // Auto hide after 5 seconds
        const timer = setTimeout(() => {
            alertBox.classList.remove('show');
        }, 5000);

        closeBtn.onclick = () => {
            alertBox.classList.remove('show');
            clearTimeout(timer);
        };
    }

    // Send the form using fetch (AJAX)
    fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            btn.innerText = originalBtnText;
            showAlert('Thank you! Your message has been sent.', 'success');
            contactForm.reset();
        } else {
            return response.json().then(data => {
                btn.innerText = originalBtnText;
                if (Object.hasOwn(data, 'errors')) {
                    showAlert(data["errors"].map(error => error["message"]).join(", "), 'error');
                } else {
                    showAlert('Oops! There was a problem submitting your form', 'error');
                }
            });
        }
    }).catch(error => {
        btn.innerText = originalBtnText;
        showAlert('Oops! There was a problem submitting your form', 'error');
    });
});


/* Particle Animation - Circuit Board Data Flow */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class CircuitParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Small dots
        this.speed = Math.random() * 2 + 1; // Constant speed

        // Randomly start moving horizontal or vertical
        if (Math.random() > 0.5) {
            this.speedX = Math.random() > 0.5 ? this.speed : -this.speed;
            this.speedY = 0;
        } else {
            this.speedX = 0;
            this.speedY = Math.random() > 0.5 ? this.speed : -this.speed;
        }

        this.color = 'rgba(255, 255, 255, 0.5)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Change direction randomly (1% chance per frame) to simulate circuit paths
        if (Math.random() < 0.02) {
            if (this.speedX !== 0) {
                // Currently horizontal, switch to vertical
                this.speedX = 0;
                this.speedY = Math.random() > 0.5 ? this.speed : -this.speed;
            } else {
                // Currently vertical, switch to horizontal
                this.speedY = 0;
                this.speedX = Math.random() > 0.5 ? this.speed : -this.speed;
            }
        }

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        this.draw();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new CircuitParticle());
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Trail effect: instead of clearing completely, draw a semi-transparent rectangle
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'; // Adjust opacity for trail length
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Optional: Draw grid lines or connections? 
    // For now, let's keep it clean as just moving data packets.

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();

/* Navbar Scroll Effect */
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
