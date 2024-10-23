const apiUrl = 'https://671886367fc4c5ff8f49d021.mockapi.io/contact';

const userForm = document.getElementById('contact') as HTMLFormElement;
const form = document.getElementById('form') as HTMLDivElement;

userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    
    const Name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const contact = (document.getElementById('contactno') as HTMLInputElement).value.trim();
    const subject = (document.getElementById('subject') as HTMLInputElement).value.trim();
    const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();

    // Check for empty fields
    if (!Name || !email || !contact|| !Subject || !message) {
        displayFeedback('All fields must be filled out.', 'error');
        return;
    }

    // Validate the email address format
    if (!validateEmail(email)) {
        displayFeedback('Please enter a valid email format.', 'error');
        return;
    }

    // Validate phone number length
    if (contact.length !== 10 || isNaN(Number(contact))) {
        displayFeedback('The phone number should contain exactly 10 digits.', 'error');
        return;
    }

    const payload = {
        name: Name,
        email: email,
        contact: contact,
        subject: subject,
        message: message,
    };

    try {
        const apiResult = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (apiResult.ok) {
            displayFeedback('Your message has been sent successfully!', 'success');
            userForm.reset(); 
        } else {
            displayFeedback('Submission failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Submission error:', error);
        displayFeedback('Submission failed. Please try again.', 'error');
    }
});

// Function to validate email format
function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show feedback messages to the user
function displayFeedback(message: string, status: 'success' | 'error') {
    form.textContent = message;
    form.style.color = status === 'success' ? 'green' : 'red';
}
