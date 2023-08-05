// Function to show a step by its data-step value
function showStep(stepNumber) {
  const steps = document.querySelectorAll('.step');
  steps.forEach(step => step.classList.add('hidden'));
  document.querySelector(`[data-step="${stepNumber}"]`).classList.remove('hidden');
  updateProgressBar(stepNumber);
}

// Function to show error message for a specific input field
function showError(errorId) {
  const errorDiv = document.getElementById(errorId);
  errorDiv.classList.remove('hidden');
}

// Function to hide all error messages
function hideErrors() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => error.classList.add('hidden'));
}

// Function to check if all required fields in the current step are filled and valid
function validateStep(step) {
  const inputs = step.querySelectorAll('input, select');
  let isValid = true;

  inputs.forEach(input => {
    if (input.hasAttribute('required') && input.value.trim() === '') {
      const errorMessageId = input.getAttribute('data-error-message');
      showError(errorMessageId);
      isValid = false;
    }

    if (input.id === 'phonenumber') {
      const phoneNumberValue = input.value.trim();
      const phoneNumberRegex = /^\d{10}$/; // Regular expression to match exactly 10 digits

      if (phoneNumberValue === '' || !phoneNumberRegex.test(phoneNumberValue)) {
        const errorMessageId = input.getAttribute('data-error-message');
        showError(errorMessageId);
        isValid = false;
      }
    }
  });

  return isValid;
}

// Function to update the progress bar
function updateProgressBar(currentStep) {
  const totalSteps = document.querySelectorAll('.step').length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  const progressBar = document.querySelector('.progress');
  progressBar.style.width = `${progressPercentage}%`;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const steps = document.querySelectorAll('.step');

  // Function to send the form data to the API endpoint
 // Function to send the form data to the API endpoint
  function submitForm(data) {
  fetch('http://127.0.0.1:3000/users/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 201) {
        // Show the "Thank You" step after successful form submission
        showStep(9);
      } else {
        // If the response status is not 201, show the "Registration Unsuccessful" step
        showStep(10);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // If there's an error, show the "Registration Unsuccessful" step
      showStep(10);
    });
}


  // Add event listener for the 'Next' button in each step
  steps.forEach((step, index) => {
    const nextButtons = step.querySelectorAll('[data-action="next"]');
    nextButtons.forEach(nextButton => {
      nextButton.addEventListener('click', () => {
        hideErrors();
        const currentStep = parseInt(step.dataset.step); // Parse as an integer
        const nextStep = parseInt(nextButton.dataset.next); // Parse as an integer

        // Validate the current step before proceeding to the next step
        if (!validateStep(step)) {
          return; // Stop the function here if validation fails
        }

        if (index === steps.length - 1) {
          // If on the last step, submit the form
          handleFormSubmit();
        } else {
          if (currentStep === 6) {
            // Special handling for step 6 (Volunteer)
            const volunteerSelection = document.getElementById('volunteer').value;
            if (volunteerSelection === 'Yes') {
              showStep(7); // Show the department selection step
              return; // Stop the function here to prevent showing the next step automatically
            } else {
              // If the user chooses not to be a volunteer, skip to step 8 (Expectations step)
              showStep(8);
              return; // Stop the function here to prevent showing the next step automatically
            }
          } else if (currentStep === 7) {
            // Special handling for step 7 (Department)
            const departmentSelection = document.getElementById('department').value;
            if (departmentSelection === '') {
              showError('departmentError'); // Show error message if no department is selected
              return; // Stop the function here to prevent proceeding to the next step
            }
          }

          // For other steps or when handling "No" for volunteering, proceed to the next step
          showStep(nextStep);
        }
      });
    });
  });

  // Add event listener for the form submit button
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.addEventListener('click', event => {
    event.preventDefault();
    handleFormSubmit();
  });

  // Function to handle form submission
  function handleFormSubmit() {
    const formData = {
      fullName: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phonenumber: document.getElementById('phonenumber').value,
      gender: document.getElementById('gender').value,
      pickup_point: document.getElementById('pickup').value,
      expected_arrival_date: document.getElementById('arrival').value,
      is_volunteer: document.getElementById('volunteer').value === 'Yes',
      expectations: document.getElementById('expectations').value,
    };

    submitForm(formData);
  }

  // Function to reset the form and show the first step again
  function resetForm() {
    const form = document.getElementById('registrationForm');
    form.reset();
    showStep(0); // Show the first step
  }

  // Add event listener for the "Register Again" button in the "Thank You" step
  const registerAgainButton = document.querySelector('[data-action="reset"]');
  registerAgainButton.addEventListener('click', () => {
    resetForm();
  });
});
