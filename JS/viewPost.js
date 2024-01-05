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
            console.log('fetched post data:', post)
            // Populate the form fields with the existing post data
            document.getElementById('title').textContent = post.title;
            document.getElementById('category').textContent = post.category;
            document.getElementById('content').textContent = post.content;

            // set up the update button
            const updateBtn = document.getElementById('updateBtn');
            updateBtn.addEventListener('click', () => {
                window.location.href = `../HTML/updatePost.html?id=${post._id}`
            });



            // set up the delete button
            const deleteBtn = document.getElementById('deleteBtn');
            deleteBtn.addEventListener('click', async () => {
                await deletePost(post._id);
            })
        })
        .catch(error => console.error('Error:', error)); // Log errors, if any
}

// set up the update button and redirect to updatePost.html



async function deletePost(id) {
    const token = localStorage.getItem('token');
    console.log("Retrieved token:", token); // Log the retrieved token
    const response = await fetch(`http://localhost:4000/honeycomb/home/deletePost/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.ok) {
        window.location.href = '../HTML/userPosts.html';
    } else {
        const data = await response.json();
        document.getElementById('deleteError').textContent = data.message;
    }
}


// logout function
function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'index.html';
}