// Select the screen element to display input/result
const screen = document.getElementById("screen");

// Store the current input and memory
let currentInput = "";
let memory = 0;

// Function to update the screen safely
function updateScreen(value) {
  screen.value = value;
}

// Function to safely evaluate arithmetic expressions
function evaluateExpression(expressions) {
  try {
    // Use Function constructor instead of eval for security
    return new Function("return " + expressions)();
  } catch (e) {
    return "Error";
  }
}

// Add event listeners to all buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.getAttribute("data-number");
    const action = button.getAttribute("data-action");

    // If number button is clicked
    if (number !== null) {
      //Prevent multiple decimals
      if (number === "." && currentInput.includes(".")) return;
      currentInput += number;
      updateScreen(currentInput);
    }

    // Handle action buttons
    if (action !== null) {
      switch (action) {
        case "clear":
          currentInput = "";
          updateScreen("");
          break;
        case "add":
          currentInput += "+";

          updateScreen(currentInput);
          break;
        case "subtract":
          currentInput += "-";

          updateScreen(currentInput);
          break;
        case "multiply":
          currentInput += "*";

          updateScreen(currentInput);
          break;
        case "divide":
          currentInput += "/";

          updateScreen(currentInput);
          break;
        case "percent":
          currentInput = currentInput
            ? (parseFloat(currentInput) / 100).toString()
            : "";

          updateScreen(currentInput);
          break;
        case "power":
          currentInput += "**";

          updateScreen(currentInput);
          break;
        case "equals":
          const result = evaluateExpression(currentInput);
          currentInput = result.toString();

          updateScreen(currentInput);
          break;
        case "MC":
          memory = 0;
          break;
        case "MR":
          currentInput += memory.toString();

          updateScreen(currentInput);
          break;
        case "M+":
          memory += parseFloat(currentInput) || 0;
          break;
        case "M-":
          memory -= parseFloat(currentInput) || 0;
          break;
      }
    }
  });
});
