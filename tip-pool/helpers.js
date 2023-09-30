// Function to calculate the total sum of 'tipAmt', 'billAmt', or 'tipPercent' from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  // Loop through each payment in the 'allPayments' object
  for (let key in allPayments) {
    let payment = allPayments[key];

    // Add the specified type of value (tipAmt, billAmt, or tipPercent) to the total after converting it to a number
    total += Number(payment[type]);
  }

  return total; // Return the total sum
}

// Function to calculate the tip percentage based on bill amount and tip amount
function calculateTipPercent(billAmt, tipAmt) {
  // Calculate tip percentage by dividing tipAmt by billAmt, multiplying by 100, and rounding to the nearest whole number
  return Math.round(100 / (billAmt / tipAmt));
}

// Function to append a new 'td' element with a given value to a table row ('tr')
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd); // Append the new 'td' element to the specified table row
}

// Function to append a delete button ('X') with a click handler for removing an element
function appendDeleteBtn(tr, type) {
  let newTd = document.createElement('td');
  newTd.className = 'deleteBtn'; // Add a CSS class for styling purposes
  newTd.innerText = 'X'; // Display 'X' as the button text

  // Add a click event listener that calls the 'removeEle' function when the delete button is clicked
  newTd.addEventListener('click', removeEle);

  tr.append(newTd); // Append the delete button 'td' element to the specified table row
}

// Function to remove an element (server or payment) from the 'allServers' object and the DOM
function removeEle(evt) {
  let ele = evt.target.closest('tr'); // Find the closest table row ('tr') element to the clicked delete button

  // Delete the corresponding element from the 'allServers' object based on the element's ID
  delete allServers[ele.id];

  // Remove the table row from the DOM
  ele.parentNode.removeChild(ele);

  // Call the 'updateServerTable' function to update the server table (not shown in this code snippet)
  updateServerTable();
}
