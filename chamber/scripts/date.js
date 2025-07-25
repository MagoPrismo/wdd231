//code for the footer
const today = new Date();
const yearSpan = document.querySelector("#year");
yearSpan.textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = document.lastModified;

//code for the hamburguer menu

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#hidden-menu');

hambutton.addEventListener('click', () =>
{
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

const screenSize = window.innerWidth;

if (screenSize <= 500) {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
}

//population

async function getMember() {
    try {
        const answer = await fetch('data/members.json');

        if (!answer.ok) {
            throw new Error('Error while trying to get the file: ' + answer.status);
        }

        const data = await answer.json();
        const container = document.getElementById('members');

        data.forEach(member => {
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