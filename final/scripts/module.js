export function createcardfood(foods) {

    document.querySelector(".dishes").innerHTML = "";
    foods.forEach(food => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let price = document.createElement('p');
        let category = document.createElement('p');
        let img = document.createElement('img');
        
        //the button for the modal
        let readMoreBtn = document.createElement('a');
        readMoreBtn.textContent = 'Description';
        readMoreBtn.classList.add('read-more-button');

        name.textContent = food.dishName;
        price.innerHTML = `<span class="label"><strong>Price:</strong></span> $${food.price.toFixed(2)}`;
        category.innerHTML = `<span class="label"><strong>Category:</strong></span> ${food.category}`;

        img.setAttribute('src', food.imageUrl);
        img.setAttribute('alt', `${food.dishName}`);
        img.setAttribute('loading', 'lazy');
        img.setAttribute('id', "imgmenu");
        img.setAttribute('width', "194");
        img.setAttribute('height', "130");

        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(price);
        card.appendChild(category);
        card.appendChild(readMoreBtn);

        document.querySelector(".dishes").appendChild(card);

        readMoreBtn.addEventListener('click', () => {
            const modal = document.getElementById('dishModal');
            const modalName = document.getElementById('modal-dish-name');
            const modalDescription = document.getElementById('modal-dish-description');

            modalName.textContent = food.dishName;
            modalDescription.textContent = food.description;
            
            // Display the modal
            modal.style.display = 'flex';
        });
    });
}