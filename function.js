document.addEventListener('DOMContentLoaded', function() {
    // Get the required elements
    const imageEnlarger = document.getElementById('image-enlarger');
    const enlargedImage = document.getElementById('enlarged-image');
    const repo_elems = document.querySelectorAll('[class*="repo"]')
    const flag_repo_show = false;

    repo_elems.forEach((repo_elem) => {repo_elem.classList.remove('show')});

    const repoImages =[];
    var animationOver = false;

    // Add a scroll event listener
    window.addEventListener('scroll', function() {
    // Update the value of --scroll-y custom CSS variable
    imageEnlarger.style.setProperty('--scroll-y', `${window.scrollY}px`);


    const repo_elems = document.querySelectorAll('[class="repo"]');

    if (window.scrollY < 100)
    {
        repo_elems.forEach((repo_elem) => {repo_elem.classList.remove('show')});
    }
    else{
        repo_elems.forEach((repo_elem) => {repo_elem.classList.add('show')});
    }
    });

    // Select all <div> elements with class name "repos"
    const reposDivs = document.querySelectorAll('.repo-img');

    reposDivs.forEach((div) => {
        // Select all <img> elements inside the current <div>
        const images = div.querySelectorAll('img');
      
        // Iterate over the selected <img> elements
        images.forEach((img) => {
          // Add each image to the array
          repoImages.push(img);
        });
      });


    // Add click event listeners to each image
    for (let i = 0; i < repoImages.length; i++) {
        repoImages[i].addEventListener('click', function() {
            // Check if the clicked image is within the image enlarger
            if (!imageEnlarger.contains(this)) {
                // Get the source of the clicked image
                const src = this.src;
                // Set the source of the enlarged image
                enlargedImage.src = src;
                // Open the image enlarger
                imageEnlarger.classList.remove('image-enlarger-closed');
                imageEnlarger.classList.add('image-enlarger-open');
                // Scroll to the image enlarger
                imageEnlarger.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Add click event listener to close the image enlarger
    imageEnlarger.addEventListener('click', function() {
        // Close the image enlarger
        imageEnlarger.classList.remove('image-enlarger-open');
        imageEnlarger.classList.add('image-enlarger-closed');
    });

    //===========================================Show Bio==================================================================================//

    const whoAmICol = document.getElementById('who-am-i-col');
    const initialHeight = whoAmICol.clientHeight;
    whoAmICol.style.height = initialHeight + 'px';
    
    const nameElement = document.getElementById('name');
    const whoAmITextElement = document.getElementById('who-am-i-text');
    const whoAmIElement = document.getElementById('who-am-i');
    const mouseOutElement = document.getElementById('mouseOut');
    
    nameElement.addEventListener('click', function(event) {

      const mouseX = event.clientX;
      const mouseY = event.clientY;
      whoAmIElement.style.display = 'flex';
      whoAmIElement.style.flexDirection = 'row';
      whoAmITextElement.style.display = 'flex';
      whoAmITextElement.style.paddingLeft = '50px';
      nameElement.style.writingMode = 'horizontal-tb';
      nameElement.style.textOrientation = 'upright';
      nameElement.style.transform = 'rotate(270deg)';
      nameElement.style.marginRight = '10px'; // Adjust the margin as needed
      mouseOutElement.style.backgroundColor = "black";
      mouseOutElement.style.borderRadius = "50%";
      mouseOutElement.style.top = mouseY + "px";
      mouseOutElement.style.left = mouseX + "px";
      mouseOutElement.style.display = "block";
    });
    
    mouseOutElement.addEventListener('mouseout', function() {
      whoAmIElement.style.display = 'block';
      whoAmITextElement.style.display = 'none';
      nameElement.style.writingMode = 'horizontal-tb';
      nameElement.style.textOrientation = 'mixed';
      nameElement.style.transform = 'rotate(0deg)';
      nameElement.style.marginRight = '0'; // Reset the margin
      mouseOutElement.style.display = 'none';
    });
    
    


    //===========================================Radial Dial==============================================================================//


    function update_colors(sliderHue){

        var hueColor = sliderHue;

         // Select all elements and check their computed style
         const elements = document.querySelectorAll('*');
         const hueImages = document.querySelectorAll('[class*="images-hue"]');
         const specialties = document.querySelectorAll('.specialties');


         const newRotation = hueColor - 80;

        var newColor = hueColor;
        var colorRotation = 0;

         specialties.forEach((element) => {
            const computedStyle = getComputedStyle(element);
                
                if (colorRotation == 0){
                    newColor = hueColor;
                    colorRotation += 1;
                }else{
                   // newColor += 20;
                   newColor = hueColor;
                }
                
                if (newColor > 360){
                    newColor = (newColor - 360);
                }
                element.style.backgroundColor = `hsl(${newColor},100%,75%)`;

            });

         elements.forEach((element) => {
            const computedStyle = getComputedStyle(element);
                    if (computedStyle.color == 'rgb(255, 255, 255)'){
                        element.style.color = `hsl(${hueColor},100%,75%)`;
                    }
                    

            });
        hueImages.forEach((image) => {
            if (image.classList.contains('no-invert')){
                image.style.filter = `invert(0%) brightness(1) sepia(1) saturate(100) hue-rotate(${newRotation}deg)`;
            image.style.mixBlendMode = 'screen';
            image.style.zIndex = '1';
            }
            else {
                image.style.filter = `invert(100%) brightness(1) sepia(1) saturate(100) hue-rotate(${newRotation}deg)`;
                image.style.mixBlendMode = 'screen';
                image.style.zIndex = '1';
            }

        });
    }


    const slider = document.getElementById('mySlider');
    slider.value = 160;
    const sliderValue = document.getElementById('sliderValue');

    slider.addEventListener('input', () => {
    const value = slider.value;
    sliderValue.textContent = value;

        if (animationOver){
            var hueColor = slider.value;
            update_colors(hueColor);
        }
    });



    //===========================================Floating-Circle==============================================================================//

    const object = document.getElementsByClassName('floating-circle')[0];
    const specialties = document.getElementsByClassName('specialties');

    function update_path() {
        var path = [];
        var objects = document.getElementsByClassName('specialties');
        
      
        Array.from(objects).forEach((specialty) => {
          const specialtyRect = specialty.getBoundingClientRect();
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const position = {
            x: specialtyRect.left + scrollLeft,
            y: specialtyRect.top + scrollTop
          };
          path.push(position);
        });
      
        return path;
      }
      




    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
    
    function moveObjectAlongPath() {
        let index = 0;
        let currentPosition = { x: 0, y: 0 };
      
        
        const interval = setInterval(() => {

            var hueColor = slider.value;
            path = update_path(); 
            
            if (index < path.length) {
                const target = path[index];
                let dx = (target.x - currentPosition.x) * 0.01;
                let dy = (target.y - currentPosition.y) * 0.01;
        
                if (Math.abs(dx) + Math.abs(dy) < 10) {
                const scaleFactor = 10 / (Math.abs(dx) + Math.abs(dy));
                dx *= scaleFactor;
                dy *= scaleFactor;
                }
        
                currentPosition.x += dx;
                currentPosition.y += dy;
        
                object.style.left = currentPosition.x + 'px';
                object.style.top = currentPosition.y + 'px';
        
                if (Math.abs(target.x - currentPosition.x) < 10 && Math.abs(target.y - currentPosition.y) < 10) {
                specialties[index].style.backgroundColor = `hsl(${hueColor},100%,75%)`;
                if (index == specialties.length - 1){
                    object.style.visibility = "hidden";
                    object.style.left = 0;
                    object.style.top = 0;
                    const specialtiesHeight = getComputedStyle(specialties[index]).height;
                    Array.from(specialties).forEach((specialty) => {
                        //specialty.style.height = 50 + "px";
                        //specialty.style.aspectRatio = "1/1";
                        specialty.style.transform = 'scale(0.5)';
                    });

                    const indexA = index;
                    delay(1000).then(() => {

                        
                        Array.from(specialties).forEach((specialty) => {
                            //specialty.style.height = null;
                            //specialty.style.aspectRatio = null;
                            specialty.style.transform = null;
                        });

                       update_colors(hueColor);

                       animationOver = true;

                       document.getElementById('')


                    })
                }
                index++;
                }
          } else {
            clearInterval(interval);
          }
        }, 50);
        
      }
      
    
    // moveObjectAlongPath();
    
    
    
    
    

    //============================================= Floating-Circle-END =============================================================================//

    //============================================= More specialties work ==========================================================================//

        // Lock specialties div
        const specialtiesInitialHeight = specialties.clientHeight;
        specialties.style.height = initialHeight + 'px';
    

});




