const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Trier,DE&units=metric&appid=91fcfcd76bb799ec9072d53f1b5cfd94';

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      
      displayResults(data);
    } else {
      throw Error(`Erro na resposta: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);

  captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}
