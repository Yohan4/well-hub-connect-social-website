
import { renderHeader, renderFooter, searchbar, setupEventListeners, checkLoginStatus, loginLogout } from './common.js';

// Function to render user cards
function renderUserCard(user, isFollowing) {
    const buttonText = isFollowing ? 'Following' : 'Follow';

    return `
        <div class="users-card" data-user-id="${user._id}">
            <img src="./assets/images/${user.profilePicture}" alt="profile picture">
            <a href="javascript:void(0);" onclick="checkFollowStatus('${user.username}', ${isFollowing})" class="people-name">${user.username}</a>
            <button class="follow-button" data-user-id="${user._id}">${buttonText}</button>
        </div>
    `;
}

window.checkFollowStatus = function(username, isFollowing) {
    if (!isFollowing) {
        alert('You must be following this user to view their profile.');
    } else {
        window.location.href = `#/user/${username}`;
    }
};


//function to display users page
export function usersPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        ${searchbar()}
        <div class="users-grid">
            <!-- Suggestions section -->
            <h2 class="section-heading">Suggestions ></h2>
            <div id="suggestions-container" class="users-row"></div>
        </div>
        ${renderFooter()}
    `;

    // Fetch current user's details and suggested users concurrently
    console.log('Triggering AJAX requests to retrieve users');
    Promise.all([
        fetch('/api/users/current').then(response => response.json()).catch(error => {
            console.error('Error fetching current user:', error);
            return null;
        }),
        fetch('/api/users/suggestions', {
            method: 'GET',
            credentials: 'same-origin',
        }).then(response => response.json()).catch(error => {
            console.error('Error fetching suggested users:', error);
            return null;
        })
    ])
        .then(([currentUser, suggestedUsers]) => {
            console.log('Current user:', currentUser);
            console.log('Suggested users:', suggestedUsers);

            const suggestionsContainer = document.getElementById('suggestions-container');
            suggestionsContainer.innerHTML = '';

            if (Array.isArray(suggestedUsers)) {
                suggestedUsers.forEach(user => {
                    const isFollowing = currentUser && currentUser.following && currentUser.following.includes(user._id);
                    const userCard = renderUserCard(user, isFollowing);
                    suggestionsContainer.innerHTML += userCard;

                    // Add event listener to the follow button
                    const followButton = suggestionsContainer.querySelector(`.users-card[data-user-id="${user._id}"] .follow-button`);
                    followButton.addEventListener('click', () => {
                        if (isFollowing) {
                            unfollowUser(user._id);
                        } else {
                            followUser(user._id);
                        }
                    });
                });
            } else {
                console.error('Expected an array of suggested users but received:', suggestedUsers);
            }
        });

    checkLoginStatus(function(isLoggedIn) {
        loginLogout(isLoggedIn);
    });

    setupEventListeners();
} 

function updateFollowButtonState(userId, isFollowing) {
    const userCard = document.querySelector(`.users-card[data-user-id="${userId}"]`);
    if (userCard) {
        const followButton = userCard.querySelector('.follow-button');
        followButton.textContent = isFollowing ? 'Follow' : 'Following';
        followButton.classList.toggle('is-following', !isFollowing);
    }
}

function followUser(userId) {
    fetch(`/api/users/follow/${userId}`, {
        method: 'POST',
        credentials: 'same-origin',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Follow request sent successfully' || data.message === 'Now following user') {
            updateFollowButtonState(userId, false); 
        } else {
            console.error('Failed to follow user:', data.message);
        }
    })
    .catch(error => {
        console.error('Error following user:', error);
    });
}

function unfollowUser(userId) {
    fetch(`/api/users/unfollow/${userId}`, {
        method: 'POST',
        credentials: 'same-origin',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Unfollowed user successfully') {
            updateFollowButtonState(userId, true); 
        } else {
            console.error('Failed to unfollow user:', data.message);
        }
    })
    .catch(error => {
        console.error('Error unfollowing user:', error);
    });
}