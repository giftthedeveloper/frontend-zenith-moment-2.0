// testimony_script.js

const testimoniesList = document.getElementById('testimoniesList');
const addTestimonyButton = document.getElementById('addTestimony');
const testimonyDialog = document.getElementById('testimonyDialog');
const closeDialogButton = document.getElementById('closeDialog');
const testimonyForm = document.getElementById('testimonyForm');

// Function to add a new testimony card to the list
function addTestimonyCard(name, comment, eventYear, isAnonymous) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md p-4';
    card.innerHTML = `
        <h2 class="text-lg font-semibold text-gold">${name} ${isAnonymous ? '(Anonymous)' : ''}</h2>
        <p>Comment: ${comment}</p>
        <p>Event Year: ${eventYear}</p>
    `;
    testimoniesList.appendChild(card);
}

// Function to open the testimony dialog
function openTestimonyDialog() {
    testimonyDialog.style.display = 'block';
}

// Function to close the testimony dialog
function closeTestimonyDialog() {
    testimonyDialog.style.display = 'none';
}

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
