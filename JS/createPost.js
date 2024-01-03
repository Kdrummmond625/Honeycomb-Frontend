document.getElementById('postForm').addEventListener('submit', async function (e) {
    e.preventDefault()

    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value;

    const post = {
        title: title,
        category: category,
        content: content,
    }
})

fetch('http://localhost:4000/honeycomb/home/createPost', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(post)
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    window.location.href = 'http://localhost:4000/honeycomb/home/myPosts'
})