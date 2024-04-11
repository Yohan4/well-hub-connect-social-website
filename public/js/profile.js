import { renderHeader, renderFooter, searchbar, setupEventListeners, checkLoginStatus, loginLogout } from './common.js';

// Function to render user posts
function renderUserPost(post) {
    return `
        <div class="post-container">
            <h2 class="post-user">${post.createdBy}</h2>
            <div class="post-community-name">${post.community}</div>
            <div class="post">
                <img src="./assets/images/${post.image}" alt="${post.postName}" class="post-image">
                <i class="fa-sharp fa-solid fa-heart post-like-icon"></i>
                <p class="post-caption">${post.description}</p>
            </div>
        </div>
    `;
}

// Function to load profile page
export function profilePage(username) {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        ${searchbar()}
        <h1 class="username-title">${username}'s Profile</h1>
        <div id="user-posts-container"></div> 
        ${renderFooter()}
    `;

    // Fetch user posts from the server
    fetch(`/api/users/posts/${username}`)
        .then(response => {
            if (!response.ok) {
                if(response.status === 403) {
                    throw new Error('You must be following this user to view their posts.');
                } else {
                    throw new Error('Failed to fetch user posts');
                }
            }
            return response.json();
        })
        .then(posts => {
            const userPostsContainer = document.getElementById('user-posts-container');
            userPostsContainer.innerHTML = '';

            if (posts.length === 0) {
                userPostsContainer.innerHTML = '<p>No posts available.</p>';
            } else {
                posts.forEach(post => {
                    userPostsContainer.innerHTML += renderUserPost(post);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const userPostsContainer = document.getElementById('user-posts-container');
            userPostsContainer.innerHTML = `<p>${error.message}</p>`;
        });

    checkLoginStatus(function(isLoggedIn) {
        loginLogout(isLoggedIn);
    });

    setupEventListeners(username);
}

