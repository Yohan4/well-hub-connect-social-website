//users.js

import { renderHeader, renderFooter, searchbar, setupEventListeners} from './common.js';

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

    // Fetch current user's details
    fetch('/api/users/current', {
        method: 'GET',
        credentials: 'same-origin',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current user');
            }
            return response.json();
        })
        .then(user => {
            // Fetch suggested users
            fetch('/api/users/suggestions', {
                method: 'GET',
                credentials: 'same-origin',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch suggested users');
                    }
                    return response.json();
                })
                .then(users => {
                    console.log('Suggested users:', users);

                    if (Array.isArray(users)) {
                        const suggestionsContainer = document.getElementById('suggestions-container');
                        users.forEach(user => {
                            suggestionsContainer.innerHTML += renderUserCard(user, false);
                        });
                    } else {
                        console.error('Expected an array of suggested users but received:', users);
                    }
                })
                .catch(error => {
                    console.error('Error fetching suggested users:', error);
                    console.error('Response status:', error.response && error.response.status);
                    console.error('Error message:', error.message);
                });

            // Fetch followed users
            fetch('/api/users/following', {
                method: 'GET',
                credentials: 'same-origin',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch followed users');
                    }
                    return response.json();
                })
                .then(users => {
                    console.log('Followed users:', users);

                    if (Array.isArray(users)) {
                        const followingContainer = document.getElementById('following-container');
                        users.forEach(user => {
                            followingContainer.innerHTML += renderFollowingUserCard(user);
                        });
                    } else {
                        console.error('Expected an array of followed users but received:', users);
                    }
                })
                .catch(error => {
                    console.error('Error fetching followed users:', error);
                    console.error('Response status:', error.response && error.response.status);
                    console.error('Error message:', error.message);
                });

            // Render notification icon and pop-up
            renderNotification();
        })
        .catch(error => {
            console.error('Error fetching current user:', error);
            console.error('Response status:', error.response && error.response.status);
            console.error('Error message:', error.message);
        });

    setupEventListeners();
}

//<i class="fa-solid fa-bell fa-rotate-by" style="--fa-rotate-angle: 1deg;""></i>

// export function usersPage(){
//     const app = document.getElementById('app');
//     app.innerHTML = `   ${renderHeader()}
//                         ${searchbar()}
//                         <div class="users-grid">
//                             <!-- Suggestions section -->
//                             <h2 class="section-heading">Suggestions ></h2>
//                             <div class="users-row">
//                                 <div class="users-card">
//                                     <img src="./assets/images/valeria.jpg" alt="profile picture">
//                                     <a href="#/user/Valeria-Uya" class="people-name">Valeria Uya</a>
//                                     <button class="follow-button">Follow</button>
//                                 </div>
//                                 <div class="users-card">
//                                     <img src="./assets/images/melo.jpg" alt="profile picture">
//                                     <a href="#/user/Melo-smith" class="people-name">Melo Smith</a>
//                                     <button class="follow-button">Follow</button>
//                                 </div>
//                                 <div class="users-card">
//                                     <img src="./assets/images/chloe.jpg" alt="profile picture">
//                                     <a href="#/user/Halabi-wabi" class="people-name">Halabi Wabi</a>
//                                     <button class="follow-button">Follow</button>
//                                 </div>
//                             </div>

//                             <!-- Following section -->
//                             <h2 class="section-heading">Following ></h2>
//                             <div class="users-row">
//                                 <div class="users-card-following">
//                                     <i class="fa-sharp fa-solid fa-star shaded-icon"></i>
//                                     <img src="./assets/images/mo.jpg" alt="profile picture">
//                                     <a href="#/user/Zabine-Salah" class="people-name">Zabine Salah</a>
//                                     <button class="follow-button">Following</button>
//                                 </div>
//                                 <div class="users-card-following">
//                                     <i class="fa-sharp fa-solid fa-star shaded-icon"></i>
//                                     <img src="./assets/images/jota.jpg" alt="profile picture">
//                                     <a href="#/user/Diogo-Jota" class="people-name">Diogo Jota</a>
//                                     <button class="follow-button">Following</button>
//                                 </div>
//                                 <div class="users-card-following">
//                                 <i class="fa-sharp fa-regular fa-star unshaded-icon"></i>
//                                 <img src="./assets/images/andrea.jpg" alt="profile picture">
//                                 <a href="#/user/Andrea-zeleta" class="people-name">Andrea zeleta</a>
//                                 <button class="follow-button">Following</button>
//                             </div>
//                             </div>
//                         </div>
//                         ${renderFooter()}`
//     setupEventListeners()                  
// }



