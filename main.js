// Navigation
function navigateTo(page) {
    window.location.href = page;
}

// Login handling
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    // Here you would typically make an API call to verify credentials
    console.log('Login attempt:', { email, password });
    
    // For demonstration, redirect to dashboard
    navigateTo('dashboard.html');
}

// Business registration
function handleBusinessRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Here you would typically make an API call to register the business
    console.log('Business registration:', data);
    
    // Redirect to login page
    navigateTo('login.html');
}

// Worker registration
function handleWorkerRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Here you would typically make an API call to register the worker
    console.log('Worker registration:', data);
    
    // Redirect to login page
    navigateTo('login.html');
}

// Dashboard functions
function loadDashboardData() {
    // Here you would typically make an API call to get dashboard data
    const mockData = {
        activeJobs: 14,
        applications: 5,
        notifications: 3
    };
    
    updateDashboard(mockData);
}

function updateDashboard(data) {
    const activeJobs = document.getElementById('activeJobs');
    if (activeJobs) {
        activeJobs.textContent = `Active Jobs: ${data.activeJobs}`;
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('dashboard')) {
        loadDashboardData();
    }
});

// Worker registration handling
function handleWorkerRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Get file data
    const portfolioFile = document.getElementById('portfolioUpload').files[0];
    if (portfolioFile) {
        formData.append('portfolio', portfolioFile);
    }

    // Create worker data object
    const workerData = {
        name: formData.get('name'),
        skills: formData.get('skills'),
        location: formData.get('location'),
        email: formData.get('email'),
        portfolio: portfolioFile ? portfolioFile.name : ''
    };

    // Here you would typically make an API call to register the worker
    console.log('Worker registration data:', workerData);

    // Simulate API call with setTimeout
    simulateRegistration(workerData, form);
}

function simulateRegistration(data, form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Registering...';
    submitButton.disabled = true;

    setTimeout(() => {
        // Simulate successful registration
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Show success message
        showMessage('Registration successful! Redirecting to login...', 'success');

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            navigateTo('login.html');
        }, 2000);
    }, 1500);
}

// Message handling
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    
    // Add to page
    const container = document.querySelector('.container');
    container.appendChild(messageDiv);
    messageDiv.style.display = 'block';
}

// File upload preview
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('portfolioUpload');
    const fileLabel = document.querySelector('.file-label');

    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            fileLabel.textContent = fileName || 'Upload Portfolio';
        });
    }
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showInputError(input, 'This field is required');
        } else {
            clearInputError(input);
        }
    });

    return isValid;
}

function showInputError(input, message) {
    input.classList.add('invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-text';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    input.classList.remove('invalid');
    const errorDiv = input.parentNode.querySelector('.error-text');
    if (errorDiv) {
        errorDiv.remove();
    }
}

document.getElementById('businessForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const inputs = this.querySelectorAll('input, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.required && !input.value) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (isValid) {
        // Here you would typically send the form data to your server
        alert('Registration submitted successfully!');
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

// File upload preview (if needed)
document.getElementById('uploadLogo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        this.value = '';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Update date and time dynamically
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");

    function updateDateTime() {
        const now = new Date();
        dateElement.textContent = now.toLocaleDateString();
        timeElement.textContent = now.toLocaleTimeString();
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function handleLogin(event) {
    event.preventDefault();
    // Redirect to dashboard on successful login
    window.location.href = "dashboard.html";
}

function handleLogout() {
    window.location.href = "index.html";
}

// Dummy functions for dashboard buttons
function viewActiveJobs() { alert("Viewing Active Jobs"); }
function viewApplications() { alert("Viewing Active Applications"); }
function addJob() { alert("Adding a New Job"); }
function viewEmployees() { alert("Viewing Employees Details"); }
function viewJobHistory() { alert("Viewing Job History"); }
function viewNotifications() { alert("Viewing Notifications"); }

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('profilePreview').src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function saveProfilePicture() {
    alert("Profile picture updated successfully!");
    window.location.href = "dashboard.html";
}

function goBack() {
    window.location.href = "dashboard.html";
}