// Wait for the HTML document to be fully loaded before executing JavaScript.
window.addEventListener('DOMContentLoaded', function() {

  // Get a reference to the form element with the id "calc-form".
  const form = document.getElementById("calc-form");

  // Check if the form element exists.
  if (form) {

    // Call the setupIntialValues function to set default values and calculate the initial monthly payment.
    setupIntialValues();

    // Add an event listener to the form for the "submit" event.
    form.addEventListener("submit", function(e) {

      // Prevent the default form submission behavior (prevents the page from reloading).
      e.preventDefault();

      // Call the update function to recalculate and update the monthly payment.
      update();
    });
  }
});

// Define a function getCurrentUIValues to retrieve user input values from the HTML form.
function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value), // Convert input value to a number.
    years: +(document.getElementById("loan-years").value),   // Convert input value to a number.
    rate: +(document.getElementById("loan-rate").value),     // Convert input value to a number.
  }
}

// Set up initial values for the form inputs and calculate the initial monthly payment.
function setupIntialValues() {
  const values = { amount: 150000, years: 20, rate: 3 }; // Default values.
  const amountInput = document.getElementById('loan-amount');
  const yearsInput = document.getElementById('loan-years');
  const rateInput = document.getElementById('loan-rate');

  // Set the default values in the form inputs.
  amountInput.value = values.amount;
  yearsInput.value = values.years;
  rateInput.value = values.rate;

  // Call the update function to calculate and display the initial monthly payment.
  update();
}

// Update the UI with the calculated monthly payment.
function update() {
  const currentUIValues = getCurrentUIValues(); // Get current user input values.
  const monthlyPayment = calculateMonthlyPayment(currentUIValues); // Calculate monthly payment.
  
  // Call the updateMonthly function to display the monthly payment in the UI.
  updateMonthly(monthlyPayment);
}

// Calculate the monthly payment based on user input values.
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate) / 100 / 12; // Calculate monthly interest rate.
  const n = Math.floor(values.years * 12);      // Calculate the total number of payments.

  // Calculate the monthly payment using the formula.
  const monthlyPayment = (monthlyRate * values.amount) / (1 - Math.pow((1 + monthlyRate), -n));
  
  // Now, round the result to 2 decimal places and return it as a string
  return monthlyPayment.toFixed(2);
  }

// Update the UI to display the monthly payment.
function updateMonthly(monthly) {
  let monthlyUI = document.getElementById('monthly-payment'); // Get the element to display the result.
  
  // Update the element's text content with the monthly payment, formatted as a currency.
  monthlyUI.innerText = '$' + monthly;
}
