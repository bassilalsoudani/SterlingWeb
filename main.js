document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }

    // 2. Scroll Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element comes into view
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve if you only want the animation to happen once (recommended)
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Form Submission Handler with Async Fetch
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const originalBtnText = submitBtn.innerHTML;

            // Loading State
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin" style="animation: spin 1s linear infinite;">progress_activity</span> <span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80');

            formMessage.className = 'text-sm font-bold text-center mt-4 text-slate-500';
            formMessage.innerText = 'Sending your request...';
            formMessage.classList.remove('hidden');

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        formMessage.className = 'text-sm font-bold text-center mt-4 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200';
                        formMessage.innerText = 'Success! Your project inquiry has been sent. We will be in touch shortly.';
                        contactForm.reset();
                    } else {
                        return response.json().then(data => {
                            throw new Error(data.message || 'Error occurred while sending');
                        });
                    }
                })
                .catch(error => {
                    formMessage.className = 'text-sm font-bold text-center mt-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200';
                    formMessage.innerText = 'Oops! There was a problem submitting your form. Please try again.';
                    console.error('Form Submit Error:', error);
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-80');
                });
        });
    }
});
