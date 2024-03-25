//main.js

import { renderHeader, renderFooter, setupEventListeners } from './common.js';
import { loadLoginPage, checkLoginStatus, loginLogout } from './login.js';
import { loadRegisterPage} from './register.js'; 
import { renderHeroSection, renderSubHeroSection, renderframeSection } from './home.js';
import { profilePage} from './profile.js';
import { feedPage } from './feed.js';
import { communityPage, sports, healthy, vegetarian, wellbeing} from './communities.js';
import { usersPage } from './users.js';
import { createPostPage } from './post.js';


document.addEventListener("DOMContentLoaded", () => {
    navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
    navigateTo(window.location.hash);
});

// function to navigate to these pages
function navigateTo(hash) {
    // Check if the hash is for a user's profile page
    if (hash.startsWith("#/user/")) {
        const username = hash.split("#/user/")[1];
        profilePage(username); 
    } 
    else if (hash.startsWith("#/sports/")) {
        const communityNameOne = hash.split("#/sports/")[1];
        sports(communityNameOne);

    }
    else if (hash.startsWith("#/health/")) {
        const communityNameTwo = hash.split("#/health/")[1];
        healthy(communityNameTwo);
        
    }
    else if (hash.startsWith("#/vegetarian/")) {
        const communityNameThree = hash.split("#/vegetarian/")[1];
        vegetarian(communityNameThree);

    }
    else if (hash.startsWith("#/wellbeing/")) {
        const communityNameFour = hash.split("#/wellbeing/")[1];
        wellbeing(communityNameFour);
        
    }
    else {
        switch (hash) {
            case "#/register":
                loadRegisterPage();
                checkLoginStatus(function(isLoggedIn) {
                    loginLogout(isLoggedIn);
                });
                break;
            case "#/login":
                loadLoginPage();
                checkLoginStatus(function(isLoggedIn) {
                    loginLogout(isLoggedIn);
                });
                break;
            case "#/create":
                createPostPage();
                checkLoginStatus(function(isLoggedIn) {
                    if (isLoggedIn) {
                        createPostPage();
                    } else {
                        window.location.hash = "#/login";
                    }
                });
                break;
            case "#/feed":
                feedPage();
                checkLoginStatus(function(isLoggedIn) {
                    if (isLoggedIn) {
                        feedPage();
                    } else {
                        window.location.hash = "#/login";
                    }
                });
                break;
            case "#/communities":
                communityPage();
                checkLoginStatus(function(isLoggedIn) {
                    if (isLoggedIn) {
                        communityPage();
                    } else {
                        window.location.hash = "#/login";
                    }
                });
            break;
            case "#/users":
                usersPage();
                checkLoginStatus(function(isLoggedIn) {
                    if (isLoggedIn) {
                        usersPage();
                    } else {
                        window.location.hash = "#/login";
                    }
                });
                break;
            default :
                loadHomePage();
                checkLoginStatus(function(isLoggedIn) {
                    loginLogout(isLoggedIn);
                });
                break;
        }
    }
}

// function to load Home Page
function loadHomePage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        ${renderHeroSection()}
        ${renderSubHeroSection()}
        ${renderframeSection()}
        ${renderFooter()}
    `;
    setupEventListeners();
    initializeSlideshow();
}


// function to implement carousel slideshow
function initializeSlideshow() {
    const carousel = document.getElementById('carousel');
    if (carousel) {
        let current = 0;
        const slides = document.querySelectorAll('.carousel-image');
        const totalSlides = slides.length;

        if (totalSlides > 0) { 

            function showSlide(number) {
                slides.forEach((slide) => {
                    slide.classList.remove('active');
                });
                slides[number].classList.add('active');
            }

            function moveSlide(step) {
                current += step;
                if (current >= totalSlides) {
                    current = 0;
                } else if (current < 0) {
                    current = totalSlides - 1;
                }
                showSlide(current);
            }

            // Change image every 5 Seconds
            let interval = setInterval(() => {
                moveSlide(1);
            }, 5000);

            // Pause on hover and resume on leave
            carousel.addEventListener('mouseenter', () => {
                clearInterval(interval);
            });

            carousel.addEventListener('mouseleave', () => {
                interval = setInterval(() => {
                    moveSlide(1);
                }, 5000);
            });
        }
    }
}
















