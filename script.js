// Wait for DOM to fully load
// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
    
    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Logo click to scroll to top
    const logoImg = document.getElementById('logoImg');
    if (logoImg) {
        logoImg.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add cursor pointer style
        logoImg.style.cursor = 'pointer';
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navList.classList.remove('active');
            }
        });
    });
    
    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle active class on content
            content.classList.toggle('active');
            
            // Toggle icon
            if (content.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
            
            // Close other accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector('i');
                    
                    otherContent.classList.remove('active');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
        });
    });
    
    // Testimonials Slider Functionality
    const slider = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;

    // Function to show specific slide with smooth transition
    function showSlide(index) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Ensure index is within bounds
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Hide all slides with fade out effect
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.zIndex = i === index ? '2' : '1';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide with fade in effect
        setTimeout(() => {
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            currentSlide = index;
            
            // Allow next transition after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 800); // Match CSS transition duration
        }, 50);
    }

    // Function to go to next slide
    function nextSlide() {
        if (isTransitioning) return;
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        if (isTransitioning) return;
        const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(prevIndex);
    }

    // Function to start auto-play with longer duration for better viewing
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    // Function to stop auto-play
    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentSlide !== index && !isTransitioning) {
                stopAutoPlay();
                showSlide(index);
                // Restart auto-play after user interaction
                setTimeout(() => {
                    startAutoPlay();
                }, 6000); // Wait 6 seconds before restarting auto-play
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            setTimeout(startAutoPlay, 6000);
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            setTimeout(startAutoPlay, 6000);
        }
    });

    // Pause auto-play on hover with better timing
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            // Restart auto-play after mouse leaves
            setTimeout(() => {
                if (!slideInterval) {
                    startAutoPlay();
                }
            }, 1000); // Wait 1 second before restarting
        });
    }

    // Initialize slider with proper setup
    if (slides.length > 0) {
        // Ensure all slides are hidden initially
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            slide.style.zIndex = index === 0 ? '2' : '1';
        });
        
        // Show first slide
        setTimeout(() => {
            showSlide(0);
            startAutoPlay();
        }, 100);
    }
    
    // No form submission code needed as forms have been removed
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const reviewImages = document.querySelectorAll('.review-image');
    
    let currentImageIndex = 0;
    let isZoomed = false;
    
    // Open lightbox when clicking on review images
    reviewImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(img.src, img.alt);
        });
    });
    
    function openLightbox(src, alt) {
        // Calculate scrollbar width to prevent page width changes
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightbox.classList.add('active');
        
        // Prevent body scroll while maintaining page width
        document.body.classList.add('lightbox-open');
        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = scrollbarWidth + 'px';
        
        isZoomed = false;
        lightboxImage.classList.remove('zoomed');
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        
        // Restore body scroll and remove padding
        document.body.classList.remove('lightbox-open');
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';
        
        isZoomed = false;
        lightboxImage.classList.remove('zoomed');
    }
    
    // Close lightbox events
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Zoom functionality
    if (lightboxImage) {
        lightboxImage.addEventListener('click', () => {
            isZoomed = !isZoomed;
            lightboxImage.classList.toggle('zoomed', isZoomed);
        });
    }
    
    // Navigation functionality
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + reviewImages.length) % reviewImages.length;
            const prevImg = reviewImages[currentImageIndex];
            lightboxImage.src = prevImg.src;
            lightboxImage.alt = prevImg.alt;
            isZoomed = false;
            lightboxImage.classList.remove('zoomed');
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % reviewImages.length;
            const nextImg = reviewImages[currentImageIndex];
            lightboxImage.src = nextImg.src;
            lightboxImage.alt = nextImg.alt;
            isZoomed = false;
            lightboxImage.classList.remove('zoomed');
        });
    }
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                if (lightboxPrev) lightboxPrev.click();
                break;
            case 'ArrowRight':
                if (lightboxNext) lightboxNext.click();
                break;
            case ' ':
                e.preventDefault();
                if (lightboxImage) lightboxImage.click();
                break;
        }
    });
    
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 150; // Offset for better detection
        let activeSection = null;
        
        // Check hero section first
        const heroSection = document.querySelector('.hero');
        if (heroSection && scrollPosition < heroSection.offsetTop + heroSection.offsetHeight) {
            activeSection = 'hero';
        } else {
            // Check other sections
            document.querySelectorAll('section[id]').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    activeSection = sectionId;
                }
            });
        }
        
        // Update navigation active states
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.classList.remove('active');
            
            if (activeSection === 'hero' && link.getAttribute('href') === '#') {
                link.classList.add('active');
            } else if (activeSection && link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Initialize active state on page load
    const initialScrollPosition = window.scrollY + 150;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && initialScrollPosition < heroSection.offsetTop + heroSection.offsetHeight) {
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
    }
});