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
                        <div class="post-container">
                            <h2 class="post-user">Zabine Salah</h2>
                            <div class="post-community-name">Sport Enthusiast</div>
                            <div class="post">
                                <img src="./assets/images/swimming-post.jpg" alt="Swimming Post image" class="post-image">
                                <i class="fa-sharp fa-solid fa-heart post-like-icon"></i>
                                <p class="post-caption">Just finished an amazing 5k swim, feeling great! #Swimming #Fitness</p>
                            </div>
                        </div>
                        ${renderFooter()}`
    setupEventListeners(sports)                  
}

// function to load healthy diet page
export function healthy(health){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <h1 class="username-title">${health}'s Page</h1>
                        ${searchbar()}
                        <div class="post-container">
                        <h2 class="post-user">Diogo Jota</h2>
                        <div class="post-community-name">Healthy Diet</div>
                        <div class="post">
                            <img src="./assets/images/juice-post.webp" alt="Juice Post image" class="post-image">
                            <i class="fa-sharp fa-solid fa-heart post-like-icon"></i>
                            <p class="post-caption">Starting the day with a fresh green juice. #HealthyLiving</p>
                        </div>
                    </div>
                        ${renderFooter()}`
    setupEventListeners(health)                  
}

// function to load vegetarian lifestyle page
export function vegetarian(vegetarian){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <h1 class="username-title">${vegetarian}'s Page</h1>
                        ${searchbar()}
                        <div class="post-container">
                        <h2 class="post-user">Moricio Pep</h2>
                        <div class="post-community-name">Vegetarian lifestyle</div>
                        <div class="post">
                            <img src="./assets/images/salad.webp" alt="Juice Post image" class="post-image">
                            <i class="fa-sharp fa-solid fa-heart post-like-icon"></i>
                            <p class="post-caption">
                                Enjoy people!
                                Meditarian Quinoa Salad Recipe :
                                1 cup quinoa
                                2 cups water or vegetable broth
                                1 can (15 ounces) chickpeas, drained and rinsed
                                1 medium cucumber, diced
                                1 bell pepper, diced
                                1/2 red onion, finely chopped
                                1 cup cherry tomatoes, halved
                                1/2 cup Kalamata olives, pitted and sliced
                                1/2 cup feta cheese, crumbled (optional for vegan)
                                1/4 cup fresh parsley, chopped
                                Salt and pepper to taste
                            </p>
                        </div>
                    </div>
                        ${renderFooter()}`
    setupEventListeners(vegetarian)                  
}

// function to load mindfullness and wellbeing  page
export function wellbeing(wellbeing){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <h1 class="username-title">${wellbeing}'s Page</h1>
                        ${searchbar()}
                        <div class="post-container">
                        <h2 class="post-user">Chloe Wong</h2>
                        <div class="post-community-name">Mindfulness and Wellbeing</div>
                        <div class="post">
                            <img src="./assets/images/Yoga.webp" alt="Yoga" class="post-image">
                            <i class="fa-sharp fa-solid fa-heart post-like-icon"></i>
                            <p class="post-caption">
                            Join us for a serene journey amidst nature at 'Yoga in the Park' on March 30th. 
                            Embrace the calm of sunset as we flow through poses that soothe the soul and unite body and mind. 
                            Bring your mat, find your space, and be part of a community celebrating peace and wellness. 
                            #YogaInThePark #FindYourZen
                            </p>
                        </div>
                    </div>
                        ${renderFooter()}`
    setupEventListeners(wellbeing)                  
}

