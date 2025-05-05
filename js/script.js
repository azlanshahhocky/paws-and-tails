document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    let currentTheme = localStorage.getItem('theme') || 'light'; // Default to light theme

    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update the button content based on the current theme
    updateButtonContent(themeSwitch, currentTheme);

    themeSwitch.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light'; // Toggle theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);

        // Update the button content
        updateButtonContent(themeSwitch, currentTheme);
    });

    function updateButtonContent(button, theme) {
        const icon = document.createElement('div');
        icon.className = `icon ${theme === 'light' ? 'sun' : 'moon'}`; // Add icon class
        button.innerHTML = ''; // Clear existing content
        button.appendChild(icon);
        button.appendChild(document.createTextNode(theme === 'light' ? 'Light Mode' : 'Dark Mode')); // Add text
    }
});

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
