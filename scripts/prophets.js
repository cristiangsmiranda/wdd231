const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
let allProphets = [];

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();
   // console.table(data.prophets);
    allProphets = data.prophets;
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    cards.innerHTML = '';
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        card.classList.add('card-content');
        let fullName = document.createElement('h2');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let numOfChildren = document.createElement('p');
        let lengthProphet = document.createElement('p');
        let portrait = document.createElement('img');
  
        fullName.textContent = `${prophet.name} ${prophet.lastname} - ${prophet.order}th Latter-day President`;
        birthDate.textContent = `Birth date: ${prophet.birthdate}`;
        birthPlace.textContent = `Birth place: ${prophet.birthplace}`;
        numOfChildren.textContent = `Number of children: ${prophet.numofchildren}`;
        lengthProphet.textContent = `Length prophet: ${prophet.length} years`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}th Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(numOfChildren);
        card.appendChild(lengthProphet);
        card.appendChild(portrait);

  
        cards.appendChild(card);
    });
}

const filterProphetsByUtah = () => {
    const filtered = allProphets.filter(prophet => prophet.birthplace === 'Utah');
    displayProphets(filtered);
  };
  
  const filterProphetsByNonUS = () => {
    const filtered = allProphets.filter(prophet => prophet.birthplace !== 'Utah' && prophet.birthplace !== 'Idaho' && prophet.birthplace !== 'Nevada' && prophet.birthplace !== 'California');
    displayProphets(filtered);
  };
  
  const filterProphetsByAge95Plus = () => {
    const filtered = allProphets.filter(prophet => {
      const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();
      const birthYear = new Date(prophet.birthdate).getFullYear();
      return (deathYear - birthYear) >= 95;
    });
    displayProphets(filtered);
  };
  
  const filterProphetsBy10Kids = () => {
    const filtered = allProphets.filter(prophet => prophet.numofchildren >= 10);
    displayProphets(filtered);
  };
  
  const filterProphetsBy15Years = () => {
    const filtered = allProphets.filter(prophet => prophet.length >= 15);
    displayProphets(filtered);
  };

const resetFilters = () => {
    displayProphets(allProphets);
  };  

document.getElementById('utah-button').addEventListener('click', filterProphetsByUtah);
document.getElementById('non-us-button').addEventListener('click', filterProphetsByNonUS);
document.getElementById('95-plus-button').addEventListener('click', filterProphetsByAge95Plus);
document.getElementById('10-kids-button').addEventListener('click', filterProphetsBy10Kids);
document.getElementById('15-years-button').addEventListener('click', filterProphetsBy15Years);
document.getElementById('reset-button').addEventListener('click', resetFilters);

getProphetData(url);
