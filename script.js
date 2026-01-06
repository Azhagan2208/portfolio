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

    // Show success message
    alert('Thank you! Your message has been sent.');
    contactForm.reset();
});

