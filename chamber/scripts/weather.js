const weather = document.getElementById('weather');
const forecast = document.getElementById('forecast');
const key = "1b685180e426d9b6a0c579ef94f82c41";
const lat = "-16.075426";
const lon = "-47.986062";

const weatherUrl = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

async function apiFetch() {
    try {
      const response1 = await fetch(weatherUrl);
      if (response1.ok) {
        const data = await response1.json();
        console.log(data);

        displayResults1(data);

      } else {
          throw Error(await response1.text());
      }
    } catch (error) {
        console.log(error);
    }

    try {
        const response2 = await fetch(forecastUrl);
        if (response2.ok) {
            const data2 = await response2.json();
            console.log(data2);

            displayResults2(data2);

        } else {
            throw Error(await response2.text());
        }
    }
    catch (error) {
        console.log(error);
    }
  };
  
  apiFetch();


function displayResults1(data) {
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather.innerHTML = `
    <div id="Wimg">
    <img src='${iconsrc}' alt="${data.weather[0].description}">
    </div>
    <p class="cap"><strong>${data.weather[0].description}</strong></p>
    <p>Temperature: <strong>${data.main.temp}&degC</strong></p>
    <p>High: <strong>${data.main.temp_max}&deg</strong></p>
    <p>Low: <strong>${data.main.temp_min}&deg</strong></p>
    <p>Humidity: <strong>${data.main.humidity}%</strong></p>
    `;
};

function displayResults2(data) {
    const day1 = data.list[7].dt_txt
    const day2 = data.list[15].dt_txt
    const day3 = data.list[23].dt_txt

    const tomorrow = weekday(day1);
    const aftertomorrow = weekday(day2);
    const afteraftertomorrow = weekday(day3);

    forecast.innerHTML = `
    <div class="blocks">
    <h3>${tomorrow}</h3>
    <p>Temperature: <strong>${data.list[7].main.temp}&degC</strong></p>
    <p>Humidity: <strong>${data.list[7].main.humidity}%</strong></p>
    </div>
    <div class="blocks">
    <h3>${aftertomorrow}</h3>
    <p>Temperature: <strong>${data.list[15].main.temp}&degC</strong></p>
    <p>Humidity: <strong>${data.list[15].main.humidity}%</strong></p>
    </div>
    <div class="blocks">
    <h3>${afteraftertomorrow}</h3>
    <p>Temperature: <strong>${data.list[23].main.temp}&degC</strong></p>
    <p>Humidity: <strong>${data.list[23].main.humidity}%</strong></p>
    </div>
    `;
};

function weekday(day) {
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = new Date(day.replace(" ", "T"));
    const dayNumber = data.getDay(data);
    return week[dayNumber];
};

////////////////

//population

const container = document.getElementById('members');

async function getMember() {
    try {
        const answer = await fetch('data/members.json');

        if (!answer.ok) {
            throw new Error('Error while trying to get the file: ' + answer.status);
        }

        const data = await answer.json();

        const data3 = getrandom(data);

        data3.forEach(member => {
            const div = document.createElement('div');
            div.classList.add('member');

            div.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3 id="name">${member.name}</h3>
            <p><strong>Level:</strong> ${member.membershipLevel}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Adress:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" class="links">${member.website}</a></p>
            <p> ${member.description}</p>
            `;

            container.appendChild(div);
        });

    } catch (erro) {
        console.error("Issue", erro);
    }
}

getMember();

function getrandom(data) {
    const filtered = data.filter(item => item.membershipLevel === 'Silver' || item.membershipLevel === 'Gold');
    const shuffle = filtered.sort(() => Math.random() - 0.5);
    return shuffle.slice(0, 3);
};