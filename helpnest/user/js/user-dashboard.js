document.addEventListener("DOMContentLoaded", () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  document.getElementById("totalBookings").innerText = bookings.length;
  document.getElementById("activeJobs").innerText =
    bookings.filter(b => b.status === "Pending").length;
  document.getElementById("completedJobs").innerText =
    bookings.filter(b => b.status === "Completed").length;

  const table = document.getElementById("recentBookings");
  table.innerHTML = "";

  if (!bookings.length) {
    table.innerHTML = `<tr><td colspan="4">No bookings yet</td></tr>`;
    return;
  }

  bookings.slice(-3).reverse().forEach(b => {
    table.innerHTML += `
      <tr>
        <td>${b.helper}</td>
        <td>${b.service}</td>
        <td>${b.date}</td>
        <td>${b.status}</td>
      </tr>
    `;
  });
});
