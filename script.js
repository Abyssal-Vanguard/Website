/* =========================================
   1. Mobile Navigation Menu
   ========================================= */
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if(menuToggle && navList){
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

/* =========================================
   2. Scroll Animations (Fade In)
   ========================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/* =========================================
   3. Image Lightbox (Popup)
   ========================================= */
// Create lightbox if it doesn't exist
let lightbox = document.getElementById('lightbox');
if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
}

const images = document.querySelectorAll('.gallery-item img');

images.forEach(image => {
    image.addEventListener('click', e => {
        lightbox.classList.add('active');
        const img = document.createElement('img');
        img.src = image.src;

        // Clear previous image
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
    });
});

// Close lightbox on click
lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return; 
    lightbox.classList.remove('active');
});

/* =========================================
   4. Random Typewriter Effect (Full Version)
   ========================================= */
const heroText = document.getElementById('typewriter-text');

if (heroText) {
    // 1. Get the page type (default to 'home')
    const pageType = heroText.getAttribute('data-page') || 'home';

    // 2. The Text Bank
    const messages = {
        'home': [
            "Whether you need a water-cooled gaming beast, enterprise IT consulting, or hardware repair, we build the future you need.",
            "Experience gaming like never before. High FPS, low temperatures, and aesthetic perfection.",
            "Don't just play the game. Dominate it with a custom Abyssal Vanguard rig.",
            "Your dream PC is just one click away. Expertly built, rigorously tested."
        ],
        'services': [
            "Transparent pricing. No hidden fees. Maximum performance.",
            "From simple upgrades to complex repairs, we treat your PC like our own.",
            "Expert diagnostics. Professional assembly. The service you deserve.",
            "High-end performance doesn't have to come with a high-end headache."
        ],
        'builds': [
            "Check out our latest creations. Filter by category below.",
            "Engineering meets Art. Browse our gallery of custom machines.",
            "Inspiration for your next rig starts here. Welcome to the Armory.",
            "Clean cables. Cold loops. High frames. See the Abyssal difference."
        ]
    };

    // 3. Fallback and Select
    let textOptions = messages[pageType];
    if (!textOptions) textOptions = messages['home'];

    const originalText = textOptions[Math.floor(Math.random() * textOptions.length)];

    // 4. Start Typing
    heroText.innerText = ''; 
    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            heroText.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 30); // Speed: 30ms per letter
        }
    }

    setTimeout(typeWriter, 500);
}

/* =========================================
   5. Gallery Filtering (Builds Page)
   ========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Highlight active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Show/Hide items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    item.classList.add('show'); 
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });
}

/* =========================================
   6. RGB Theme Switcher
   ========================================= */
const themeBtns = document.querySelectorAll('.theme-btn');

// Check if user has a saved color preference
const savedColor = localStorage.getItem('abyssalTheme');
if (savedColor) {
    document.documentElement.style.setProperty('--primary', savedColor);
}

if (themeBtns.length > 0) {
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');

            // 1. Change the variable instantly
            document.documentElement.style.setProperty('--primary', color);

            // 2. Save to local storage so it remembers next time
            localStorage.setItem('abyssalTheme', color);

            // 3. Add a cool flash effect
            document.body.style.transition = "background-color 0.1s";
            setTimeout(() => { document.body.style.transition = "background-color 0.3s"; }, 100);
        });
    });
}

/* =========================================
   7. FAQ Accordion Logic
   ========================================= */
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Option: Close others when one opens (Accordion style)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current
            item.classList.toggle('active');
        });
    });
}