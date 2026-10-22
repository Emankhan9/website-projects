document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role") || "user";

    const roleInput = document.getElementById("role");
    if (roleInput) roleInput.value = role;

    const heading = document.getElementById("loginHeading");
    const welcome = document.getElementById("welcomeText");
    const roleText = document.getElementById("roleText"); // Ye line add ki

    if (heading && welcome) {
        if (role === "housekeeper") {
            heading.innerText = "Housekeeper Login";
            welcome.innerHTML = "Welcome <span>Housekeeper</span>";
            if(roleText) roleText.innerText = "Login to manage your services and bookings."; // Ye line
        } else {
            heading.innerText = "User Login";
            welcome.innerHTML = "Welcome <span>User</span>";
            if(roleText) roleText.innerText = "Hire trusted help for your home easily."; // Ye line
        }
    }
});
// ================= NAVBAR DROPDOWN LOGIC =================
document.addEventListener("DOMContentLoaded", () => {
    const loginToggle = document.getElementById("loginToggle");
    const loginMenu = document.getElementById("loginMenu");

    if (loginToggle && loginMenu) {
        loginToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); // Taake click bahar na jaye
            loginMenu.classList.toggle("show");
        });

        // Agar bahar click karein toh menu band ho jaye
        document.addEventListener("click", (e) => {
            if (!loginToggle.contains(e.target) && !loginMenu.contains(e.target)) {
                loginMenu.classList.remove("show");
            }
        });
    }
});