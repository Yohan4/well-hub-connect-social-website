import { renderHeader, renderFooter, setupEventListeners } from './common.js';
import { loadLoginPage } from './login.js';
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
                break;
            case "#/login":
                loadLoginPage();
                break;
            case "#/create":
                createPostPage();
                break;
            case "#/feed":
                feedPage();
                break;
            case "#/communities":
                communityPage();
            break;
            case "#/users":
                usersPage();
                break;
            default :
                loadHomePage();
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

















