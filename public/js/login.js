//login.js

import { renderHeader, renderFooter, closeButtonListener, setupEventListeners } from './common.js';

function validationListeners(){
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    
    username.addEventListener("input", () => {
        const messageBox = document.getElementById("username-message");
        const userValue = username.value;
        const errorUsername = usernameValidation(userValue);
    
        displayValidationMessage(messageBox, errorUsername);
    });

    password.addEventListener("input", () => {
        const messageBox = document.getElementById("password-message");
        const passValue = password.value;
        const errorPassword = passwordValidation(passValue);
    
        displayValidationMessage(messageBox, errorPassword);
    });
}


const usernameValidation = (userValue) => {
    let regex = /^(?=.*[a-zA-Z]{4,})[\w]+$/;

    if (userValue.length === 0){
        return "Username cannot be empty"
    }  else if(userValue.length < 8) {
        return "Username must at least be 8 characters long"
    }  else if(!regex.test(userValue)){
        return "Username can only have underscore, digits & minimum of 4 alphabets"
    }
};


const passwordValidation = (passValue) => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[?$_&!@#^&*-])(?=.*[0-9])[A-Za-z0-9?$_&!@#%^*-]{8,}$/;

    if(passValue.length === 0){
        return "Password cannot be empty"
    }else if(!regex.test(passValue)){
        return "Password should have a minimum of 8 characters and have at least 1 symbol, digit, lowercase and uppercase letter!"
    }
}
   
const displayValidationMessage = (messageBox, errorMessage) => {
    if (!errorMessage) {
        messageBox.textContent = "Valid";
        messageBox.style.color = "#617A55"; 
    } else {
        messageBox.textContent = errorMessage;
        messageBox.style.color = "#FF0000"; 
    }
};


function validateLoginForm(event) {
    event.preventDefault();
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');


    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Validate each field and get the error message
    const usernameError = usernameValidation(usernameValue);
    const passwordError = passwordValidation(passwordValue);

    let isValid = true;

    if (usernameError) {
        displayValidationMessage(document.getElementById('username-message'), usernameError);
        isValid = false;
    } 

    if (passwordError) {
        displayValidationMessage(document.getElementById('password-message'), passwordError);
        isValid = false;
    } 

    if (isValid) {
        login(usernameValue, passwordValue, function(err, response) {
            if (err) {
                alert("Login Failed! Incorrect username or password")
                console.error(err);
            } 
        });
    }
};

function formEventListener() {
    document.getElementById('login-form').addEventListener('submit', validateLoginForm);
}

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
                                <p class="login-title">Login</p>
                                <label>
                                    <div class="label-items">
                                        <i class="fas fa-user username-icon"></i>
                                        <input id="username"class="input" type="text" placeholder="Username">
                                    </div>
                                    <div id="username-message"></div>
                                </label>
                                <label>
                                    <div class="label-items">
                                        <i class="fas fa-lock password-icon"></i>
                                        <input id="password" class="input" type="text" placeholder="Password"> 
                                    </div>
                                    <div id="password-message"></div>
                                </label>
                                <button type="submit" class="login-page-button">LOGIN</button>
                                <div class="form-links">
                                    <p>Don't have an account?<a href="#/register"class="register-link">Register</a></p>
                                </div>
                            </form>
                        </section>
                        ${renderFooter()}`

    formEventListener();
    closeButtonListener();
    setupEventListeners();  
    validationListeners();                      
}

function login(username, password, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/users/login', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200 || this.status === 201) {
                callback(null, JSON.parse(this.responseText));
                alert("Login successful!");
                clearAndRedirect();
            } else {
                callback(new Error('Login failed'), null);
            }
        }
    };


    const credentials = JSON.stringify({ username, password });
    xhttp.send(credentials);
}

function logout() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/users/logout', true); 
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
            console.log('Logged out successfully');
            checkLoginStatus();
        }
    };
}

function clearAndRedirect() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password')
    usernameInput.value = '';
    passwordInput.value = '';
    checkLoginStatus();
    window.location.hash = "#/home";
}

function loginLogout(isLoggedIn) {
    const loginButton = document.getElementById('login-button');
    if (isLoggedIn) {
        loginButton.textContent = 'LOGOUT';
        loginButton.id = 'logout-button';
        loginButton.removeEventListener('click', () => {
            window.location.hash = '#/login';
        });
        loginButton.addEventListener('click', logout);
    } else {
        loginButton.textContent = 'LOGIN';
        loginButton.id = 'login-button';
        loginButton.removeEventListener('click', logout);
        loginButton.addEventListener('click', () => {
            window.location.hash = '#/login';
        });
    }
}


export function checkLoginStatus(callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/users/session-status', true);
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            loginLogout(response.isLoggedIn);
            if (callback) {
                callback(response.isLoggedIn);
            }
        }
    };
    xhttp.send();
}


