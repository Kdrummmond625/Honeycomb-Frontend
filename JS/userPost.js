// Global variable to store all posts
let allPosts = []; 

// Function to fetch posts from the server
async function getPosts() {
    console.log("getPosts function called"); // Confirm function execution

    const token = localStorage.getItem('token');
    console.log("Retrieved token:", token); // Log the retrieved token

    if (!token) {
        console.error('No token found');
        window.location.replace('http://localhost:4000/honeycomb/user/login');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/honeycomb/home/myPosts', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("Response status:", response.status); // Log the response status

        if (!response.ok) {
            throw new Error(`Failed to fetch posts, status code: ${response.status}`);
        }

        allPosts = await response.json(); // Update allPosts with the fetched data
        console.log("Received data:", allPosts); // Log the data received from the server
        displayPosts(allPosts); // Display the posts
    } catch (err) {
        console.error('Error fetching posts:', err);
    }
}

// Function to display all posts in the postContainer
function displayPosts(posts) {
    const postContainer = document.getElementById('postsContainer');
    postContainer.innerHTML = ''; // Clear the container

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.category}</h2>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p>${post.isPublic ? 'Public' : 'Private'}</p>
            <button class="update-btn" data-id="${post._id}">Update</button>
            <button class="delete-btn" data-id="${post._id}">Delete</button>`;

            // set up the update button
            const updateBtn = postElement.querySelector('.update-btn');
            updateBtn.addEventListener('click', () => {
                window.location.href = `../HTML/updatePost.html?id=${post._id}`
            });

            // set up the delete button
            const deleteBtn = postElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', async () => {
                await deletePost(post._id);
            })

        postContainer.appendChild(postElement);
    });
}

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

// Function to filter posts based on a search term
function filterPosts() {
    const searchTerms = document.getElementById('searchTerms').value.toLowerCase();
    const filteredPosts = allPosts.filter(post => post.category.toLowerCase().includes(searchTerms));
    displayPosts(filteredPosts);
}

function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
}



// Optional: Add event listener for search/filter functionality
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    filterPosts();
});

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    getPosts();
});






