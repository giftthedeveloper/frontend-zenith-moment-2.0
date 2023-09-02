const fetch = require('fetch');

// Function to fetch all testimonies
async function fetchAllTestimonies() {
    const url = '127.0.0.1:3000/testimony';
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

// Function to add a new testimony
async function addTestimony(name, comment, eventYear, isAnonymous) {
    const url = '127.0.0.1:3000/testimony';
    const data = {
        name: name,
        comment: comment,
        eventYear: eventYear,
        isAnonymous: isAnonymous,
    };
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const statusCode = response.status;

    if (statusCode === 200) {
        return true;
    } else {
        return false;
    }
}