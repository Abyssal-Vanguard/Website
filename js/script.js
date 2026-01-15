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
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// We use event delegation here (document body) or re-query for new pages
const images = document.querySelectorAll('.gallery-item img');

images.forEach(image => {
    image.addEventListener('click', e => {
        lightbox.classList.add('active');
        const img = document.createElement('img');
        img.src = image.src;
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
    });
});

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return; 
    lightbox.classList.remove('active');
});

/* =========================================
   4. Typewriter Effect (Hero)
   ========================================= */
const heroText = document.getElementById('typewriter-text');
if (heroText) {
    const originalText = heroText.innerText;
    heroText.innerText = ''; 
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroText.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 30); 
        }
    }
    setTimeout(typeWriter, 500);
}

/* =========================================
   5. Gallery Filtering (NEW)
   ========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    item.classList.add('show'); // Ensure animation triggers
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });
}