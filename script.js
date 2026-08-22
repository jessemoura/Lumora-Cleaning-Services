// Add scroll event listener for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger-menu');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        mobileMenu.style.display = 'block';
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    }
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Gallery Carousel Logic
const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if(track && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        const itemWidth = track.querySelector('img').clientWidth + 20; // width + gap
        track.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const itemWidth = track.querySelector('img').clientWidth + 20;
        track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });
}

// Cookie Banner Logic
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');

if (cookieBanner && acceptCookiesBtn) {
    // Check if user already accepted cookies
    if (!localStorage.getItem('lumoraCookiesAccepted')) {
        // Show banner after 1 second
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Handle accept button click
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('lumoraCookiesAccepted', 'true');
        cookieBanner.classList.remove('show');
    });
}

// Hero Slider Logic
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');

if (heroSlides.length > 0) {
    let currentHeroSlide = 0;
    let heroAutoPlayInterval;

    const showHeroSlide = (index) => {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));

        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentHeroSlide = index;
    };

    const nextHeroSlide = () => {
        let newIndex = currentHeroSlide + 1;
        if (newIndex >= heroSlides.length) newIndex = 0;
        showHeroSlide(newIndex);
        resetHeroInterval();
    };

    const prevHeroSlide = () => {
        let newIndex = currentHeroSlide - 1;
        if (newIndex < 0) newIndex = heroSlides.length - 1;
        showHeroSlide(newIndex);
        resetHeroInterval();
    };

    const resetHeroInterval = () => {
        clearInterval(heroAutoPlayInterval);
        heroAutoPlayInterval = setInterval(nextHeroSlide, 5000);
    };

    // Event Listeners
    if (heroPrev) heroPrev.addEventListener('click', prevHeroSlide);
    if (heroNext) heroNext.addEventListener('click', nextHeroSlide);

    heroDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-slide'));
            showHeroSlide(index);
            resetHeroInterval();
        });
    });

    // Start Auto Play
    heroAutoPlayInterval = setInterval(nextHeroSlide, 5000);
}
