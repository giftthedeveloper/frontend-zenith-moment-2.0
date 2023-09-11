document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitBtn = document.getElementById("submitBtn");
    const thankYouMessage = document.getElementById("thankYouMessage");
    const popup = document.getElementById("popup");
    const errorPopup = document.getElementById("errorPopup");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Disable the submit button to prevent multiple clicks
        submitBtn.disabled = true;

        // Collect form data
        const name = document.getElementById("name").value;
        const gender = document.getElementById("gender").value;
        const email = document.getElementById("email").value;
        const accomodatingRating = document.getElementById("accomodating_rating").value;
        const spiritualityRating = document.getElementById("spirituality_rating").value;
        const coordinationRating = document.getElementById("coordination_rating").value;
        const highlightMoment = document.getElementById("highlight_moment").value;
        const recommendationOrSuggestion = document.getElementById("recommendation_or_suggestion").value;

        const requiredFields = ["name", "email", "accomodating_rating", "spirituality_rating", "coordination_rating", "highlight_moment", "recommendation_or_suggestion"];
        for (const field of requiredFields) {
            const input = document.getElementById(field);
            if (input.value === "") {
                // Show an error message and re-enable the submit button
                alert(`Please fill in the ${field} field`);
                return;
            }
        }

        try {
            // Create JSON payload
            const feedbackData = {
                name,
                gender,
                email,
                accomodation: parseInt(accomodatingRating),
                spirituality: parseInt(spiritualityRating),
                cordination: parseInt(coordinationRating),
                highlight_moment: highlightMoment,
                recommendation_suggestion: recommendationOrSuggestion
            };

            // Send data to the API
            fetch("https://api-zenithmoment.onrender.com/feedback/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(feedbackData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Feedback submitted successfully:", data);
                form.style.display = "none";
                popup.classList.remove("hidden");
                form.reset();
            })
            .catch(error => {
                console.error("Error submitting feedback:", error);
                form.style.display = "none";
                errorPopup.classList.remove("hidden");
                form.reset();
            })
            .finally(() => {
                // Re-enable the submit button after the request is complete (whether success or error)
                submitBtn.disabled = false;
            });
        } catch (error) {
            console.error(error);
        }
    });
});
