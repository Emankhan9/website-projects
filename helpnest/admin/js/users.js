const users = [
  {id:1, name:"Eman", email:"eman@mail.com", joined:"12 Dec 2025"},
  {id:2, name:"Ali", email:"ali@mail.com", joined:"10 Dec 2025"},
  {id:3, name:"Sara", email:"sara@mail.com", joined:"15 Dec 2025"}
];

const tableBody = document.querySelector("#usersTable tbody");

users.forEach(user => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${user.id}</td>
                   <td>${user.name}</td>
                   <td>${user.email}</td>
                   <td>${user.joined}</td>`;
  tableBody.appendChild(row);
});
