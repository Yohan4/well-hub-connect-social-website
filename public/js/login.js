import { renderHeader, renderFooter, closeButtonListener, setupEventListeners } from './common.js';

//function to load login page
export function loadLoginPage(){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <section class="wrapper-container">
                            <!-- login form -->
                            <form id="login-form">
                                <!-- Cross icon to close the form -->
                                <a href="javascript:void(0);" class="close-icon">
                                    <i class="fa-solid fa-xmark"></i>
                                </a>
                                <p class="login-title">login</p>
                                <label>
                                    <div class="label-items">
                                        <i class="fas fa-user username-icon"></i>
                                        <input id="username"class="input" type="text" placeholder="Username" required>
                                    </div>
                                    <div id="message"></div>
                                </label>
                                <label>
                                    <div class="label-items">
                                        <i class="fas fa-lock password-icon"></i>
                                        <input id="password" class="input" type="text" placeholder="Password" required> 
                                    </div>
                                    <div id="message"></div>
                                </label>
                                <button type="submit" class="login-page-button">LOGIN</button>
                                <div class="form-links">
                                    <p>Don't have an account?<a href="#/register"class="register-link">Register</a></p>
                                </div>
                            </form>
                        </section>
                        ${renderFooter()}`
    closeButtonListener();
    setupEventListeners()                     
}

