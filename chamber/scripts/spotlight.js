const spotContainer = document.getElementById("spotlightContainer");

function getLevelName(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Bronze";
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    
    const goldSilver = data.members.filter(m =>
      m.level === 2 || m.level === 3
    );

    
    const randomCount = Math.floor(Math.random() * 2) + 2;
    const randomMembers = goldSilver
      .sort(() => 0.5 - Math.random())
      .slice(0, randomCount);

    spotContainer.innerHTML = "";

    randomMembers.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("member-card");
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.url}" target="_blank">${member.url}</a>
        <p><strong>${getLevelName(member.level)} Member</strong></p>
      `;
      spotContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

loadSpotlights();


