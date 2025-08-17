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
    
    // Gallery Slider
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryDots = document.querySelectorAll('#gallerySliderDots .dot');
    const galleryPrevBtn = document.getElementById('galleryPrevBtn');
    const galleryNextBtn = document.getElementById('galleryNextBtn');
    let currentGallerySlide = 0;
    
    // Function to show a specific gallery slide
    function showGallerySlide(index) {
        // Hide all slides
        gallerySlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        galleryDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate corresponding dot
        gallerySlides[index].classList.add('active');
        galleryDots[index].classList.add('active');
        
        // Update current slide index
        currentGallerySlide = index;
    }
    
    // Initialize gallery slider
    if (gallerySlides.length > 0) {
        showGallerySlide(0);
        
        // Event listeners for next and previous buttons
        if (galleryNextBtn) {
            galleryNextBtn.addEventListener('click', function() {
                currentGallerySlide = (currentGallerySlide + 1) % gallerySlides.length;
                showGallerySlide(currentGallerySlide);
            });
        }
        
        if (galleryPrevBtn) {
            galleryPrevBtn.addEventListener('click', function() {
                currentGallerySlide = (currentGallerySlide - 1 + gallerySlides.length) % gallerySlides.length;
                showGallerySlide(currentGallerySlide);
            });
        }
        
        // Event listeners for dots
        galleryDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showGallerySlide(index);
            });
        });
        
        // Auto slide every 4 seconds
        setInterval(function() {
            currentGallerySlide = (currentGallerySlide + 1) % gallerySlides.length;
            showGallerySlide(currentGallerySlide);
        }, 4000);
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