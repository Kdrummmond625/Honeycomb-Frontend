

//logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
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

    //display post count by category
    const postCountsElement = document.getElementById('postCountsByCategory');
    data.postCountsByCategory.forEach(category => {
        const categoryElement = document.createElement('li');
        categoryElement.textContent = `${category._id}: ${category.count}`;
        postCountsElement.appendChild(categoryElement);
    })
}













// function decodeJWT() {
//     const token = localStorage.getItem('jwtToken'); // Retrieve the token from local storage
//     if (!token) {
//         throw new Error('No token found in local storage');
//     }
//     const parts = token.split('.'); // Split the token into parts
//     if (parts.length !== 3) {
//         throw new Error('The token is invalid');
//     }
//     const decodedHeader = atob(parts[0]); // Decode the header
//     const decodedPayload = atob(parts[1]); // Decode the payload
//     return {
//         header: JSON.parse(decodedHeader),
//         payload: JSON.parse(decodedPayload)
//     };
// }
// // Use the function
// try {
//     const decoded = decodeJWT();
//     console.log(decoded);
// } catch (error) {
//     console.error('Error decoding JWT:', error.message);
// }