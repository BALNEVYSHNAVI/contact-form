"use strict";

const apiEndpoint = 'https://671886367fc4c5ff8f49d021.mockapi.io/contact';
const contactForm = document.getElementById('contact');
const feedbackElement = document.getElementById('form');


contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    
    const userName = document.getElementById('name').value.trim();
    const userEmail = document.getElementById('email').value.trim();
    const userPhone = document.getElementById('contactno').value.trim();
    const emailSubject = document.getElementById('subject').value.trim();
    const userMessage = document.getElementById('message').value.trim();

    
    if (!userName || !userEmail || !userPhone || !emailSubject || !userMessage) {
        showFeedback('Please fill in all fields.', 'error');
        return;
    }

    if (!isEmailFormatValid(userEmail)) {
        showFeedback('The email address you entered is not valid.', 'error');
        return;
    }

    if (userPhone.length !== 10 || isNaN(Number(userPhone))) {
        showFeedback('The phone number must contain exactly 10 digits.', 'error');
        return;
    }

  
    const formData = {
        name: userName,
        email: userEmail,
        contact: userPhone,
        subject: emailSubject,
        message: userMessage,
    };

    try {
        
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        
        if (response.ok) {
            showFeedback('Your form is submitted successfully!', 'success');
            contactForm.reset();
        } else {
            showFeedback('Something went wrong. Please try again later.', 'error');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        showFeedback('Submission failed. Please try again.', 'error');
    }
});

// Function to validate email format
function isEmailFormatValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to display feedback messages
function showFeedback(message, type) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = type === 'success' ? 'green' : 'red';
}
