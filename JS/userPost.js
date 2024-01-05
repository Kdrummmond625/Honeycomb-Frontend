// Global variable to store all posts
let allPosts = []; 

// Function to fetch posts from the server
async function getPosts() {
    console.log("getPosts function called"); // Confirm function execution

    const token = localStorage.getItem('token');
    console.log("Retrieved token:", token); // Log the retrieved token

    if (!token) {
        console.error('No token found');
        window.location.replace('../index.html');
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

        // Limit the content to a certain length for preview
        const contentPreview = post.content.length > 100 ? post.content.substring(0, 130) + '...' : post.content;


        postElement.innerHTML = `
            <h2>${post.category}</h2>
            <h3>${post.title}</h3>
            <p>${contentPreview}</p>
            <button class="viewPost-btn" data-id="${post._id}">View Post</button>`;

            // set up the update button
            const viewPost = postElement.querySelector('.viewPost-btn');
            viewPost.addEventListener('click', () => {
                window.location.href = `../HTML/viewPost.html?id=${post._id}`
            });

            // set up the delete button
            // const deleteBtn = postElement.querySelector('.delete-btn');
            // deleteBtn.addEventListener('click', async () => {
            //     await deletePost(post._id);
            // })

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
    window.location.href = '../index.html';
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






