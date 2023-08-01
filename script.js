const steps = document.querySelectorAll(".step");
const progressBar = document.querySelector(".progress");

let currentStep = 0;

function showStep(stepNumber) {
    steps.forEach((step) => {
        step.classList.add("hidden");
    });
    steps[stepNumber].classList.remove("hidden");
}

function updateProgressBar(stepNumber) {
    const progressWidth = ((stepNumber + 1) / steps.length) * 100;
    progressBar.style.width = `${progressWidth}%`;
}

document.addEventListener("DOMContentLoaded", () => {
    const nextButtons = document.querySelectorAll("[data-next]");
    nextButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            currentStep = parseInt(button.dataset.next) - 1;
            showStep(currentStep);
            updateProgressBar(currentStep);
        });
    });
});
