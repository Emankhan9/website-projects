document.addEventListener("DOMContentLoaded", function() {
    const totalUsers = 120;
    const totalHelpers = 45;
    const totalBookings = 78;
    const totalRevenue = 56000;
    const pendingRequests = 5;

    document.getElementById("totalUsers").innerText = totalUsers;
    document.getElementById("totalHelpers").innerText = totalHelpers;
    document.getElementById("totalBookings").innerText = totalBookings;
    document.getElementById("totalRevenue").innerText = `Rs. ${totalRevenue}`;
    document.getElementById("pendingRequests").innerText = pendingRequests;
});
