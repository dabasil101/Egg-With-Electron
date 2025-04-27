// DOM Elements
const methodName = document.getElementById("method-name");
const currentStep = document.getElementById("current-step");
const nextStepBtn = document.getElementById("next-step-btn");
const goHomeBtn = document.getElementById("go-home-btn");
const timerElement = document.getElementById("timer");

// State
let currentMethod = null;
let currentStepIndex = 0;
let timeLeft = 0;
let timerInterval = null;

// Receive Method Data from Main Process
const { ipcRenderer } = require("electron");
ipcRenderer.on("init-cooking-process", (event, method) => {
  currentMethod = method;
  currentStepIndex = 0;
  timeLeft = method.time * 60; // Convert minutes to seconds

  // Update UI
  methodName.textContent = method.name;
  updateStep();

  // Start Timer
  timerElement.textContent = timeLeft;
  clearInterval(timerInterval); // Clear any existing timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
});

// Update Current Step
function updateStep() {
  currentStep.textContent = `Step ${currentStepIndex + 1}: ${currentMethod.steps[currentStepIndex]}`;
  nextStepBtn.textContent = currentStepIndex < currentMethod.steps.length - 1 ? "Next Step" : "Finish";
  goHomeBtn.classList.toggle("hidden", currentStepIndex < currentMethod.steps.length - 1);
}

// Next Step Button
nextStepBtn.addEventListener("click", () => {
  if (currentStepIndex < currentMethod.steps.length - 1) {
    currentStepIndex++;
    updateStep();
  } else {
    goHomeBtn.classList.remove("hidden");
  }
});

// Go Home Button
goHomeBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  window.close(); // Close the cooking process window
});