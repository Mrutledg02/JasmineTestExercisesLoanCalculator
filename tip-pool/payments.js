// Select input fields and the payment form by their 'id' attributes
let billAmtInput = document.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentForm = document.getElementById('paymentForm');

// Select the table body where payment data will be displayed
let paymentTbody = document.querySelector('#paymentTable tbody');

// Select the summary table data cells for later update
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

// Initialize an empty object to store payment information and a variable to assign unique payment IDs
let allPayments = {};
let paymentId = 0;

// Add an event listener to the payment form that triggers the 'submitPaymentInfo' function when the form is submitted
paymentForm.addEventListener('submit', submitPaymentInfo);

// Function to handle the form submission and add a new payment
function submitPaymentInfo(evt) {
  // Prevent the default form submission behavior (page refresh) if an event (evt) is passed
  if (evt) evt.preventDefault();

  // Create a new payment object based on user input using the 'createCurPayment' function
  let curPayment = createCurPayment();

  // Check if a valid 'curPayment' object was created
  if (curPayment) {
    // Increment the paymentId to assign a unique payment ID
    paymentId += 1;

    // Add the 'curPayment' object to the 'allPayments' object
    allPayments['payment' + paymentId] = curPayment;

    // Update the HTML table with the new payment information
    appendPaymentTable(curPayment);

    // Update summary information
    updateSummary();

    // Clear the input values for bill amount and tip amount
    billAmtInput.value = '';
    tipAmtInput.value = '';
  }
}

// Function to create a payment object based on user input
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;

  // Check if bill amount and tip amount are not empty and are valid
  if (billAmt === '' || tipAmt === '') return;

  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    // Return a payment object with bill amount, tip amount, and calculated tip percentage
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
  }
}

// Function to append payment details to the payment table
function appendPaymentTable(curPayment) {
  // Create a new table row ('<tr>') element and set its ID
  let newTr = document.createElement('tr');
  newTr.id = 'payment' + paymentId;

  // Append bill amount, tip amount, and tip percentage to the row
  appendTd(newTr, '$' + curPayment.billAmt);
  appendTd(newTr, '$' + curPayment.tipAmt);
  appendTd(newTr, curPayment.tipPercent + '%');

  // Add a delete button ('X') to the row
  appendDeleteBtn(newTr, 'payment');

  // Append the table row to the payment table
  paymentTbody.append(newTr);
}

// Function to update summary information
function updateSummary() {
  // Calculate the average tip percentage based on all payments
  let tipPercentAvg = sumPaymentTotal('tipPercent') / Object.keys(allPayments).length;

  // Update the summary table data cells with total bill amount, total tip amount, and average tip percentage
  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
  summaryTds[2].innerHTML = Math.round(tipPercentAvg) + '%';
}
