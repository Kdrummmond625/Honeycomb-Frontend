// addEventListener to the registration form
document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();// prevent the default action of the form

    //Retrieve vakues from the registration form inputs
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const email = document.getElementById('registerEmail').value;

    // send a post request to the server's signup endpoint
    const response = await fetch('http://localhost:4000/honeycomb/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    })

    //parse the json response from the server
    const data = await response.json();

    // check if the request was successful
    if (response.ok) {
        // if successful, redirect to the login page
        window.location.replace('http://localhost:4000/honeycomb/user/login');
    } else {
        // if unsuccessful, display the error message
        document.getElementById('registrationError').textContent = data.message;
    }

});
