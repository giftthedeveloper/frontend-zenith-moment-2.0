const testimoniesList = document.getElementById('testimoniesList');
const addTestimonyButton = document.getElementById('addTestimony');
const testimonyDialog = document.getElementById('testimonyDialog');
const closeDialogButton = document.getElementById('closeDialog');
const testimonyForm = document.getElementById('testimonyForm');

// Fetch testimonies from the API
async function fetchTestimoniesFromApi() {
    const url = 'http://127.0.0.1:3000/testimony';
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
    
}


// Function to add a new testimony
async function addTestimony(name, comment, eventYear, isAnonymous) {
    const url = 'http://127.0.0.1:3000/testimony/create';
    const data = {
        name: name,
        testimony: comment,
        event_edition: eventYear,
        is_anonymous: isAnonymous,
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

// Add a new testimony card to the list
async function addTestimonyCard(name, comment, eventYear, isAnonymous) {

    try {
        // Add the new testimony
        const isAdded = await addTestimony(name, comment, eventYear, isAnonymous);
    
        if (isAdded) {
            testimoniesList.innerHTML = '';
            testimonies = await fetchTestimoniesFromApi();
            testimonies.forEach((testimony) => {
                const card = document.createElement('div');
                card.className = 'bg-white rounded-lg shadow-md p-4';
                card.innerHTML = `
                <h2 class="text-lg font-semibold text-gold">${testimony.display_name}</h2>
                <p> ${testimony.testimony}</p>
                <p>${testimony.event_edition}</p>
            `;
                testimoniesList.appendChild(card);
            });
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while adding the testimony.');
    }

    }

// Function to open the testimony dialog
function openTestimonyDialog() {
    console.log('The testimony dialog is being opened.');
    testimonyDialog.style.display = 'block';
}

// Function to close the testimony dialog
function closeTestimonyDialog() {
    testimonyDialog.style.display = 'none';
}

// Executed when the page loads
window.onload = async () => {
    testimoniesList.innerHTML = '';
    const testimonies = await fetchTestimoniesFromApi();
    testimonies.forEach((testimony) => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4';
        card.innerHTML = `
        <h2 class="text-lg font-semibold" style="color: #d0992e;">${testimony.display_name}</h2>
        <p style="color: #29303a;"> ${testimony.testimony}</p>
        <p style="color: #a8a9ad; opacity: 1.0;">${testimony.event_edition}</p>
    `;
        testimoniesList.appendChild(card);
    });
};

addTestimonyButton.addEventListener('click', () => {
    openTestimonyDialog();
});

closeDialogButton.addEventListener('click', () => {
    closeTestimonyDialog();
});

testimonyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const eventYear = document.getElementById('eventYear').value;
    const isAnonymous = document.getElementById('anonymous').checked;

    if (name && comment && eventYear) {
        addTestimonyCard(name, comment, eventYear, isAnonymous);
        closeTestimonyDialog();
    } else {
        alert('Invalid input. Please provide valid values.');
    }
});
