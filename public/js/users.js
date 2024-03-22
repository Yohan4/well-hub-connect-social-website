import { renderHeader, renderFooter, searchbar, setupEventListeners} from './common.js';
// function to load userspage
export function usersPage(){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        ${searchbar()}
                        <div class="users-grid">
                            <!-- Suggestions section -->
                            <h2 class="section-heading">Suggestions ></h2>
                            <div class="users-row">
                                <div class="users-card">
                                    <img src="./assets/images/valeria.jpg" alt="profile picture">
                                    <a href="#/user/Valeria-Uya" class="people-name">Valeria Uya</a>
                                    <button class="follow-button">Follow</button>
                                </div>
                                <div class="users-card">
                                    <img src="./assets/images/melo.jpg" alt="profile picture">
                                    <a href="#/user/Melo-smith" class="people-name">Melo Smith</a>
                                    <button class="follow-button">Follow</button>
                                </div>
                                <div class="users-card">
                                    <img src="./assets/images/chloe.jpg" alt="profile picture">
                                    <a href="#/user/Halabi-wabi" class="people-name">Halabi Wabi</a>
                                    <button class="follow-button">Follow</button>
                                </div>
                            </div>

                            <!-- Following section -->
                            <h2 class="section-heading">Following ></h2>
                            <div class="users-row">
                                <div class="users-card-following">
                                    <i class="fa-sharp fa-solid fa-star shaded-icon"></i>
                                    <img src="./assets/images/mo.jpg" alt="profile picture">
                                    <a href="#/user/Zabine-Salah" class="people-name">Zabine Salah</a>
                                    <button class="follow-button">Following</button>
                                </div>
                                <div class="users-card-following">
                                    <i class="fa-sharp fa-solid fa-star shaded-icon"></i>
                                    <img src="./assets/images/jota.jpg" alt="profile picture">
                                    <a href="#/user/Diogo-Jota" class="people-name">Diogo Jota</a>
                                    <button class="follow-button">Following</button>
                                </div>
                                <div class="users-card-following">
                                <i class="fa-sharp fa-regular fa-star unshaded-icon"></i>
                                <img src="./assets/images/andrea.jpg" alt="profile picture">
                                <a href="#/user/Andrea-zeleta" class="people-name">Andrea zeleta</a>
                                <button class="follow-button">Following</button>
                            </div>
                            </div>
                        </div>
                        ${renderFooter()}`
    setupEventListeners()                  
}



