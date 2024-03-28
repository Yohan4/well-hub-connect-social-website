// feed.js

import { renderHeader, renderFooter, searchbar, setupEventListeners} from './common.js';

// function to load feed page
export function feedPage() {
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        ${searchbar()}
                        <!-- Feed page -->
                        <div id="feed-container"></div>
                        ${renderFooter()}
                    `;

    // Make an AJAX request to retrieve the user's post
    console.log('Triggering AJAX request to retrieve user posts');
    fetch('/api/users/posts/feed')
        .then(response => response.json())
        .then(posts => {
            const feedContainer = document.getElementById('feed-container');
            feedContainer.innerHTML = '';

            if (posts.length === 0) {
                feedContainer.innerHTML = '<p>No posts available.</p>';
            } else {
                posts.forEach(post => {
                    const postHTML = `
                        <div class="post-container">
                        <h2 class="post-user">${post.createdBy}</h2>
                        <h3 class="post-title">${post.postName}</h3>
                            <div class="post-community-name">${post.community}</div>
                            <div class="post">
                                <img src="./assets/images/${post.image}" alt="${post.postName}" class="post-image">
                                <i class="fa-sharp fa-solid fa-heart post-like-icon"></i>
                                <p class="post-caption">${post.description}</p>
                            </div>
                        </div>`;
                    feedContainer.innerHTML += postHTML;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching user posts:', error);
        });

    setupEventListeners();
}


