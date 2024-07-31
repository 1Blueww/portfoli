document.addEventListener('DOMContentLoaded', (event) => {
    googleTranslateElementInit();
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en'
    }, 'google_translate_element');
}

document.querySelector('button[title="Send"]').addEventListener('click', (event) => {
    event.preventDefault();
    sendForm();
});

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function sendForm() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    const name = formData.get('full-name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://example.com/send-email', true); // Change to your backend URL
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('Your message has been sent successfully.');
            form.reset();
        } else if (xhr.readyState === 4) {
            alert('An error occurred while sending your message. Please try again later.');
        }
    };
    xhr.send(JSON.stringify({ name, email, message }));
}