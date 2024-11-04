document.addEventListener("DOMContentLoaded", function () {
    const reviewCarousel = document.querySelector(".review-carousel");
    const reviews = Array.from(reviewCarousel.children);
    
    reviews.forEach((review) => {
        const clone = review.cloneNode(true);
        reviewCarousel.appendChild(clone);
    });
});