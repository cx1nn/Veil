function saveTheme() {
    var selectedtheme = document.getElementById("theme-select")
    localStorage.setItem("selectedTheme", selectedTheme);
    applyTheme(selectedTheme);
}



function applyTheme(theme) {
    var linkElement = document.querySelector("link[rel='stylesheet']");
    if (theme === "default") {
        linkElement.href = "home.css"; 
    } else if (theme === "midnight") {
        linkElement.href = "midnight.css"; 
    } else if (theme === "light") {
        linkElement.href = "light.css"; 
    }
    
}