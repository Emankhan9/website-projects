// const helpers = [
//   { name: "Ayesha Khan", role: "maid", experience: "3 Years", rating: "⭐ 4.6" },
//   { name: "Sara Malik", role: "babysitter", experience: "2 Years", rating: "⭐ 4.3" },
//   { name: "Hina Ali", role: "cook", experience: "4 Years", rating: "⭐ 4.7" },
//   { name: "Nida Noor", role: "maid", experience: "1 Year", rating: "⭐ 4.1" },
// ];

// const params = new URLSearchParams(window.location.search);
// const service = params.get("service");

// const title = document.getElementById("pageTitle");
// const container = document.getElementById("helpersContainer");

// if (service && title) {
//   title.innerText =
//     "Available " + service.charAt(0).toUpperCase() + service.slice(1) + "s";
// }

// function renderHelpers(list) {
//   container.innerHTML = "";

//   if (list.length === 0) {
//     container.innerHTML = "<p style='text-align:center'>No helpers found</p>";
//     return;
//   }

//   list.forEach(h => {
//     container.innerHTML += `
//       <div class="helper-record">
//         <div class="avatar">
//           <span class="avatar-text">${h.name.charAt(0)}</span>
//         </div>

//         <div class="helper-details">
//           <h3>${h.name}</h3>
//           <p class="role">${h.role} • ${h.experience} Experience</p>
//           <p class="rating">${h.rating}</p>
//         </div>

//         <div class="actions">
//           <a href="helper-profile.html" class="view-btn">View</a>
//           <a href="#" class="book-btn">Book Now</a>
//         </div>
//       </div>
//     `;
//   });
// }

// let filteredHelpers = helpers;

// if (service) {
//   filteredHelpers = helpers.filter(h => h.role === service);
// }

// renderHelpers(filteredHelpers);
// 🧩 Dummy helpers data (frontend ke liye)
const helpers = [
  {  id: 1,
      name: "Aiza Khan",
      role: "House Cleaner",
      experience: "3 Years",
      rating: 4.8,
      price: 600, },
  {  id: 2,
      name: "Sara Ali",
      role: "Deep Cleaning Expert",
        experience: "2 Years",
      rating: 4.9,
      price: 950, },
  {  id: 3,
      name: "Ali Khan",
      role: "Professional Cook",
        experience: "1 Years",
      rating: 4.7,
      price: 800, },
];

// 🔗 URL se service lena
const params = new URLSearchParams(window.location.search);
let service = params.get("service"); // maid / cook / babysitter

const title = document.getElementById("pageTitle");
const container = document.getElementById("helpersContainer");
const searchInput = document.querySelector(".search-box input");

// 🔠 Heading update
if (service && title) {
  title.innerText =
    "Available " + service.charAt(0).toUpperCase() + service.slice(1) + "s";
}
// ✅ Attach Book Now button logic
function renderHelpers(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p style='text-align:center'>No helpers found</p>";
    return;
  }

  list.forEach(h => {
    container.innerHTML += `
      <div class="helper-record">
        <div class="avatar">
          <span class="avatar-text">${h.name.charAt(0)}</span>
        </div>

        <div class="helper-details">
          <h3>${h.name}</h3>
          <p class="role">${h.role} • ${h.experience} Experience</p>
          <p class="rating">${h.rating}</p>
        </div>

        <div class="actions">
          <a href="view-profile.html" class="view-btn">View</a>
          <a href="#" class="book-btn">Book Now</a>
        </div>
      </div>
    `;
  });

  attachBookNowLogic(list);
}

function attachBookNowLogic(list) {
  const buttons = document.querySelectorAll(".book-btn");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const helper = list[index];
      showToast(`Request sent to ${helper.name}`);
    });
  });
}


// ✅ Toast function
function showToast(msg) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  toastMsg.innerText = msg;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.visibility = "hidden";
  }, 2000);
}
// 🔍 Initial filter (Explore se aaya hua)
let filteredHelpers = helpers;
if (service) {
  filteredHelpers = helpers.filter(h =>
    h.role.toLowerCase().includes(service.toLowerCase())
  );
}


renderHelpers(filteredHelpers);

// 🔎 Helpers page search bar (LIVE FILTER)
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();

    const liveFiltered = helpers.filter(h =>
      h.role.includes(value)
    );

    renderHelpers(liveFiltered);

    // heading dynamic
    if (value) {
      title.innerText =
        "Available " + value.charAt(0).toUpperCase() + value.slice(1) + "s";
    } else {
      title.innerText = "Available Helpers";
    }
  });
}
