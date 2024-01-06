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
            displayPublicFeed(data.posts)
            displayCategoryCounts(data.counts)
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
            <h1>${post.category}</h2>
            <h4>${post.title}</h3>
            <p>${post.content}</p>
            <small>${post.username}</small>`;
        postContainer.appendChild(postElement);
            
    })
}

//function to display category counts
function displayCategoryCounts(counts) {
    //grab the category count container
    const categoryCountsContainer = document.getElementById('category-counts-container')
    categoryCountsContainer.inerHTML = ''; //clear the container
    counts.forEach(count => {
        const countElement = document.createElement('div')
        countElement.classList.add('category-count')
        countElement.innerHTML = `
        <strong>${count._id}</strong>: ${count.count}`
            //append the count element to the container
            categoryCountsContainer.appendChild(countElement)
    })
}

//fetch and display public post when DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchPublicFeed);

//logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}