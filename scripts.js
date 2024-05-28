document.addEventListener("DOMContentLoaded", function() {
    // Function to handle intersection
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1
    });

    // Target all elements with the 'observed' class
    const targets = document.querySelectorAll('.observed');
    targets.forEach(target => observer.observe(target));

    // Dynamic typing effect
    const dynamicText = document.getElementById('dynamic-text');
    const header = document.getElementById('header');

    const phrases = ["more efficient", "safer", "more affordable"];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = "";
    let isDeleting = false;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function typeText() {
        const fullPhrase = phrases[phraseIndex];

        if (isDeleting) {
            currentPhrase = fullPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            currentPhrase = fullPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        dynamicText.textContent = currentPhrase;

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && currentPhrase === fullPhrase) {
            currentSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && currentPhrase === "") {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentSpeed = typingSpeed;
        }

        setTimeout(typeText, currentSpeed);
    }

    typeText();

    window.addEventListener('scroll', function() {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        if (window.scrollY > heroHeight - header.offsetHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});
