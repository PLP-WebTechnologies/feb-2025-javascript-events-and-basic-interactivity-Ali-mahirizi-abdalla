// DOM Elements
const clickMeBtn = document.getElementById('click-me');
const hoverArea = document.getElementById('hover-area');
const keyInput = document.getElementById('key-input');
const keyOutput = document.getElementById('key-output');
const secretBox = document.getElementById('secret-box');
const themeToggle = document.getElementById('theme-toggle');
const galleryImages = document.querySelectorAll('.gallery-viewer img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const signupForm = document.getElementById('signup-form');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Current slide index for gallery
let currentSlide = 0;

// Initialize the page
function init() {
    // Show first gallery image
    showSlide(currentSlide);
    
    // Set up event listeners
    setupEventListeners();
}

// Set up all event listeners
function setupEventListeners() {
    // Event Handling
    clickMeBtn.addEventListener('click', handleClick);
    hoverArea.addEventListener('mouseenter', handleMouseEnter);
    hoverArea.addEventListener('mouseleave', handleMouseLeave);
    keyInput.addEventListener('input', handleKeyInput);
    secretBox.addEventListener('dblclick', handleSecret);
    
    // Interactive Components
    themeToggle.addEventListener('click', toggleDarkMode);
    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);
    tabButtons.forEach(btn => {
        btn.addEventListener('click', switchTab);
    });
    
    // Form Validation
    signupForm.addEventListener('submit', validateForm);
    fullnameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
}

// Event Handlers
function handleClick() {
    this.textContent = 'Clicked!';
    this.style.backgroundColor = '#fbbc05';
    
    setTimeout(() => {
        this.textContent = 'Click Me';
        this.style.backgroundColor = '';
    }, 1000);
}

function handleMouseEnter() {
    this.textContent = 'Hello there!';
    this.style.transform = 'scale(1.05)';
}

function handleMouseLeave() {
    this.textContent = 'Hover Over Me';
    this.style.transform = '';
}

function handleKeyInput() {
    keyOutput.textContent = this.value || 'Start typing...';
    
    // Change color based on length
    const length = this.value.length;
    if (length > 20) {
        keyOutput.style.color = '#ea4335';
    } else if (length > 10) {
        keyOutput.style.color = '#fbbc05';
    } else {
        keyOutput.style.color = '';
    }
}

function handleSecret() {
    this.textContent = '✨ You found the secret! ✨';
    this.style.backgroundColor = '#673ab7';
    
    // Create confetti effect
    createConfetti(this);
}

// Interactive Components
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') 
        ? 'Toggle Light Mode' 
        : 'Toggle Dark Mode';
}

function showSlide(index) {
    galleryImages.forEach(img => img.classList.remove('active'));
    galleryImages[index].classList.add('active');
    currentSlide = index;
}

function showPrevSlide() {
    currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
    showSlide(currentSlide);
}

function showNextSlide() {
    currentSlide = (currentSlide + 1) % galleryImages.length;
    showSlide(currentSlide);
}

function switchTab() {
    const tabId = this.dataset.tab;
    
    // Update active tab button
    tabButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    // Show corresponding content
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// Form Validation
function validateForm(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isNameValid && isEmailValid && isPasswordValid) {
        alert('Form submitted successfully!');
        signupForm.reset();
        clearAllErrors();
    }
}

function validateName() {
    const errorElement = fullnameInput.nextElementSibling;
    
    if (fullnameInput.value.trim() === '') {
        showError(fullnameInput, errorElement, 'Name is required');
        return false;
    } else {
        clearError(fullnameInput, errorElement);
        return true;
    }
}

function validateEmail() {
    const errorElement = emailInput.nextElementSibling;
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError(emailInput, errorElement, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, errorElement, 'Please enter a valid email');
        return false;
    } else {
        clearError(emailInput, errorElement);
        return true;
    }
}

function validatePassword() {
    const errorElement = passwordInput.nextElementSibling;
    
    if (passwordInput.value.length < 8) {
        showError(passwordInput, errorElement, 'Password must be at least 8 characters');
        return false;
    } else {
        clearError(passwordInput, errorElement);
        return true;
    }
}

// Helper Functions
function showError(input, errorElement, message) {
    input.style.borderColor = '#ea4335';
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(input, errorElement) {
    input.style.borderColor = '';
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function clearAllErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    document.querySelectorAll('.form-group input').forEach(input => {
        input.style.borderColor = '';
    });
}

function createConfetti(element) {
    const colors = ['#4285f4', '#34a853', '#ea4335', '#fbbc05', '#673ab7'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animation = `fall ${Math.random() * 1 + 0.5}s linear forwards`;
            
            element.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 1500);
        }, i * 50);
    }
}

// Initialize the application
init();