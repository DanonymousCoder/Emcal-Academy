JavaScript (script.js)
const signupForm = document.getElementById('signup-form');
const signupLink = document.getElementById('signup-link');


signupLink.addEventListener('click', () => {
    signupForm.classList.remove('hidden');
});

