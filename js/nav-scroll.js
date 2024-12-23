
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    
    if (window.scrollY > 10) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});