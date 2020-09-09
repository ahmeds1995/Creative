// Set The Page Color In The Local Storage 
let pageColor = localStorage.getItem('page-color');

if(pageColor !== null){

    document.documentElement.style.setProperty('--main-color', localStorage.getItem('page-color'));

    // Remove Active Class From All Elements
   document.querySelectorAll('.colors-list li').forEach(element => {

        element.classList.remove('active');

    // Add Active Class To The Main Color
    if (element.dataset.color === pageColor){
        element.classList.add('active');
    }
    });
}

// Set Local Variables To Randomize BG
let backgroundOption = true;
let backgroundInterval;

// Set The Random Background In The Local Storage 
let randomBackground = localStorage.getItem('random-background');

if(randomBackground !== null){

    if(randomBackground === 'true'){

        backgroundOption = true; 
    }else
    {
        backgroundOption = false; 
    }
    // Remove Active Class From All Elements
   document.querySelectorAll('.random-bg span').forEach(element => {

        element.classList.remove('active');
    });

    // Add Active Class To The Selected Span
    if (randomBackground === 'true'){

        document.querySelector('.random-bg .yes').classList.add('active');
    }else {

        document.querySelector('.random-bg .no').classList.add('active');
    }
}

// Set Local Storage Of The Bullets
let bulletsLocalItem = localStorage.getItem('bullets-option');

if(bulletsLocalItem !== null){

    document.querySelectorAll('.bullets-option span').forEach(span =>{

        span.classList.remove('active');
    });

    if(bulletsLocalItem === 'block'){

        document.querySelector('.nav-bullets').style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');

    }else{

        document.querySelector('.nav-bullets').style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}

// Settings Box Styling With JS

// Select The Settings Box Element
let settingsBoxIcon = document.querySelector('.settings-box-icon .fa-gear');

// Add Spin Class To The Icon When Clicking
settingsBoxIcon.onclick = function(){

    // Toggle Class Fa-spin For Rotation On Itself
    this.classList.toggle('fa-spin');
    // Toggle Class Opened On Main Settings Box
    document.querySelector('.settings-box').classList.toggle('opend');
};

// Change The Site Color

// Select The Colors In Array
const colors = Array.from(document.querySelectorAll('.colors-list li'));

// Set The Selected Color To The Page
colors.forEach(color => {

    color.addEventListener('click', (e) => {

        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // Set The Selected Color To The Local Storage
        localStorage.setItem('page-color', e.target.dataset.color);
        // Remove Active Class From All Elements
        e.target.parentElement.querySelectorAll('.active').forEach(element => {

            element.classList.remove('active');
        });
        // Add Active Class To The Selected Element
        e.target.classList.add('active');
    });
});

// Random Background Option
const randomBg = Array.from(document.querySelectorAll('.random-bg span'));

// Loop On The Random BG Spans (yes / no)
randomBg.forEach(bg => {

    bg.addEventListener('click', (e) => {
        // Remove Active Class From All Spans
        e.target.parentElement.querySelectorAll('.active').forEach(element => {

            element.classList.remove('active');
        });
        // Add Active Class To The Selected Element
        e.target.classList.add('active');

        // Check The Selected Option
        if (e.target.dataset.background === 'yes'){

            backgroundOption = true;
            randomizeBg();
            localStorage.setItem('random-background', true);
        }else{

            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('random-background', false);
        } 
    });

});

// Reset Local Storage

let resetLocalStorage = document.querySelector('.settings-box button');

resetLocalStorage.onclick = function(){

    localStorage.clear();

    window.location.reload();
};

// Select The Landing Page Element
let landingPage = document.querySelector('.landing-page');

// Collect The Background Images In The ImagesArray
let imagesArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];

// Function To Randomize The BG
function randomizeBg(){

    if(backgroundOption === true){

        // Change The Background Image Every Certain Interval
        backgroundInterval = setInterval(() => {

            // Generate Random Number From The ImagesArray Length
            let randonNum = Math.floor(Math.random() * imagesArray.length);
    
            landingPage.style.backgroundImage = 'url("images/'+ imagesArray[randonNum] +'")';
        }, 5000)
    
    }
}

randomizeBg();

// Select Bullets To Control Display It 
let bulletsSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

// Show And Hide The Bullets
bulletsSpan.forEach(span => {

    span.addEventListener('click', (e) =>{

    if (e.target.dataset.display === "show"){

        bulletsContainer.style.display = 'block';
        localStorage.setItem('bullets-option', 'block');
    }else{

        bulletsContainer.style.display = 'none';
        localStorage.setItem('bullets-option', 'none');
    }

    // Remove Active Class From All Spans
    e.target.parentElement.querySelectorAll('.active').forEach(element => {

        element.classList.remove('active');
    });
    // Add Active Class To The Selected Element
    e.target.classList.add('active');
 });
});

// Make The Skills Progress Animate When Scrolling it

// Select The Skills Selector

let ourSkills = document.querySelector('.skills');

// What Will Happen When Scrolling 
window.onscroll = function(){

    // Return ourSkills Element Height Including Padding, Margin, And Border
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Return The Part Above ourSkills Element Height
    let skillsOffsetTop = ourSkills.offsetTop;
    // Return The Window Height
    let windowHeight = this.innerHeight;
    // Return The Part Of Page I Have Already Scrolled
    let scrolledPart = this.pageYOffset;
    // Check The Scrolled Height Of My Page 
    if (scrolledPart > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        let skillsProgress = document.querySelectorAll('.skills-box .skill-progress span');

        skillsProgress.forEach( skillProgress => {

            skillProgress.style.width = skillProgress.dataset.progress;
        })
    }
}

// Create Pop-Up With The Image

// Collect All Gallery Images In An Array
let ourGallery = document.querySelectorAll('.gallery .images-box img');

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement('div');

        // Add Classname To It
        overlay.className = 'popup-overlay';
        // Append The Overlay To The Body
        document.body.appendChild(overlay);

        // Create Pop-Up Box
        let popupBox = document.createElement('div');
        // Add Class To The Popup Box
        popupBox.className = 'popup-box';
        // Check The img.alt
        if(img.alt !== null){

        // Create PopupBox Heading
        let popupBoxHeading = document.createElement('h3');
        // Create PopupBoxHeading Text
        let headingText = document.createTextNode(img.alt);
        // Append The Text To The Heading
        popupBoxHeading.appendChild(headingText);
        // Append The PopupBoxHeading To The PopupBox
        popupBox.appendChild(popupBoxHeading);

        }
        // Create Pop-Up Image
        let popupImage = document.createElement('img');
        // Set The Image Src
        popupImage.src = img.src;

        //Append The PopupImage To The PopupBox
        popupBox.appendChild(popupImage);

         //Append The PopupBox To The body
         document.body.appendChild(popupBox);

         // Create Close Button Of The PopupBox
         let closeBtn = document.createElement('span');
         // Add Class To The Close Button
         closeBtn.className = 'close-btn';
         // Create Close Button Text
         let closeBtnText = document.createTextNode('X');
         // Append The TextNode To The Close Button
         closeBtn.appendChild(closeBtnText);
         // Append Close Button To The PopupBox
         popupBox.appendChild(closeBtn);
    });

});

// Close The PopupBox 
document.addEventListener('click', (e) => {

    if (e.target.className == 'close-btn'){

        // Remove PopupBox Element
        e.target.parentNode.remove();

        //Remove Overlay 
        document.querySelector('.popup-overlay').remove();
    } 
});

// Select All Bullets 
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

// Select All Links
const allLinks = document.querySelectorAll('.header .navbar li a');

// Function To Move To Any Section In The Page By Clicking On The Link Or Bullet
function goTOSpecialSection(elements){

    elements.forEach(element => {

        element.addEventListener('click', (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
            });
        });
    });
}

goTOSpecialSection(allBullets);
goTOSpecialSection(allLinks);


// Toggle Menu
let toggleBtn = document.querySelector('.header .toggle-menu');

let tLinks = document.querySelector('.navbar');

toggleBtn.onclick =function(e){

    e.stopPropagation();

    // Add Active Class To The Button
    this.classList.toggle('menu-active');

    // Add Open Class To The Menu
    tLinks.classList.toggle('open');
}
 
tLinks.onclick = function(e){

    e.stopPropagation();
}

// Click Anywhere Outside The Menu And Toggle Button
document.addEventListener('click', (e)=>{

    if (e.target !== toggleBtn && e.target !== tLinks){

        if(tLinks.classList.contains('open')){

            // Add Active Class To The Button
            toggleBtn.classList.toggle('menu-active');

            // Add Open Class To The Menu
            tLinks.classList.toggle('open');
        }
    }
});