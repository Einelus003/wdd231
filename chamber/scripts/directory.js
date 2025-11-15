const container = document.getElementById("memberContainer");

async function loadMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  data.members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.url}" target="_blank">${member.url}</a>
    `;
    container.appendChild(card);
  });
}
loadMembers();

document.getElementById("gridView").addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

document.getElementById("listView").addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});

