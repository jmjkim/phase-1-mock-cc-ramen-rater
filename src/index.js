// write your code here

document.addEventListener('DOMContentLoaded', () => {

    const url = 'http://localhost:3000/ramens';

    function fetchObject(callback) {
        fetch(url)
        .then(response => response.json())
        .then(callback)
    }


    function displayMenu(data) {
        const defaultImageValue = data[0];
        document.querySelector('img.detail-image').setAttribute('src', defaultImageValue.image);
        document.querySelector('h2.name').innerText = defaultImageValue.name;
        document.querySelector('h3.restaurant').innerText = defaultImageValue.restaurant;
        document.querySelector('span#rating-display').innerText = defaultImageValue.rating;
        document.querySelector('p#comment-display').innerText = defaultImageValue.comment;


        const menu = document.getElementById('ramen-menu');
        const detail = document.getElementById('ramen-detail');

        // Make this a helper function so I can use it for posted data
        for (object of Object.values(data)) {
            // menu main image
            let img = document.createElement('img');
            img.setAttribute('id', object.id);
            img.setAttribute('name', object.name);
            img.setAttribute('restaurant', object.restaurant);
            img.setAttribute('src', object.image);
            img.setAttribute('rating', object.rating);
            img.setAttribute('comment', object.comment);
            img.innerText = object.name;
            menu.appendChild(img);

          // Click main image to view detail
            img.addEventListener('click', (e) => {
            detail.childNodes[1].setAttribute('src', e.target.getAttribute('src'));
            detail.childNodes[3].innerText = e.target.getAttribute('name');
            detail.childNodes[5].innerText = e.target.getAttribute('restaurant');
            document.getElementById('rating-display').innerText = e.target.getAttribute('rating');
            document.getElementById('comment-display').innerText = e.target.getAttribute('comment');
        });
    };
}


    function addNewMenu() {
        const form = document.querySelector('form#new-ramen');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            fetch(url, {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json',
                    Accept: 'application/json'},
                body: JSON.stringify({
                    'name': document.getElementById('new-name').value,
                    'restaurant': document.getElementById('new-restaurant').value,
                    'image': document.getElementById('new-image').value,
                    'rating': document.getElementById('new-rating').value,
                    'comment': document.getElementById('new-comment').value
                })
            })
            .then(response => response.json())
            .then(data => {
                const menu = document.getElementById('ramen-menu');
                let img = document.createElement('img');

                img.setAttribute('id', data.id);
                img.setAttribute('name', data.name);
                img.setAttribute('restaurant', data.restaurant);
                img.setAttribute('src', data.image);
                img.setAttribute('rating', data.rating);
                img.setAttribute('comment', data.comment);
                img.innerText = data.name;
                menu.appendChild(img);

                const detail = document.getElementById('ramen-detail');
                img.addEventListener('click', (e) => {
                detail.childNodes[1].setAttribute('src', e.target.getAttribute('src'));
                detail.childNodes[3].innerText = e.target.getAttribute('name');
                detail.childNodes[5].innerText = e.target.getAttribute('restaurant');
                document.getElementById('rating-display').innerText = e.target.getAttribute('rating');
                document.getElementById('comment-display').innerText = e.target.getAttribute('comment');
                })
            })
        })
    }

    fetchObject(displayMenu);
    addNewMenu();
})