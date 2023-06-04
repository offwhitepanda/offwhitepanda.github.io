document.addEventListener('DOMContentLoaded', function() {
    // Get the required elements
    const imageEnlarger = document.getElementById('image-enlarger');
    const enlargedImage = document.getElementById('enlarged-image');
    const repoImages =[];


    // Add a scroll event listener
    window.addEventListener('scroll', function() {
    // Update the value of --scroll-y custom CSS variable
    imageEnlarger.style.setProperty('--scroll-y', `${window.scrollY}px`);
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
});




