import { renderHeader, renderFooter, searchbar, setupEventListeners} from './common.js';

// function to load create post page
export function createPostPage(){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        ${searchbar()}
                        <section class="wrapper-container">
                            <!-- Create post form -->
                            <form id="Create-post-form">
                                <h2 class="create-post-title">Create Post</h2>
                                <label>
                                    <div class="post-label-items">
                                        <input id="post-name"class="input" type="text" placeholder="Enter Post Name">
                                    </div>
                                </label>
                                <label>
                                    <div class="post-label-items">
                                        <select id="community-choice" class="input">
                                            <option value="Choose Community" disabled selected>Choose Community</option>
                                            <option value="Sports Enthusiasts">Sports Enthusiasts</option>
                                            <option value="Healthy Diet">Healthy Diet</option>
                                            <option value="Vegetarian Lifestyle">Vegetarian Lifestyle</option>
                                            <option value="Mindfullness and wellbeing">Mindfullness and wellbeing</option>
                                        </select>
                                </label>
                                <label>
                                    <div class="post-label-items">
                                        <textarea id="description-content" class="input" placeholder="Enter description content"></textarea>
                                    </div>
                                </label>
                                <div class="post-label-items">
                                    <label class="upload-image-label" for="image-upload">
                                        <i class="fa-solid fa-upload"></i>
                                        Upload 
                                        <input type="file" id="image-upload" class="image-upload" hidden>
                                    </label>
                                </div>
                                <button type="submit" class="create-button">CREATE</button>
                            </form>
                        </section>
                        ${renderFooter()}`
    setupEventListeners()                  
}



