document.addEventListener("DOMContentLoaded", function() {
    const payments = [
        {id: 1, user: "Eman", helper: "Aiza", amount: 1200, date: "12 Dec 2025", status: "Paid"},
        {id: 2, user: "Ali", helper: "Sara", amount: 800, date: "10 Dec 2025", status: "Pending"},
        {id: 3, user: "Noor", helper: "Fatima", amount: 1500, date: "11 Dec 2025", status: "Paid"},
    ];

    const tbody = document.getElementById("paymentTable");
    payments.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.user}</td>
            <td>${p.helper}</td>
            <td>Rs. ${p.amount}</td>
            <td>${p.date}</td>
            <td class="${p.status === 'Paid' ? 'done' : 'pending'}">${p.status}</td>
        `;
        tbody.appendChild(tr);
    });
});
