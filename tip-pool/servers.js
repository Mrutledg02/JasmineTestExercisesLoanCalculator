// Select the input field for the server name and the server form
let serverNameInput = document.getElementById('serverName');
let serverForm = document.getElementById('serverForm');

// Select the table body where server data will be displayed
let serverTbody = document.querySelector('#serverTable tbody');

// Initialize an empty object to store server information and a variable to assign unique server IDs
let allServers = {};
let serverId = 0;

// Add an event listener to the server form that triggers the 'submitServerInfo' function when the form is submitted
serverForm.addEventListener('submit', submitServerInfo);

// Function to handle the form submission and add a new server
function submitServerInfo(evt) {
  // Prevent the default form submission behavior (page refresh) if an event (evt) is passed
  if (evt) evt.preventDefault();

  // Get the server name entered in the input field
  let serverName = serverNameInput.value;

  // Check if the server name is not empty
  if (serverName !== '') {
    // Increment the serverId to assign a unique ID to the server
    serverId++;

    // Create a new server object and add it to the 'allServers' object
    allServers['server' + serverId] = { serverName };

    // Update the HTML table with the new server information
    updateServerTable();

    // Clear the input field by setting its value to an empty string
    serverNameInput.value = '';
  }
}

// Function to update the HTML table with server information
function updateServerTable() {
  // Clear the existing content of the table body by setting its innerHTML to an empty string
  serverTbody.innerHTML = '';

  // Iterate over the 'allServers' object to retrieve server information
  for (let key in allServers) {
    let curServer = allServers[key];

    // Create a new table row ('<tr>') element and set its id attribute
    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    // Calculate the average tip amount using the 'sumPaymentTotal' function
    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

    // Append the server name, formatted tip average, and a delete button ('X') to the table row
    appendTd(newTr, curServer.serverName);
    appendTd(newTr, '$' + tipAverage.toFixed(2));
    appendDeleteBtn(newTr);

    // Append the table row to the table body
    serverTbody.append(newTr);
  }
}
