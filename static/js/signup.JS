const signupForm = document.getElementById('signup-form');
const loginLink = document.getElementById('login-link');

function registerUser() {
    // Collect data from the form
    const userData = {
      username: document.getElementById('username').value,
      nickname: document.getElementById('nickname').value,
      password: document.getElementById('password').value,
      password2: document.getElementById('password2').value,
      last_name: document.getElementById('last_name').value,
      first_name: document.getElementById('first_name').value,
      // Include other fields as necessary
    };
  
    // Send a POST request to the server
    // fetch('http://43.200.108.45/accounts/register/', {
      fetch('http://127.0.0.1:8000/accounts/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // If using token-based authentication, you might need to add your token here
        // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
        // If CSRF token is needed, you'll need to include that as well
        // 'X-CSRFToken': 'YOUR_CSRF_TOKEN_HERE'
      },
      body: JSON.stringify(userData)  // Convert the user data to a JSON string
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Handle success, maybe redirect to the login page or show a success message
      window.location.href = '../../accounts/login.html'; // Redirect to login page. Adjust the URL as necessary.
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Display a user-friendly error message
        displayErrorMessage("We're experiencing some technical difficulties. Please try again later.");
    });
      
  }
  
  // Add event listener for your form submission
  document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the default form submission
    registerUser();      // Call the function to register the user
  });

document.addEventListener('DOMContentLoaded', function() {
    // Get the login link element by its ID
    var loginLink = document.getElementById('login-link');

    // Add a click event listener to the login link
    loginLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor tag behavior

        // Navigate to the login page
        window.location.href = '../../accounts/login.html';
    });
});

function displayErrorMessage(message) {
    // Assuming there's an element with the ID 'error-message' in your HTML
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
      errorMessageElement.style.display = 'block'; // Make sure it's visible
    }
  }