document.addEventListener("DOMContentLoaded", () => {
  renderBookings();
});

function renderBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const container = document.getElementById("bookingsContainer");
  container.innerHTML = "";

  if (!bookings.length) {
    container.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  bookings.forEach(b => {
    container.innerHTML += `
      <div class="booking-card">
        <div class="booking-left">
          <img src="${b.img}">
        </div>

        <div class="booking-middle">
          <h3>${b.helper}</h3>
          <p class="service">${b.service}</p>
          <p class="date">${b.date}</p>
          <span class="status ongoing">${b.status}</span>
        </div>

        <div class="booking-right">
          <button class="btn-outline" onclick="viewProfile('${b.helper}')">
           <a href="/FrontEnd/common/view-profile.html">View Profile</a>
          </button>

          ${b.status === "Pending"
            ? `<button class="btn" onclick="markCompleted(${b.id})">
                 Mark Completed
               </button>`
            : ""}

          <button class="btn-outline" onclick="cancelBooking(${b.id})">
            Cancel
          </button>
        </div>
      </div>
    `;
  });
}

// ================= ACTIONS =================
function markCompleted(id) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings = bookings.map(b =>
    b.id === id ? { ...b, status: "Completed" } : b
  );
  localStorage.setItem("bookings", JSON.stringify(bookings));
  renderBookings();
}

function cancelBooking(id) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings = bookings.filter(b => b.id !== id);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  renderBookings();
}

// function viewProfile(name) {
//   alert("Profile page demo:\n" + name);
// }
