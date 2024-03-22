import { renderHeader, renderFooter, searchbar, setupEventListeners} from './common.js';

// function to load feed page
export function feedPage(){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        ${searchbar()}
                        <!-- Feed page -->
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
                        ${renderFooter()}`
    setupEventListeners()                  
}


