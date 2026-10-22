document.addEventListener("DOMContentLoaded", function() {
    const bookings = [
        {id: 1, user: "Eman", helper: "Aiza", service: "Cleaning", date: "12 Dec 2025", status: "Pending"},
        {id: 2, user: "Ali", helper: "Sara", service: "Cooking", date: "10 Dec 2025", status: "Completed"},
        {id: 3, user: "Noor", helper: "Fatima", service: "Babysitting", date: "11 Dec 2025", status: "Pending"},
    ];

    const tbody = document.getElementById("bookingTable");
    bookings.forEach(b => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${b.id}</td>
            <td>${b.user}</td>
            <td>${b.helper}</td>
            <td>${b.service}</td>
            <td>${b.date}</td>
            <td class="${b.status === 'Completed' ? 'done' : 'pending'}">${b.status}</td>
        `;
        tbody.appendChild(tr);
    });
});
