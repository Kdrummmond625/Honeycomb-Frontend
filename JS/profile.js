//logout function
function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
}

function decodeJWT() {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from local storage
    if (!token) {
        throw new Error('No token found in local storage');
    }
    const parts = token.split('.'); // Split the token into parts
    if (parts.length !== 3) {
        throw new Error('The token is invalid');
    }
    const decodedHeader = atob(parts[0]); // Decode the header
    const decodedPayload = atob(parts[1]); // Decode the payload
    return {
        header: JSON.parse(decodedHeader),
        payload: JSON.parse(decodedPayload)
    };
}
// Use the function
try {
    const decoded = decodeJWT();
    console.log(decoded);
} catch (error) {
    console.error('Error decoding JWT:', error.message);
}