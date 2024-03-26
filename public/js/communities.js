// community.js
import { renderHeader, renderFooter, searchbar, setupEventListeners} from './common.js';

// function to load community page
export function communityPage(){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        ${searchbar()}
                        <div class="community-grid">
                            <!-- Row 1 -->
                            <h2 class="section-heading-community">Explore ></h2>
                            <div class="community-row">
                                <!-- Community Card 1 -->
                                <div class="community-card">
                                    <img src="./assets/images/sports-community.webp" alt="Sports Enthusiasts">
                                    <a href="#/sports/Sports-Enthusiasts" class="community-name">Sports Enthusiasts</a>
                                    <button class="join-button">Join</button>
                                </div>

                                <!-- Community Card 2 -->
                                <div class="community-card">
                                    <img src="./assets/images/healthy-community.webp" alt="Healthy Diet">
                                    <a href="#/health/Healthy-Diet" class="community-name">Healthy Diet</a>
                                    <button class="join-button">Join</button>
                                </div>
                            </div>

                            <!-- Row 2 -->
                            <div class="community-row">
                                <!-- Community Card 3 -->
                                <div class="community-card">
                                    <img src="./assets/images/vegetarian-community.webp" alt="Vegetarian Lifestyle">
                                    <a href="#/vegetarian/Vegetarian-Lifestyle" class="community-name">Vegetarian Lifestyle</a>
                                    <button class="join-button">Joined</button>
                                </div>

                                <!-- Community Card 4 -->
                                <div class="community-card">
                                    <img src="./assets/images/meditation-community.webp" alt="Mindfulness and Wellbeing">
                                    <a href="#/wellbeing/Mindfullness-and-Wellbeing" class="community-name">Mindfulness and Wellbeing</a>
                                    <button class="join-button">Joined</button>
                                </div>
                            </div>
                        </div>
                        ${renderFooter()}`
            
    setupEventListeners()                  
}

// function to load sports page
export function sports(sports){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <h1 class="username-title">${sports}'s Page</h1>
                        ${searchbar()}
                        <div class="no-post-container"> </div>
                        ${renderFooter()}`
    
    // Make an AJAX request to retrieve posts for the sports community
    // fetch(`/api/users/posts/community/${sports}`)
    fetch(`/api/users/posts/community/${encodeURIComponent(sports)}`)
    .then(response => response.json())
    .then(posts => {
        const postContainer = document.querySelector('.no-post-container');

        if (posts.length === 0) {
            postContainer.innerHTML = '<p>No posts available.</p>';
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
                    postContainer.innerHTML += postHTML;
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while loading the Sports community posts');
    });

    setupEventListeners(sports)                  
}

// function to load healthy diet page
export function healthy(health){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <h1 class="username-title">${health}'s Page</h1>
                        ${searchbar()}
                        <div class="no-post-container"></div
                        ${renderFooter()}`

    // Make an AJAX request to retrieve posts for the health community
    // fetch(`/api/users/posts/community/${health}`)
    fetch(`/api/users/posts/community/${encodeURIComponent(health)}`)
    .then(response => response.json())
    .then(posts => {
        const postContainer = document.querySelector('.no-post-container');

        if (posts.length === 0) {
            postContainer.innerHTML = '<p>No posts available.</p>';
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
                    postContainer.innerHTML += postHTML;
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while loading the Health community posts');
    });

    setupEventListeners(health)                  
}

// function to load vegetarian lifestyle page
export function vegetarian(vegetarian){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <h1 class="username-title">${vegetarian}'s Page</h1>
                        ${searchbar()}
                        <div class="no-post-container"></div
                        ${renderFooter()}`
    
    // Make an AJAX request to retrieve posts for the vegetarian community
    // fetch(`/api/users/posts/community/${vegetarian}`)
    fetch(`/api/users/posts/community/${encodeURIComponent(vegetarian)}`)
    .then(response => response.json())
    .then(posts => {
        const postContainer = document.querySelector('.no-post-container');

        if (posts.length === 0) {
            postContainer.innerHTML = '<p>No posts available.</p>';
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
                    postContainer.innerHTML += postHTML;
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while loading the Vegetarian community posts');
    });

    setupEventListeners(vegetarian)                  
}

// function to load mindfullness and wellbeing page
export function wellbeing(wellbeing){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <h1 id="username-title">${wellbeing}'s Page</h1>
                        ${searchbar()}
                        <div class="no-post-container"> </div
                        ${renderFooter()}`

    // Make an AJAX request to retrieve posts for the wellbeing community
    // fetch(`/api/users/posts/community/${wellbeing}`)
    fetch(`/api/users/posts/community/${encodeURIComponent(wellbeing)}`)

    .then(response => response.json())
    .then(posts => {
        const postContainer = document.querySelector('.no-post-container');

        if (posts.length === 0) {
            postContainer.innerHTML = '<p>No posts available.</p>';
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
                    postContainer.innerHTML += postHTML;
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while loading the Wellbeing community posts');
    });

    setupEventListeners(wellbeing)                  
}

