import { renderHeader, renderFooter, closeButtonListener,setupEventListeners } from './common.js';


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
    } else {
        displayValidationMessage(document.getElementById('username-message'), '');
    }

    if (emailError) {
        displayValidationMessage(document.getElementById('email-message'), emailError);
        isValid = false;
    } else {
        displayValidationMessage(document.getElementById('email-message'), '');
    }

    if (passwordError) {
        displayValidationMessage(document.getElementById('password-message'), passwordError);
        isValid = false;
    } else {
        displayValidationMessage(document.getElementById('password-message'), '');
    }

    if (!profilePictureInput.files.length) {
        displayValidationMessage(document.getElementById('profile-message'), 'Profile picture cannot be empty');
        isValid = false;
    } else {
        displayValidationMessage(document.getElementById('profile-message'), '');
    }

    if (isValid) {
        sendToServer(usernameValue, emailValue, passwordValue, profilePictureInput.files[0]);
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

// send new userdata to server
function sendToServer(usernameValue, emailValue, passwordValue){
    const formData = new FormData();
    formData.append('username', usernameValue);
    formData.append('email', emailValue);
    formData.append('password', passwordValue);

    const profileInput = document.getElementById('profile-picture');
    if (profileInput.files[0]) {
        formData.append('profilePicture', profileInput.files[0]);
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/users/register', true); 
    xhttp.send(formData);
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 201) {
            console.log('Registration Successful');
            
        } else if (this.readyState === 4) {
            console.error('Registration Failed');
            
        }
    };

};




