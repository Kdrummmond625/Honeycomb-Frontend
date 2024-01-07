

//logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProfileData()

    document.getElementById('create-btn').addEventListener('click', () => {
        window.location.href = 'createPost.html'; // URL for the create post page
    });

    // Listener for 'View Posts' button
    document.getElementById('view-btn').addEventListener('click', () => {
        window.location.href = 'userPosts.html'; // URL for the view posts page
    });

    // Listener for 'Public Posts' button
    document.getElementById('public-btn').addEventListener('click', () => {
        window.location.href = 'publicFeed.html'; // URL for the public posts page
    });

})

//get token from local storage

function fetchProfileData() {
    //grab token from local storage
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/honeycomb/home/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data => {
            displayProfileData(data)
        })
        .catch(err => console.error('Error:', err));
}

function displayProfileData(data) {
    //display username
    const username = document.getElementById('username');
    username.textContent = data.username; 
}