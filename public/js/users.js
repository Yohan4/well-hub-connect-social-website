//users.js

import { renderHeader, renderFooter, searchbar, setupEventListeners, checkLoginStatus, loginLogout} from './common.js';

// Function to render user cards
function renderUserCard(user, isFollowing) {
    const buttonText = isFollowing ? 'Following' : 'Follow';

    return `
        <div class="users-card">
            <img src="./assets/images/${user.profilePicture}" alt="profile picture">
            <a href="#/user/${user.username}" class="people-name">${user.username}</a>
            <button class="follow-button" data-user-id="${user._id}">${buttonText}</button>
        </div>
    `;
}

// Function to render following user cards
function renderFollowingUserCard(user) {
    return `
        <div class="users-card-following">
            <i class="fa-sharp fa-solid fa-star shaded-icon"></i>
            <img src="./assets/images/${user.profilePicture}" alt="profile picture">
            <a href="#/user/${user.username}" class="people-name">${user.username}</a>
            <button class="follow-button" data-user-id="${user._id}">Following</button>
        </div>
    `;
}

export function usersPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        ${searchbar()}
        <div class="users-grid">
            <!-- Suggestions section -->
            <h2 class="section-heading">Suggestions ></h2>
            <div id="suggestions-container" class="users-row"></div>
            <!-- Following section -->
            <h2 class="section-heading">Following ></h2>
            <div id="following-container" class="users-row"></div>
        </div>
        ${renderFooter()}
    `;

    // Fetch current user's details and suggested users concurrently
    console.log('Triggering AJAX requests to retrieve users');

    Promise.all([
        fetch('/api/users/current'),
        fetch('/api/users/suggestions', {
            method: 'GET',
            credentials: 'same-origin',
        })
    ])
        .then(responses => Promise.all(responses.map(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            return response.json();
        })))
        .then(([currentUser, suggestedUsers]) => {
            console.log('Current user:', currentUser);
            console.log('Suggested users:', suggestedUsers);

            if (Array.isArray(suggestedUsers)) {
                const suggestionsContainer = document.getElementById('suggestions-container');
                suggestionsContainer.innerHTML = '';
                suggestedUsers.forEach(user => {
                    suggestionsContainer.innerHTML += renderUserCard(user, false);
                });
            } else {
                console.error('Expected an array of suggested users but received:', suggestedUsers);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            console.error('Error message:', error.message);
        });
    
    checkLoginStatus(function(isLoggedIn) {
        loginLogout(isLoggedIn);
    });

    setupEventListeners();
}





