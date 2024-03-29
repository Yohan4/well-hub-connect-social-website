//login.js

import { renderHeader, renderFooter, closeButtonListener, setupEventListeners, login } from './common.js';

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

