//functiin to fetch and display public posts
function fetchPublicFeed() {
    //grab token from local storage
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/honeycomb/home/publicFeed', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data => {
            displayPublicFeed(data)
        })
        .catch(err => console.error('Error:', err));
}

//function to create and and append public posts to the DOM
function displayPublicFeed(post) {
    const postContainer = document.getElementById('publicFeedContainer');
    postContainer.innerHTML = ''; // Clear the container

    post.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.category}</h2>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>${post.username}</small>`;
        postContainer.appendChild(postElement);
            
    })
}

//fetch and display public post when DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchPublicFeed);