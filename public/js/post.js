//post.js
import { renderHeader, renderFooter, searchbar, setupEventListeners} from './common.js';


const postNameValidation = (postName) => {
    let regex = /^[A-Za-z '-]{3,}$/
    if (postName.length === 0) {
        return "Post name cannot be empty";
    } else if (!regex.test(postName)) {
        return "Post name should have a minimum of 3 characters and only alphabets";
    }
};

const descriptionValidation = (description) => {
    if (description.length === 0) {
        return "Description cannot be empty";
    }
};

const communityValidation = (community) => {
    if (community === "Choose Community") {
        return "Please select a community";
    }
};

const displayValidationMessage = (messageBox, errorMessage) => {
    if (!errorMessage) {
        messageBox.textContent = "Valid";
        messageBox.style.color = "#617A55"; 
    } else {
        messageBox.textContent = errorMessage;
        messageBox.style.color = "#FF0000"; 
    }
};

function validatePostForm(event) {
    event.preventDefault();

    const postNameInput = document.getElementById('post-name');
    const descriptionInput = document.getElementById('description-content');
    const communityInput = document.getElementById('community-choice');
    const imageInput = document.getElementById('image-upload');

    const postNameValue = postNameInput.value.trim();
    const descriptionValue = descriptionInput.value.trim();
    const communityValue = communityInput.value;
    const imageFile = imageInput.files[0];

    const postNameError = postNameValidation(postNameValue);
    const descriptionError = descriptionValidation(descriptionValue);
    const communityError = communityValidation(communityValue);

    let isValid = true;

    if (postNameError) {
        displayValidationMessage(document.getElementById('post-name-message'), postNameError);
        isValid = false;
    }

    if (descriptionError) {
        displayValidationMessage(document.getElementById('description-message'), descriptionError);
        isValid = false;
    }

    if (communityError) {
        displayValidationMessage(document.getElementById('community-message'), communityError);
        isValid = false;
    }

    if (isValid) {
        const postData = {
            postName: postNameValue,
            description: descriptionValue,
            community: communityValue,
        };

        const formData = new FormData();
        formData.append('image', imageFile);

        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/api/users/posts');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                if (xhttp.status === 201) {
                    const response = JSON.parse(xhttp.responseText);
                    const postId = response.postId;
                    uploadImage(postId, formData);
                } else {
                    const errorMessage = xhttp.responseText;
                    alert('Error creating post: ' + errorMessage);
                }
            }
        };
        xhttp.send(JSON.stringify(postData));
    }
}

function uploadImage(postId, formData) {
    fetch(`/api/users/posts/${postId}/upload`, {
        method: 'POST',
        body: formData,
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error uploading image');
        }
    })
    .then((data) => {
        if (data.error) {
            alert(data.error);
        } else {
            alert('Post created successfully');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while uploading the image');
    });
}

function formEventListener() {
    document.getElementById('Create-post-form').addEventListener('submit', validatePostForm);
}

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
                                    <div id="post-name-message"></div>
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
                                    </div>
                                    <div id="community-message"></div>
                                </label>
                                <label>
                                    <div class="post-label-items">
                                        <textarea id="description-content" class="input" placeholder="Enter description content"></textarea>
                                    </div>
                                    <div id="description-message"></div>
                                </label>
                                <div class="post-label-items">
                                    <label class="upload-image-label" for="image-upload">
                                        <i class="fa-solid fa-upload"></i>
                                        Upload 
                                        <input type="file" id="image-upload" class="image-upload" accept="image/*">
                                    </label>
                                </div>
                                <button type="submit" class="create-button">CREATE</button>
                            </form>
                        </section>
                        ${renderFooter()}`

    formEventListener();
    setupEventListeners();                
}



