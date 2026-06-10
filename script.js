document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Preloader Sequence Execution
    const preloaderTimeline = gsap.timeline({
        onComplete: () => {
            document.querySelector('.preloader').style.display = 'none';
            // Start AOS sequence after preloader exits
            AOS.init({
                duration: 1000,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                once: true,
                mirror: false
            });
        }
    });

    preloaderTimeline.to(".preloader-bar span", {
        width: "100%",
        duration: 1.4,
        ease: "power2.inOut"
    });
    preloaderTimeline.to(".preloader-content", {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
    });
    preloaderTimeline.to(".preloader", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut"
    });

    // 3. System Custom Cursor Logic
    const cursor = document.querySelector(".custom-cursor");
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    const standardInteractives = document.querySelectorAll("a, button, .premium-service-card, .why-card, select, input, textarea");
    standardInteractives.forEach(item => {
        item.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
        item.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
    });

    // 4. ParticlesJS Structural Mesh Initialization
    if (document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#2563EB" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.15, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#2563EB", "opacity": 0.08, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.2 } } }
            },
            "retina_detect": true
        });
    }

    // 5. TypedJS Presentation Automation
    if (document.getElementById("typed-element")) {
        new Typed("#typed-element", {
            strings: [
                "Full Stack Web Developer",
            "Laravel & PHP Specialist",
            "Shopify & Ecommerce Developer",
            "WordPress Development Expert",
            "SEO & Performance Optimization",
            "Custom Web Application Builder",
            "Android Application Developer",
            "Business Process Automation Specialist",
            "API Integration & Backend Systems",
            "Scalable Solutions for Growing Businesses"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: "|"
        });
    }

    // 6. GSAP Skill Bars Trigger Configuration
    gsap.registerPlugin(ScrollTrigger);
    const skillProgressBars = document.querySelectorAll(".progress-bar-fill");
    
    if (skillProgressBars.length > 0) {
        gsap.to(skillProgressBars, {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            width: function(index, target) {
                return target.getAttribute("data-progress");
            },
            duration: 1.5,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            stagger: 0.05
        });
    }

    // 7. Core Counter Integration via IntersectionObserver
    const counterSection = document.getElementById("counter-section");
    if (counterSection) {
        const counterValues = document.querySelectorAll(".counter-value");
        const countUpObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counterValues.forEach(counter => {
                        const target = parseInt(counter.getAttribute("data-target"), 10);
                        const duration = 2000; 
                        const startTime = performance.now();

                        function updateCount(currentTime) {
                            const elapsedTime = currentTime - startTime;
                            const progress = Math.min(elapsedTime / duration, 1);
                            // Ease out quad formula
                            const easeProgress = progress * (2 - progress);
                            const currentVal = Math.floor(easeProgress * target);
                            
                            counter.innerText = currentVal;

                            if (progress < 1) {
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        }
                        requestAnimationFrame(updateCount);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        countUpObserver.observe(counterSection);
    }

    // 8. Magnetic Force Interactivity Layout
    const magneticButtons = document.querySelectorAll(".magnetic-button");
    magneticButtons.forEach(btn => {
        btn.addEventListener("mousemove", function (e) {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            gsap.to(btn, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener("mouseleave", function () {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 9. Global SwiperJS Initialization Configuration
    new Swiper(".testimonials-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 }
        }
    });

    // 10. Contact Interception Pipeline Verification
    const targetForm = document.getElementById("portfolioContactForm");
    if (targetForm) {
        targetForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Secure transmission simulated successfully. Thank you for connecting, Kim Cleeve Bermillo will respond shortly.");
            targetForm.reset();
        });
    }
});