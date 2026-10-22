document.addEventListener("DOMContentLoaded", function() {

    // Summary cards
    const totalHelpers = 45;
    const activeHelpers = 38;
    const pendingHelpers = 7;

    document.getElementById("totalHelpers").innerText = totalHelpers;
    document.getElementById("activeHelpers").innerText = activeHelpers;
    document.getElementById("pendingHelpers").innerText = pendingHelpers;

    // Table data
    const helpers = [
        {id:1, name:"Aiza", service:"Home Cleaning", status:"Active"},
        {id:2, name:"Ali", service:"Cooking", status:"Active"},
        {id:3, name:"Sara", service:"Babysitting", status:"Pending"},
        {id:4, name:"Hassan", service:"Driver", status:"Active"},
        {id:5, name:"Maryam", service:"Laundry", status:"Pending"}
    ];

    const tbody = document.querySelector("#helpersTable tbody");
    helpers.forEach(helper => {
        const tr = document.createElement("tr");
        const color = helper.status === "Active" ? "#7C9473" : "#D4A017";
        tr.innerHTML = `
            <td>${helper.id}</td>
            <td>${helper.name}</td>
            <td>${helper.service}</td>
            <td style="color:${color}; font-weight:600;">${helper.status}</td>
            <td>
              <button onclick="alert('Approve/Reject action')" style="padding:5px 10px; border:none; border-radius:6px; background:#5B4636; color:white; cursor:pointer;">Action</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

});
