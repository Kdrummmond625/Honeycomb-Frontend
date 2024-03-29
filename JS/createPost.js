// Add an event listener to the form submission
document.getElementById('postForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevent the default form submission behavior

    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        // Optionally, redirect to the login page or display an error
        return;
    }

    // Collect data from the form fields
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;

    // Construct a post object with the collected data
    const post = {
        title: title,
        category: category,
        content: content,
    };

    // Make a POST request to the server with the post data
    fetch('http://localhost:4000/honeycomb/home/createPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token  // Include the token in the Authorization header
        },
        body: JSON.stringify(post)  // Send the post object as JSON
    })
    .then(response => response.json())  // Parse the JSON response from the server
    .then(data => {
        console.log('Success:', data);  // Log success message and data
        window.location.href = 'userPosts.html'; // Redirect to 'My Posts' page on success
    })
    .catch(error => console.error('Error:', error)); // Log any errors that occur during fetch
});


//logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}