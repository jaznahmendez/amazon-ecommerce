function showInitData() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/electronics', false);
    xhr.send(null);
    if (xhr.status == 400 || xhr.status == 404) {
        alert(xhr.status + " " + xhr.responseText);
    } else {
        sendHTML(xhr.response);
    }
}

function sendHTML(response) {
    const products = JSON.parse(response);
    let html = '';
    for(i = 0; i < 10; i++){
        html += createProduct(products[i]);
    }
    document.getElementById('electronics-carousel').innerHTML = html;

    // Initialize the Owl Carousel after adding the items
    $('#electronics-carousel').owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        margin: 10,
        nav: true,
        dots: true
    });
}

function createProduct(product) {
    return `
        <div class="item">
            <div class="thumb">
                <div class="hover-content">
                    <ul>
                        <li><a href="${product.product_link}"><i class="fa fa-eye"></i></a></li>
                    </ul>
                </div>
                <img src="${product.img_link}" alt="Image Not Available">
            </div>
            <div class="down-content">
                <h4>${product.product_name}</h4>
                <span>${product.actual_price}</span>
                <ul class="stars">
                    <li><i class="fa fa-star"></i>${product.rating}</li>
                </ul>
            </div>
        </div>`;
}

if (window.location.pathname == '/') {
    document.addEventListener('DOMContentLoaded', (event) => {
        showInitData();
        sessionStorage.wbool = "true";
    });
}