//grab token from local storage
const token = localStorage.getItem('token');

// Event listener to run code after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Extract the post ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    console.log(postId);

    // Check if post ID is present; if not, log an error
    if (!postId) {
        console.error('No post ID provided');
        return;
    }

    // Fetch the current data of the post using its ID
    fetchPostData(postId);

    // Add an event listener to the update post form
    document.getElementById('updatePostForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        updatePost(postId); // Call the function to update the post
    });
});

// Function to fetch post data
function fetchPostData(postId) {
    // Send a request to your backend to get post data
    fetch(`http://localhost:4000/honeycomb/home/myPosts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        
    }) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(post => {
            // Populate the form fields with the existing post data
            document.getElementById('title').value = post.title;
            document.getElementById('category').value = post.category;
            document.getElementById('content').value = post.content;
        })
        .catch(error => console.error('Error:', error)); // Log errors, if any
}

// Function to update the post
function updatePost(postId) {
    // Create an object with updated post data
    const post = {
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        content: document.getElementById('content').value,
        isPublic: document.getElementById('isPublic').checked
        
    };

    // Send a PUT request to update the post
    fetch(`http://localhost:4000/honeycomb/home/updatePost/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify(post) // Send the updated post data as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Post updated successfully!');
        window.location.href = 'userPosts.html'; // Redirect to 'My Posts' page on success
    })
    .catch(error => console.error('Error:', error)); // Log errors, if any
}
//logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}