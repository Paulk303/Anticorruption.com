// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to scroll to report section
function scrollToReport() {
    document.querySelector('#report').scrollIntoView({
        behavior: 'smooth'
    });
}

// Handle report form submission
const reportForm = document.getElementById('reportForm');
reportForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        incidentType: document.getElementById('incidentType').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
        evidence: document.getElementById('evidence').files
    };

    // Generate a random case ID (in a real application, this would come from the backend)
    const caseId = 'CASE-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Show success message
    alert(`Thank you for your report. Your case ID is: ${caseId}\nPlease save this ID to track your case status.`);
    
    // Reset form
    reportForm.reset();
});

// Track case status
function trackCase() {
    const caseId = document.getElementById('caseId').value;
    const caseStatus = document.getElementById('caseStatus');
    
    if (!caseId) {
        caseStatus.innerHTML = '<p class="error">Please enter a case ID</p>';
        return;
    }

    // Simulate case status (in a real application, this would fetch from a backend)
    const statuses = [
        'Under Review',
        'Investigation Ongoing',
        'Additional Information Required',
        'Referred to Authorities',
        'Resolved'
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date().toLocaleDateString();
    
    caseStatus.innerHTML = `
        <div class="status-card">
            <h3>Case Status: ${caseId}</h3>
            <p>Current Status: ${randomStatus}</p>
            <p>Last Updated: ${date}</p>
        </div>
    `;
}

// Add smooth reveal animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

// Observe all sections
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Handle file upload preview
document.getElementById('evidence').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    const fileNames = files.map(file => file.name).join(', ');
    
    if (files.length > 0) {
        this.parentElement.setAttribute('data-files', `Selected files: ${fileNames}`);
    } else {
        this.parentElement.removeAttribute('data-files');
    }
});

// Handle RTI form submission
const rtiForm = document.getElementById('rtiForm');
rtiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        authority: document.getElementById('authority').value,
        department: document.getElementById('department').value,
        subject: document.getElementById('rtiSubject').value,
        details: document.getElementById('rtiDetails').value,
        timeFrom: document.getElementById('rtiFrom').value,
        timeTo: document.getElementById('rtiTo').value,
        applicant: {
            name: document.getElementById('applicantName').value,
            address: document.getElementById('applicantAddress').value,
            phone: document.getElementById('applicantPhone').value,
            email: document.getElementById('applicantEmail').value
        },
        payment: document.querySelector('input[name="payment"]:checked').value
    };

    // Generate RTI application number
    const rtiNumber = 'RTI-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Show success message with payment instructions
    const paymentMethod = formData.payment === 'upi' ? 'UPI ID: rti@upi' : 'Bank Account: RTI-123456789';
    
    alert(`RTI Application submitted successfully!\n\nYour RTI Number: ${rtiNumber}\n\nPlease complete the payment using:\n${paymentMethod}\n\nAmount: ₹10\n\nYour application will be processed after payment confirmation.`);
    
    // Reset form
    rtiForm.reset();
});

// Update department options based on selected authority
document.getElementById('authority').addEventListener('change', function(e) {
    const department = document.getElementById('department');
    department.value = ''; // Reset department value
    
    // In a real application, you would fetch departments based on the selected authority
    switch(e.target.value) {
        case 'central':
            department.placeholder = 'Enter Central Government Department';
            break;
        case 'state':
            department.placeholder = 'Enter State Government Department';
            break;
        case 'local':
            department.placeholder = 'Enter Local Body Name';
            break;
        default:
            department.placeholder = 'Enter Department Name';
    }
});

// Set minimum date for RTI period
const today = new Date().toISOString().split('T')[0];
document.getElementById('rtiFrom').setAttribute('max', today);
document.getElementById('rtiTo').setAttribute('max', today);

document.getElementById('rtiFrom').addEventListener('change', function(e) {
    document.getElementById('rtiTo').setAttribute('min', e.target.value);
});
