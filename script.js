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




/* Navbar Scroll Effect */
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
