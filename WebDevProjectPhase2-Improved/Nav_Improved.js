window.onscroll = function() {
    if (window.scrollY > 0) {
        document.getElementById("navbar").style.width = "88.5%";
        document.getElementById("navbar").classList.add("nav-scroll");
        document.getElementById("logo").style.display = "none";
    }
    else {
        document.getElementById("navbar").classList.remove("nav-scroll");
        document.getElementById("logo").style.display = "block";
        document.getElementById("navbar").style.width = "100%";
    }
};