// Dummy requests
let requests = [
  { user: "Ayesha Khan", service: "Maid", time: "10:00 AM - 2:00 PM", status: "pending" },
  { user: "Ali Raza", service: "Cook", time: "6:00 PM - 9:00 PM", status: "pending" }
];

const container = document.getElementById("requestsContainer");

function renderRequests() {
  container.innerHTML = "";

  if (requests.length === 0) {
    container.innerHTML = `<p class="empty-message">No requests available at the moment</p>`;
    return;
  }

  requests.forEach((req, index) => {
    container.innerHTML += `
      <div class="request-card">
        <p><strong>User:</strong> ${req.user}</p>
        <p><strong>Service:</strong> ${req.service}</p>
        <p><strong>Time:</strong> ${req.time}</p>

        ${
          req.status === "pending"
          ? `
            <div class="actions">
              <button class="btn accept" onclick="acceptRequest(${index})">Accept</button>
              <button class="btn reject" onclick="rejectRequest(${index})">Reject</button>
            </div>
          `
          : `<span class="status ${req.status.toLowerCase()}">${req.status}</span>`
        }
      </div>
    `;
  });
}

function acceptRequest(index) {
  requests[index].status = "Accepted";
  renderRequests();
}

function rejectRequest(index) {
  requests[index].status = "Rejected";
  renderRequests();
}

renderRequests();