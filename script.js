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

  // Add event listener for the 'Next' button in each step
  steps.forEach((step, index) => {
    const nextButtons = step.querySelectorAll('[data-action="next"]');
    nextButtons.forEach(nextButton => {
      nextButton.addEventListener('click', () => {
        hideErrors();
        const currentStep = parseInt(step.dataset.step); // Parse as an integer
        const nextStep = parseInt(nextButton.dataset.next); // Parse as an integer

        if (index === steps.length - 1) {
          // If on the last step, submit the form
          form.submit();
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
});
