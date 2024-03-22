// function to render hero section
export function renderHeroSection() {
    return `    <!-- Hero section -->
                <div id="hero-section">
                <div class="content">
                    <h1>Connect to wellness</h1>
                    <p>Join the journey to health and happiness with our supportive community!</p>
                    <button class="learn-more-button">LEARN MORE</button>
                </div>
                <!-- Carousel-part -->
                <div id="carousel">
                    <div class="carousel-image ">
                        <img src="./assets/images/Meditation-image.jpg" alt="Mindfullness and Wellbeing">
                    </div>
                    <div class="carousel-image active">
                        <img src="./assets/images/Healthy-image.jpg" alt="Healthy & Vegetarian Lifestyle">
                    </div>
                    <div class="carousel-image">
                        <img src="./assets/images/Sports.webp" alt="Sports">
                    </div>
                </div>    
            </div>`;
}

// function to render sub-hero section
export function renderSubHeroSection() {
    return `<!-- Sub Hero Section -->
            <section id="sub-hero-section">
                <h2 class="instruction">Begin your journey</h2>
                <div class="description">
                    <p>Well Hub Connect is an interactive platform where wellness enthusisats
                    can create, share, and engage with content across four key communities:
                    Sports Enthusiasts, Healthy Diet, Vegetarian Lifestyle, and Mindfullness
                    and wellbeing. Dive into a world of connection and growth with user-generated
                    posts, community discussion, and personal networking opportunities.
                    </p>
                </div>
            </section>`;
}

// function to render frame section
export function renderframeSection(){
    return `<!-- Frame section -->
            <section id="frame-container">
                <div class="frame">
                    <div class="wrapper">
                        <img src="./assets/images/feed-home.webp" alt="My feed">
                    </div>
                    <button id="feed-button">My Feed</button>
                </div>
                <div class="frame">
                    <div class="wrapper">
                        <img src="./assets/images/community-home.webp" alt="Communities">
                    </div>
                    <button id="communities-button">Communities</button>
                </div>
                <div class="frame">
                    <div class="wrapper">
                        <img src="./assets/images/users-home.webp" alt="Users">
                    </div>
                    <button id="users-button">Users</button>
                </div>
            </section>`
}

