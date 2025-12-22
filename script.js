// Nitank Website Clone - Interactive JavaScript

// ========== Mobile Menu Toggle ==========
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Sticky Header on Scroll ==========
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========== Active Navigation Link ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========== Form Validation ==========
const contactForm = document.querySelector('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        const errorElements = this.querySelectorAll('.form-error');
        errorElements.forEach(el => el.style.display = 'none');
        
        const formControls = this.querySelectorAll('.form-control');
        formControls.forEach(el => el.classList.remove('error'));
        
        let isValid = true;
        
        // Validate name
        const name = this.querySelector('#name');
        if (name && name.value.trim() === '') {
            showError(name, 'שם מלא הוא שדה חובה');
            isValid = false;
        } else if (name && name.value.trim().length < 2) {
            showError(name, 'שם חייב להכיל לפחות 2 תווים');
            isValid = false;
        }
        
        // Validate email
        const email = this.querySelector('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && email.value.trim() === '') {
            showError(email, 'אימייל הוא שדה חובה');
            isValid = false;
        } else if (email && !emailRegex.test(email.value)) {
            showError(email, 'כתובת אימייל לא תקינה');
            isValid = false;
        }
        
        // Validate phone
        const phone = this.querySelector('#phone');
        const phoneRegex = /^[0-9]{9,10}$/;
        if (phone && phone.value.trim() === '') {
            showError(phone, 'טלפון הוא שדה חובה');
            isValid = false;
        } else if (phone && !phoneRegex.test(phone.value.replace(/[\s-]/g, ''))) {
            showError(phone, 'מספר טלפון לא תקין');
            isValid = false;
        }
        
        // Validate message
        const message = this.querySelector('#message');
        if (message && message.value.trim() === '') {
            showError(message, 'הודעה היא שדה חובה');
            isValid = false;
        } else if (message && message.value.trim().length < 10) {
            showError(message, 'הודעה חייבת להכיל לפחות 10 תווים');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            this.reset();
        }
    });
}

function showError(input, message) {
    input.classList.add('error');
    const errorElement = input.parentElement.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <div class="notification-content">
            <strong>הודעה נשלחה בהצלחה!</strong>
            <p>נחזור אליך בהקדם האפשרי</p>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ========== Intersection Observer for Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .service-item');
    animatedElements.forEach(el => observer.observe(el));
});

// ========== Back to Top Button ==========
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'חזור למעלה');
    
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #003d7a;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = '#005eb8';
        button.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = '#003d7a';
        button.style.transform = 'translateY(0)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
};

// Create back to top button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBackToTopButton);
} else {
    createBackToTopButton();
}

// ========== Add CSS for Animations ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ========== Newsletter Form ==========
const newsletterForm = document.querySelector('#newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            alert('אנא הזן כתובת אימייל');
            return;
        }
        
        if (!emailRegex.test(email)) {
            alert('אנא הזן כתובת אימייל תקינה');
            return;
        }
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <strong>תודה על ההרשמה!</strong>
            <p>נשלח לך עדכונים ומבצעים מיוחדים</p>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        this.reset();
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    });
}

// ========== Initialize Everything ==========
console.log('Nitank Website Initialized Successfully');
