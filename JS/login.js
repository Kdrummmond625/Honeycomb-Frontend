// // addEventListener to the login form
// document.getElementById('loginForm').addEventListener('submit', async function (e) {
//     e.preventDefault();// prevent the default action of the form

//     //Retrieve vakues from the login form inputs
//     const username = document.getElementById('loginUsername').value;
//     console.log(username)
//     const password = document.getElementById('loginPassword').value;
    

//     // send a post request to the server's login endpoint
//     const token = localStorage.getItem('jwtToken');
//     const response = await fetch('http://localhost:4000/honeycomb/user/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify({ username, password }),
        

//     })

//     //parse the json response from the server
//     const data = await response.json();
//     console.log(data)
//     // check if the request was successful
//     if (response.ok) {
//         // if successful, redirect to the home page
//         window.location.replace('http://localhost:4000/honeycomb/home');
//     } else {
//         // if unsuccessful, display the error message
//         document.getElementById('loginError').textContent = data.message;
//     }

// })


// document.getElementById('loginForm').addEventListener('submit', async function (e) {
//     e.preventDefault(); // Prevent the default action of the form
//     // Retrieve values from the login form inputs
//     const username = document.getElementById('loginUsername').value;
//     const password = document.getElementById('loginPassword').value;
    
//     try {
//         const response = await fetch('http://localhost:4000/honeycomb/user/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, password }),
//         });
//         const data = await response.json();
//          if (response.ok) {
//         //     // Store the token in localStorage and redirect
//         // const token = localStorage.getItem('jwtToken');
//             console.log(data)
//             localStorage.setItem('jwtToken', data.token); // Assuming the token is in data.token
//             window.location.href = 'http://localhost:4000/honeycomb/home/myPosts'
            
//         } else {
//             // Display the error message
//             document.getElementById('loginError').textContent = data.message;
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         // Optionally, handle network errors or other issues here
//     }
// });

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:4000/honeycomb/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token
        window.location.href = '../html/userPosts.html';
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('loginError').textContent = error.message;
    }
});
