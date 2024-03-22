import { renderHeader, renderFooter, searchbar, setupEventListeners} from './common.js';

// fucntion to load profile page
export function profilePage(username){
    const app = document.getElementById('app');
    app.innerHTML = `   <!-- Profile page -->
                        ${renderHeader()}
                        <h1 class="username-title">${username}'s Profile</h1>
                        ${searchbar()}
                        <!-- View comment Button -->
                        <div class="button-container">
                            <button class="view-comments-button">View Comments</button>
                        </div>
                        <div class="post-container">
                            <h2 class="post-user">Zabine Salah</h2>
                            <div class="post-community-name">Sport Enthusiast</div>
                            <div class="post">
                                <img src="./assets/images/swimming-post.jpg" alt="Swimming Post image" class="post-image">
                                <i class="fa-sharp fa-solid fa-heart post-like-icon"></i>
                                <p class="post-caption">Just finished an amazing 5k swim, feeling great! #Swimming #Fitness</p>
                            </div>
                        </div>

                        <div class="post-container">
                            <h2 class="post-user">Diogo Jota</h2>
                            <div class="post-community-name">Healthy Diet</div>
                            <div class="post">
                                <img src="./assets/images/juice-post.webp" alt="Juice Post image" class="post-image">
                                <i class="fa-sharp fa-solid fa-heart post-like-icon"></i>
                                <p class="post-caption">Starting the day with a fresh green juice. #HealthyLiving</p>
                            </div>
                        </div>
                        <!-- Comment section -->
                        <div class="comment-section">
                            <h3 class="comments-header">Comments</h3>
                            <form class="comment-form">
                                <h4 class="title-header">Please enter the required details below</h3>
                                <input type="text" class="form-control" id="username" placeholder="Enter Your Username" required>
                                <input type="text" class="form-control" placeholder="Enter Post Name" required>
                                <textarea id="comment"class="form-control" placeholder="Enter your comments here..." required></textarea>
                                <button type="submit" class="comment-button">Post Comment</button>
                            </form>
                        </div>
                        ${renderFooter()}`
    setupEventListeners(username)                  
}

// function to load comments
export function loadComments(username){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <h1 class="username-title">${username}'s Profile</h1>
                        ${searchbar()}
                        <div class="button-container">
                            <button class="hide-comments-button">Hide Comments</button>
                        </div>
                        <div class="comments-container">
                            <!-- comments of a user on a post -->
                            <div class="comment">
                                <div class="comment-header">
                                    <span>Pablo Alcacer</span> commented on <span>Swimming post</span>
                                </div>
                                <div class="comment-body">
                                    Oh yess! That's was so nice cool! Nice to meet you there. Hopefully will see you next year :)
                                </div>
                            </div>
                            
                            <!-- Another comments of a user on a post -->
                            <div class="comment">
                                <div class="comment-header">
                                    <span class="comment-username">Tom Jerry</span> commented on <span class="comment-post-name">Juice recipe post</span>
                                </div>
                                <div class="comment-body">
                                    That's a nice recipe here. I want to try it too. Hopefully it as good as yours ahahahaha
                                </div>
                            </div>

                            <!-- Another comments of a user on a post -->
                            <div class="comment">
                                <div class="comment-header">
                                    <span class="comment-username">Mo salah</span> commented on <span class="comment-post-name">Juice recipe post</span>
                                </div>
                                <div class="comment-body">
                                    That's a look delicious. You seem to be a master at making great juice!
                                </div>
                            </div>
                        </div>

                        
                        ${renderFooter()}`
    setupEventListeners(username)                  
}

// fucntion to call back profilepage
export function hideComments(username){
    profilePage(username);
}
