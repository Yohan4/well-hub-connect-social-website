
import { loadLoginPage } from './login.js';
import { loadComments, hideComments} from './profile.js';


// function to render header
export function renderHeader() {
    return `    <!-- Header Section -->
                <header id="navigation">
                <div class="logo">
                    <a href="/">
                        <img src="./assets/images/logo.svg"alt="Well Hub Connect"/>
                    </a>
                    <div class="logo-name">WELL HUB CONNECT</div>
                </div>
                <div id="header-right">
                    <button id="create-button" class="create">CREATE</button>
                    <button id="login-button" class="login">LOGIN</button>
                </div>
            </header>`;
}

// function to render footer
export function renderFooter() {
    return `    <!-- Footer Section -->
                <footer>
                <div id="left-footer">
                    <div class="footer-logo">
                        <img src="./assets/Images/logo.svg" alt="Well Hub Connect"/>
                        <p>Connect with us!</p>
                    </div>

                    <div id="icons">
                        <a href="https://www.facebook.com/akilesh.subhadu" target="_blank" rel="noopener noreferrer">
                            <img src="./assets/images/facebook_logo.svg" alt="facebook"/>
                        </a>

                        <a href="https://www.instagram.com/_yohan4/" target="_blank" rel="noopener noreferrer">
                            <img src="./assets/images/Instagram_logo.svg" alt="instagram"/>
                        </a>

                        <a href="https://www.linkedin.com/in/akilesh-subhadu-058241235/?trk=people-guest_people_search-card&originalSubdomain=mu" target="_blank" rel="noopener noreferrer">
                            <img src="./assets/images/linkedin_logo.svg" alt="linkedin"/>
                        </a>
                    </div>
                </div>

                <div class="bottom">
                    <p>
                        © Copyright 2024 by Akilesh Venkata Subhadu. All Rights Reserved.
                    </p>
                </div>
            </footer>`;
}

// function to close button for login and register form
export function closeButtonListener(){
    const closeButton = document.querySelector('.close-icon');
    if (closeButton){
        closeButton.addEventListener('click', () => {
            window.location.hash = '#/'
        })
    }
}

// function for searchbar and its button below
export function searchbar(){
    return `    <!-- Searchbar Section and its buttons -->
                <div id="search-and-buttons">
                    <div class="search-container">
                        <i class="fas fa-search"></i>
                        <input type="search" id="search-bar" placeholder="Search a community/content/people" aria-label="Search">
                    </div>
                    <div class="buttons-container">
                        <button class="button-one">Home</button>
                        <button class="button-two">My Feed</button>
                        <button class="button-three">My Communities</button>
                        <button class="button-four">Users</button>
                    </div>
                </div>
            `;
}

// Initialises event listeners to navigate to these pages
// And sets ups interaction when clicking buttons within pages
export function setupEventListeners(username) {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', loadLoginPage);
    }

    const createButton = document.getElementById('create-button');
    if (createButton) {
        createButton.addEventListener('click', () => {
            window.location.hash = '#/create';
        });
    }

    const communityButton = document.getElementById('communities-button');
    if (communityButton) {
        communityButton.addEventListener('click', () => {
            window.location.hash = '#/communities';
        });
    }

    const usersButton = document.getElementById('users-button');
    if (usersButton) {
        usersButton.addEventListener('click', () => {
            window.location.hash = '#/users';
        });
    }

    const feedButton = document.getElementById('feed-button');
    if (feedButton) {
        feedButton.addEventListener('click', () => {
            window.location.hash = '#/feed';
        });
    }

    const homeButton = document.querySelector('.button-one');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.hash = '#/home';
        });
    }

    const myFeedButton = document.querySelector('.button-two');
    if (myFeedButton) {
        myFeedButton.addEventListener('click', () => {
            window.location.hash = '#/feed';
        });
    }

    const myCommunitiesButton = document.querySelector('.button-three');
    if (myCommunitiesButton) {
        myCommunitiesButton.addEventListener('click', () => {
            window.location.hash = '#/communities';
        });
    }

    const usersPageButton = document.querySelector('.button-four');
    if (usersPageButton) {
        usersPageButton.addEventListener('click', () => {
            window.location.hash = '#/users';
        });
    }

    const viewCommentsButton = document.querySelector('.view-comments-button');
    if (viewCommentsButton) {
        viewCommentsButton.addEventListener('click', () => {
            loadComments(username); 
        });
    }

    const hideCommentsButton = document.querySelector('.hide-comments-button');
    if (hideCommentsButton) {
        hideCommentsButton.addEventListener('click', () => hideComments(username));
    }

    const learnMoreButton = document.querySelector('.learn-more-button');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', () => {
            document.getElementById('sub-hero-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

}