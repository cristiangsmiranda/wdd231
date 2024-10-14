async function fetchMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, 'grid');
  }
  
  function displayMembers(members, viewType) {
    const container = document.querySelector('.members-container');
    container.innerHTML = '';
    members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member-card', viewType === 'grid' ? 'grid-view' : 'list-view');
        // Armazena o estado das informações visíveis
        memberDiv.dataset.expanded = false;
        // Adiciona HTML para o card
        memberDiv.innerHTML = `
            <div class="member-header" style="background-color: #e0e0e0; text-align: center; padding: 10px;">
                <h3>${member.name}</h3>
            </div>
            <div class="member-content">
                <img src="images/socios${member.id}.webp" alt="${member.name}" class="member-image">
                <div class="member-info">
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                    <p><strong>Info:</strong> ${member.info}</p>
                </div>
            </div>
        `;
        const additionalInfo = document.createElement('div');
        additionalInfo.classList.add('additional-info');
        additionalInfo.innerHTML = `
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        additionalInfo.style.display = 'none'; // Oculta inicialmente
        memberDiv.appendChild(additionalInfo);
        container.appendChild(memberDiv);
    });
}


document.querySelector('#toggleView').addEventListener('click', () => {
  const members = document.querySelectorAll('.member-card');
  members.forEach(memberDiv => {
      const additionalInfo = memberDiv.querySelector('.additional-info');
      const isExpanded = memberDiv.dataset.expanded === 'true';
      // Alterna a exibição das informações adicionais
      additionalInfo.style.display = isExpanded ? 'none' : 'block';
      memberDiv.dataset.expanded = !isExpanded; // Atualiza o estado
  });
  // Alterna as classes de visualização
  const currentView = document.querySelector('.members-container').classList.contains('grid-view') ? 'grid' : 'list';
  const newView = currentView === 'grid' ? 'list' : 'grid';
  document.querySelector('.members-container').classList.toggle('grid-view', newView === 'grid');
  document.querySelector('.members-container').classList.toggle('list-view', newView === 'list');
});


  // Função para converter tempo Unix para horas e minutos
function convertUnixToTime(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

async function fetchWeather() {
  const apiKey = '5c8c33a8d924cf8e376c1fb552cf29d7';
  const city = 'Salvador';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      const temp = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const tempHigh = data.main.temp_max;
      const tempLow = data.main.temp_min;
      const humidity = data.main.humidity;
      const sunrise = convertUnixToTime(data.sys.sunrise);
      const sunset = convertUnixToTime(data.sys.sunset);

      document.querySelector('#current-temp').textContent = `${temp}°C`;
      document.querySelector('#current-description').textContent = weatherDescription;
      document.querySelector('#high-temp').textContent = `High: ${tempHigh}°C`;
      document.querySelector('#low-temp').textContent = `Low: ${tempLow}°C`;
      document.querySelector('#humidity').textContent = `Humidity: ${humidity}%`;
      document.querySelector('#sunrise').textContent = `Sunrise: ${sunrise}`;
      document.querySelector('#sunset').textContent = `Sunset: ${sunset}`;
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}

async function fetchForecast() {
  const apiKey = '5c8c33a8d924cf8e376c1fb552cf29d7';
  const city = 'Salvador';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Filtra os dados para os próximos três dias
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const todayTemps = data.list.filter(item => {
      const date = new Date(item.dt * 1000);
      return date.getDate() === today.getDate();
    });
    const tomorrowTemps = data.list.filter(item => {
      const date = new Date(item.dt * 1000);
      return date.getDate() === tomorrow.getDate();
    });
    const dayAfterTemps = data.list.filter(item => {
      const date = new Date(item.dt * 1000);
      return date.getDate() === dayAfterTomorrow.getDate();
    });

    // Calcula a temperatura média para cada dia
    const averageTodayTemp = todayTemps.reduce((acc, item) => acc + item.main.temp, 0) / todayTemps.length;
    const averageTomorrowTemp = tomorrowTemps.reduce((acc, item) => acc + item.main.temp, 0) / tomorrowTemps.length;
    const averageDayAfterTemp = dayAfterTemps.reduce((acc, item) => acc + item.main.temp, 0) / dayAfterTemps.length;
    // Atualiza o HTML com as temperaturas médias
    document.querySelector('#today-temp').textContent = Math.round(averageTodayTemp);
    document.querySelector('#tomorrow-temp').textContent = Math.round(averageTomorrowTemp);
    document.querySelector('#day-after-temp').textContent = Math.round(averageDayAfterTemp);
  } catch (error) {
    console.error('Error when searching for the weather forecast:', error);
  }
}

window.onload = function() {
  fetchMembers();
  fetchWeather();
  fetchForecast();
};

document.addEventListener("DOMContentLoaded", () => {
  let currentPath = window.location.pathname;
  if (currentPath.startsWith('/')) {
      currentPath = currentPath.substring(1);
  }
  const navLinks = document.querySelectorAll('.navigation-home a');
  navLinks.forEach(link => {
      if (currentPath.endsWith(link.getAttribute('href'))) {
          link.classList.add('active');
          link.style.backgroundColor = 'white';
          link.style.color = 'black';
      }
  });
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;
