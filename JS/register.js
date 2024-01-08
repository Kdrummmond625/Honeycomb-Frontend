// addEventListener to the registration form
document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();// prevent the default action of the form

    //Retrieve vakues from the registration form inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // send a post request to the server's signup endpoint
    const response = await fetch('https://honeycomb-0f2098931edc.herokuapp.com/honeycomb/user/signup', {
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
        window.location.replace('../index.html');
    } else {
        // if unsuccessful, display the error message
        document.getElementById('registrationError').textContent = data.message;
    }

});
