//register.js
import { renderHeader, renderFooter, closeButtonListener,setupEventListeners,
        checkLoginStatus } from './common.js';
        
function validationListeners(){
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    
    username.addEventListener("input", () => {
        const messageBox = document.getElementById("username-message");
        const userValue = username.value;
        const errorUsername = usernameValidation(userValue);
    
        displayValidationMessage(messageBox, errorUsername);
    });

    email.addEventListener("input", () => {
        const messageBox = document.getElementById("email-message");
        const emailValue = email.value;
        const errorEmail = emailValidation(emailValue);
    
        displayValidationMessage(messageBox, errorEmail);
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


const emailValidation = (emailValue) => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

    if(emailValue.length === 0){
        return "Email cannot be empty"
    }else if(!regex.test(emailValue)){
        return "Your email address should in the format of name@domain.com."
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


function validateRegisterForm(event) {
    event.preventDefault();
    
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const profilePictureInput = document.getElementById('profile-picture');

    const usernameValue = usernameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Validate each field and get the error message
    const usernameError = usernameValidation(usernameValue);
    const emailError = emailValidation(emailValue);
    const passwordError = passwordValidation(passwordValue);

    let isValid = true;

    if (usernameError) {
        displayValidationMessage(document.getElementById('username-message'), usernameError);
        isValid = false;
    } 

    if (emailError) {
        displayValidationMessage(document.getElementById('email-message'), emailError);
        isValid = false;
    }

    if (passwordError) {
        displayValidationMessage(document.getElementById('password-message'), passwordError);
        isValid = false;
    } 

    if (!profilePictureInput.files.length) {
        displayValidationMessage(document.getElementById('profile-message'), 'Profile picture cannot be empty');
        isValid = false;
    }

    if (isValid) {
        sendJSONToServer(usernameValue, emailValue, passwordValue, function(err, response) {
            if (err) {
                alert(err);
            } else {
                if (profilePictureInput.files[0]) {
                    sendFile(response.userId, profilePictureInput.files[0]);
                }
            }
        });
    }
};

function formEventListener() {
    document.getElementById('register-form').addEventListener('submit', validateRegisterForm);
}

// function to load register page
export function loadRegisterPage(){
    const app = document.getElementById('app');
    app.innerHTML = `   ${renderHeader()}
                        <section class="wrapper-container">                           
                            <!-- register form -->
                            <form id="register-form">
                                <!-- Cross icon to close the form -->
                                <a href="javascript:void(0);" class="close-icon">
                                    <i class="fa-solid fa-xmark"></i>
                                </a>
                                <p class="register-title">Register</p>
                                <label>
                                    <div class="label-items">
                                        <i class="fas fa-user username-icon"></i>
                                        <input id="username"class="input" type="text" placeholder="Username">
                                    </div>
                                    <div id="username-message"></div>
                                </label>
                                <label>
                                    <div class="label-items">
                                        <i class="fa-solid fa-envelope email-icon"></i></i>
                                        <input id="email" class="input" type="text" placeholder="Email"> 
                                    </div>
                                    <div id="email-message"></div>
                                </label>
                                <label>
                                    <div class="label-items">
                                        <i class="fas fa-lock password-icon"></i>
                                        <input id="password" class="input" type="text" placeholder="Password"> 
                                    </div>
                                    <div id="password-message"></div>
                                </label>

                                <label for="profile-picture-upload" class="custom-file-upload">

                                <label>
                                    <div class="label-items">
                                        <i class="fa-solid fa-camera profile-icon"></i>
                                        <input id="profile-picture" class="input" type="file" accept="image/*"> 
                                    </div>
                                    <div id="profile-message"></div>
                                </label>
                                <button type="submit" class="register-page-button">REGISTER</button>
                                <div class="form-links">
                                    <p>Already have an account?<a href="#/login"class="login-link">Login</a></p>
                                </div>
                            </form>
                        </section>
                        ${renderFooter()}`
            
    formEventListener();
    closeButtonListener();
    setupEventListeners();  
    validationListeners();      
}


// Function to send json data to server
function sendJSONToServer(usernameValue, emailValue, passwordValue, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/users/register', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 201) {
                callback(null, JSON.parse(this.responseText));
            } else {
                callback(JSON.parse(this.responseText).message);
            }
        }
    };
    
    const userObject = JSON.stringify({
        username: usernameValue,
        email: emailValue,
        password: passwordValue
    });

    xhttp.send(userObject);
}


// Function to send image file to server
function sendFile(userId, file) {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    const xhtp = new XMLHttpRequest();
    xhtp.open('POST', '/api/users/' + userId + '/upload', true); 
    xhtp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log('File upload successful');
                alert("Registration successful!");
                clearAndRedirect();
            } else {
                console.error('File upload failed');
                alert("Registration failed. Please try again.");
            }
        }
    };

    xhtp.send(formData);
}

function clearAndRedirect() {
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let profilePictureInput = document.getElementById('profile-picture');
    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    profilePictureInput.value = '';
    checkLoginStatus();
    window.location.hash = "#/home";
}





