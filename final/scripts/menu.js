//code for the hamburguer menu

const mainnav = document.querySelector('.navigation2');
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

//menu//

async function getDishes() {
    try {
        const answer = await fetch('data/menu.json');

        if (!answer.ok) {
            throw new Error('Error while trying to get the file: ' + answer.status);
        }

        const dishes = await answer.json();

        createcardfood(dishes);

        function createcardfood(foods) {
            document.querySelector(".dishes").innerHTML = "";
            foods.forEach(food => {
                let card = document.createElement('section');
                let name = document.createElement('h2');
                let description = document.createElement('p');
                let price = document.createElement('p');
                let category = document.createElement('p');
                let img = document.createElement('img');
        
                name.textContent = food.dishName;
                description.innerHTML = `<span class="label"></span> ${food.description}`;
                price.innerHTML = `<span class="label"><strong>Price:</strong></span> $${food.price.toFixed(2)}`;
                category.innerHTML = `<span class="label"><strong>Category:</strong></span> ${food.category}`;
        
                img.setAttribute('src', food.imageUrl);
                img.setAttribute('alt', `${food.dishName}`);
                img.setAttribute('loading', 'lazy');
                img.setAttribute('id', "imgmenu");
        
                card.appendChild(name);
                card.appendChild(img);
                card.appendChild(description);
                card.appendChild(price);
                card.appendChild(category);
        
                document.querySelector(".dishes").appendChild(card);
            })
        }
        
        const Meatsbutton = document.querySelector('#meats');
        const Drinksbutton = document.querySelector('#drinks');
        const Saladsbutton = document.querySelector('#salads');
        const Dessertsbutton = document.querySelector('#desserts');
        const Fishesbutton = document.querySelector('#fishes');
        const Sidesbutton = document.querySelector('#sides');
        const Classicsbutton = document.querySelector('#classics');
        
        Meatsbutton.addEventListener('click', () => {
            let meats = dishes.filter(meat => meat.category === "Meats");
            createcardfood(meats);
        })
        
        Drinksbutton.addEventListener('click', () => {
            let drinks = dishes.filter(drink => drink.category === "Beverages");
            createcardfood(drinks);
        })
        
        Saladsbutton.addEventListener('click', () => {
            let salads = dishes.filter(salad => salad.category === "Salads");
            createcardfood(salads);
        })
        
        Dessertsbutton.addEventListener('click', () => {
            let desserts = dishes.filter(dessert => dessert.category === "Desserts");
            createcardfood(desserts);
        })
        
        Fishesbutton.addEventListener('click', () => {
            let fishes = dishes.filter(fish => fish.category === "Fish");
            createcardfood(fishes);
        })
        
        Sidesbutton.addEventListener('click', () => {
            let sides = dishes.filter(side => side.category === "Sides");
            createcardfood(sides);
        })
        
        Classicsbutton.addEventListener('click', () => {
            let classics = dishes.filter(classic => classic.category === "Classic Dishes");
            createcardfood(classics);
        })

    } catch (erro) {
        console.error("Issue", erro);
    }
}

getDishes();


