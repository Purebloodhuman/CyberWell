// Password Strength Checker
const passwordInput = document.getElementById("passwordInput");
const showPassword = document.getElementById("showPassword");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const strengthDetails = document.getElementById("strengthDetails");

showPassword.addEventListener("change", function () {
  passwordInput.type = this.checked ? "text" : "password";
});

passwordInput.addEventListener("input", function () {
  const password = this.value;
  const strength = calculatePasswordStrength(password);
  updateStrengthDisplay(strength);
});

function calculatePasswordStrength(password) {
  let score = 0;
  let feedback = [];

  if (password.length === 0) {
    return { score: 0, level: "none", feedback: [] };
  }

  // Length check
  if (password.length >= 8) score += 1;
  else feedback.push("Use at least 8 characters");

  if (password.length >= 12) score += 1;
  else if (password.length >= 8)
    feedback.push("Consider using 12+ characters for better security");

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Include lowercase letters");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Include uppercase letters");

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Include numbers");

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push("Include special characters");

  // Common patterns check
  if (!/(.)\1{2,}/.test(password)) score += 1;
  else feedback.push("Avoid repeating characters");

  let level;
  if (score <= 2) level = "weak";
  else if (score <= 3) level = "fair";
  else if (score <= 5) level = "good";
  else if (score <= 6) level = "strong";
  else level = "very-strong";

  return { score, level, feedback };
}

function updateStrengthDisplay(strength) {
  const levels = {
    none: { text: "Enter a password", class: "", width: "0%" },
    weak: { text: "Weak", class: "strength-weak", width: "20%" },
    fair: { text: "Fair", class: "strength-fair", width: "40%" },
    good: { text: "Good", class: "strength-good", width: "60%" },
    strong: { text: "Strong", class: "strength-strong", width: "80%" },
    "very-strong": {
      text: "Very Strong",
      class: "strength-very-strong",
      width: "100%",
    },
  };

  const levelInfo = levels[strength.level];
  strengthBar.className = `strength-bar ${levelInfo.class}`;
  strengthBar.style.width = levelInfo.width;
  strengthText.textContent = levelInfo.text;

  // Show feedback
  if (strength.feedback.length > 0) {
    strengthDetails.innerHTML = `
                    <div class="alert alert-info">
                        <strong>Suggestions:</strong>
                        <ul class="mb-0 mt-2">
                            ${strength.feedback
                              .map((item) => `<li>${item}</li>`)
                              .join("")}
                        </ul>
                    </div>
                `;
  } else if (strength.level !== "none") {
    strengthDetails.innerHTML =
      '<div class="alert alert-success">Great! Your password looks strong.</div>';
  } else {
    strengthDetails.innerHTML = "";
  }
}

// Screen Time Checker
function checkScreenTime() {
  const screenTime = parseFloat(document.getElementById("screenTime").value);
  const resultDiv = document.getElementById("screenTimeResult");

  if (isNaN(screenTime) || screenTime < 0) {
    resultDiv.innerHTML = "⚠️ Please enter a valid number of hours";
    resultDiv.className = "time-result unhealthy";
    resultDiv.style.display = "block";
    return;
  }

  let message, className, recommendations;

  if (screenTime <= 2) {
    message = "🌟 Excellent! Your screen time is very healthy.";
    className = "healthy";
    recommendations =
      "Keep maintaining this balanced approach to technology use.";
  } else if (screenTime <= 4) {
    message = "✅ Good! Your screen time is within healthy limits.";
    className = "healthy";
    recommendations =
      "Consider taking regular breaks and practicing the 20-20-20 rule.";
  } else if (screenTime <= 6) {
    message = "⚠️ Moderate. Your screen time could be reduced.";
    className = "unhealthy";
    recommendations =
      "Try to reduce screen time by 1-2 hours and increase physical activities.";
  } else if (screenTime <= 8) {
    message = "❌ High. Your screen time may be affecting your well-being.";
    className = "unhealthy";
    recommendations =
      "Consider implementing screen-free hours, especially before bedtime.";
  } else {
    message = "🚨 Very High. Immediate action needed to reduce screen time.";
    className = "unhealthy";
    recommendations =
      "Seek support for digital wellness and consider professional guidance.";
  }

  resultDiv.innerHTML = `
                <div class="mb-2">${message}</div>
                <small><strong>Recommendation:</strong> ${recommendations}</small>
            `;
  resultDiv.className = `time-result ${className}`;
  resultDiv.style.display = "block";
}
