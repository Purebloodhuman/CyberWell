const form = document.getElementById("wellnessForm");
const checkboxes = form.querySelectorAll('input[name="options"]');
const feedback = document.getElementById("checkboxFeedback");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent form submission for demo

  // Check if at least one checkbox is checked
  let isChecked = Array.from(checkboxes).some((cb) => cb.checked);

  if (!isChecked) {
    // Show feedback message
    feedback.style.display = "block";
    // Optionally mark all checkboxes invalid (not built-in but for visual feedback)
    checkboxes.forEach((cb) => cb.classList.add("is-invalid"));
  } else {
    feedback.style.display = "none";
    checkboxes.forEach((cb) => cb.classList.remove("is-invalid"));
    alert("Form submitted successfully!");
    // You can submit the form here if needed, e.g. form.submit();
  }
});

//Clear invalid feedback on any checkbox change
checkboxes.forEach((cb) => {
  cb.addEventListener("change", () => {
    if (Array.from(checkboxes).some((cb) => cb.checked)) {
      feedback.style.display = "none";
      checkboxes.forEach((cb) => cb.classList.remove("is-invalid"));
    }
  });
});

// Screen time slider update
const screenTimeSlider = document.getElementById("screenTime");
const screenTimeValue = document.getElementById("screenTimeValue");

if (screenTimeSlider && screenTimeValue) {
  screenTimeSlider.addEventListener("input", function () {
    singPlural = this.value > 1 ? "s" : "";
    screenTimeValue.textContent = this.value + " hour" + singPlural;
  });
}
