document.addEventListener('DOMContentLoaded', function() {
    // Get the required elements
    const imageEnlarger = document.getElementById('image-enlarger');
    const enlargedImage = document.getElementById('enlarged-image');

    // Get all images on the page
    const images = document.getElementsByTagName('img');

    // Add click event listeners to each image
    for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() {
        // Check if the clicked image is within the image enlarger
        if (!imageEnlarger.contains(this)) {
        // Get the source of the clicked image
        const src = this.src;
        // Set the source of the enlarged image
        enlargedImage.src = src;
        // Open the image enlarger
        imageEnlarger.classList.remove('image-enlarger-closed');
        imageEnlarger.classList.add('image-enlarger-open');
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
  



