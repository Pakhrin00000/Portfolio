/* ==================== MENU SHOW Y HIDDEN ==================== */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* ===== MENU SHOW ===== */
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* ===== MENU HIDDEN ===== */
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* ==================== REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* ==================== CHANGE BACKGROUND HEADER ==================== */
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* ==================== DARK LIGHT THEME ==================== */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme' // We use data-theme attribute instead, but keeping class for potential utility
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.documentElement.getAttribute('data-theme')

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.documentElement.setAttribute('data-theme', selectedTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme)

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', newTheme)
})

/* ==================== MIXITUP FILTER PORTFOLIO ==================== */
const filterItems = document.querySelectorAll('.projects__item')
const portfolioItems = document.querySelectorAll('.project__card')

if (filterItems.length > 0) {
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            // Active filter class
            filterItems.forEach(i => i.classList.remove('active-work'))
            item.classList.add('active-work')

            const filterValue = item.getAttribute('data-filter')

            portfolioItems.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue.substring(1))) {
                    card.classList.remove('hide-project')
                    card.classList.add('show-project')
                } else {
                    card.classList.remove('show-project')
                    card.classList.add('hide-project')
                }
            })
        })
    })
}

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

/* ==================== TYPEWRITER EFFECT ==================== */
const typeWriterElement = document.querySelector('.home__title-wrapper');
const textToType = "Sujan Pakhrin";
let i = 0;
let isPaused = false;
let typeInterval;

function typeWriter() {
    if (isPaused) return;

    if (i < textToType.length) {
        typeWriterElement.textContent += textToType.charAt(i);
        i++;
    } else {
        // Loop: Clear and restart after a pause
        setTimeout(() => {
            if (!isPaused) {
                typeWriterElement.textContent = '';
                i = 0;
            }
        }, 2000); // Wait 2 seconds before restarting
    }
}

// Start Typing
typeInterval = setInterval(typeWriter, 150); // Speed: 150ms per letter

// Interaction: Pause on Hover/Click
typeWriterElement.addEventListener('mouseenter', () => {
    isPaused = true;
});

typeWriterElement.addEventListener('click', () => {
    isPaused = !isPaused; // Toggle pause on click
});

typeWriterElement.addEventListener('mouseleave', () => {
    isPaused = false; // Resume on mouse leave
});
