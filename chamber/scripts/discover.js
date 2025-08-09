//population

const container = document.getElementById('places');

async function getPlaces() {
    try {
        const answer = await fetch('data/places.json');

        if (!answer.ok) {
            throw new Error('Error while trying to get the file: ' + answer.status);
        }

        const data = await answer.json();

        data.forEach(place => {
            const div = document.createElement('div');
            div.classList.add('place');

            div.innerHTML = `
            <h2 class="Pname">${place.name}</h2>
            <img class="Pimage" src="${place.imageUrl}" alt="${place.name}" loading="lazy" width="300" height="200">
            <p class="Padress">Adress: ${place.address}</p>
            <p class="Pdescription">Description: ${place.description}</p>
            `;

            container.appendChild(div);
        });

    } catch (erro) {
        console.error("Issue", erro);
    }
}

getPlaces();

//the aside message 

const visitorMessage = document.getElementById('visitor-message');
const currentDate = Date.now();

const lastVisitDate = localStorage.getItem('lastVisitDate');

// Check if it's the user's first visit
if (!lastVisitDate) {
  visitorMessage.textContent = 'Welcome! Let us know if you have any questions!';
} else {

  const timeDifference = currentDate - parseInt(lastVisitDate, 10);

  // Convert the time difference to days
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
  const daysDifference = Math.floor(timeDifference / oneDayInMilliseconds);

  if (timeDifference < oneDayInMilliseconds) {
    visitorMessage.textContent = 'Back so soon! Awesome!';
  } else {

    const dayText = daysDifference === 1 ? 'day' : 'days';
    visitorMessage.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
  }
}

localStorage.setItem('lastVisitDate', currentDate);