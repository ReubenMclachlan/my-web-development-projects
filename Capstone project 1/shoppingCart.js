//Objects of skateboards
const product1 = {
    name: "DITCH LIFE DARK WAVE",
    price: 3400,
    img: "landyachtz-atv-ditch-life-dark-wave-2.jpg"
};

const product2 = {
    name: "BUTTER WALLNUT LINES",
    price: 3800,
    img: "landyachtz-butter-walnut-lines-1.jpg"
};

const product3 = {
    name: "DINGHY CLASSIC HIBISCUS",
    price: 2900,
    img: "landyachtz-dinghy-hibiscus-1.jpg"
};

const product4 = {
    name: "POCKET KNIFE BLACK",
    price: 3800,
    img: "landyachtz-pocket-knife-black-3.jpg"
};

const product5 = {
    name: "POCKET KNIFE WATERCOLOUR",
    price: 3800,
    img: "landyachtz-pocket-knife-watercolour-1.jpg"
};

const product6 = {
    name: "RAMATHORN",
    price: 3000,
    img: "landyachtz-ramathorn-2016.jpg"
};

const product7 = {
    name: "TUGBOAT UV BENGAL",
    price: 3300,
    img: "landyachtz-tugboat-uv-bengal-1.jpg"
};

//array to store skateboards user has added to cart
let cart = [];

//variable that stores total
let total = 0;

//array that stores coupon codes 
let couponCodes = ["#3h3193h", "#g382gg3", "#8h3fd63", "#420Skate", "#TheSkate"];

function myLoad() {
    if (sessionStorage.getItem("hasCodeRunBefore") == null) {

        //Stores cart array as shoppingCart in sessionStorage
        sessionStorage.setItem("shoppingCart", JSON.stringify(cart));

        //Stores total as total in sessionStorage
        sessionStorage.setItem("total", JSON.stringify(total));

        //Sets hasCodeRunBefore to true to indicate that the code has run before 
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        //Gets the stored array of song objects and assignes it to the songs array
        itemsInCart = JSON.parse(sessionStorage.getItem("shoppingCart"));

        //Loops through each board object in the array cart and displays it in shopping cart
        itemsInCart.forEach(function (product) {
            var shoppingCart = document.getElementById("shoppingCart");

            let productName = document.createElement("h3");
            productName.innerHTML = product.name;

            let productImg = document.createElement("IMG");
            productImg.setAttribute("src", product.img);
            productImg.setAttribute("width", "325");
            productImg.setAttribute("height", "auto");
            productImg.setAttribute("alt", "thumbnail");

            let productPrice = document.createElement("p");
            productPrice.innerHTML = "R" + product.price;

            let space = document.createElement("br");


            shoppingCart.appendChild(productName);
            shoppingCart.appendChild(productImg);
            shoppingCart.appendChild(productPrice);
            shoppingCart.appendChild(space);

            //Displays current total on bottom of page
            let total = JSON.parse(sessionStorage.getItem("total"));

            //Because we want this information to be available accross page loads, we add the updated total to sessionStorage.
            sessionStorage.setItem("total", JSON.stringify(total));

            let displayTotal = document.getElementById("displayTotal");

            displayTotal.innerHTML = "Your total is R" + (total * 1.15).toFixed(2) + " with VAT";
        });
    }
}

//Function that adds boards to shopping cart
function addBoard(product) {
    let cart = JSON.parse(sessionStorage.getItem("shoppingCart"));

    let total = JSON.parse(sessionStorage.getItem("total"));

    total += product.price;

    //We then add the object to the array of board objects using the push method
    cart.push(product);

    //Because we want this information to be available accross page loads, we add the updated array of people to sessionStorage.
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));

    //Sets hasCodeRunBefore to true to indicate that the code has run before so products in shopping cart will be visible
    sessionStorage.setItem("hasCodeRunBefore", true);

    //Because we want this information to be available accross page loads, we add the updated total to sessionStorage.
    sessionStorage.setItem("total", JSON.stringify(total));

    alert(product.name + " has been added to your shopping cart, your total is now R" + total);
}

//function that calculates the discount based on the code the person enters
function calculateDiscount() {
    let enteredCode = document.getElementById("couponCode").value;

    let newTotal = 0;

    let total = JSON.parse(sessionStorage.getItem("total"));

    if (couponCodes.includes(enteredCode)) {
        if (enteredCode == "#3h3193h") {
            alert("Coupon code is valid, you have recieved a discount of 10% on your order");

            let discountAmount = total * 0.1;
            newTotal = total - discountAmount;
        } else if (enteredCode == "#g382gg3") {
            alert("Coupon code is valid, you have recieved a discount of 15% on your order");

            let discountAmount = total * 0.15;
            newTotal = total - discountAmount;
        } else if (enteredCode == "#8h3fd63") {
            alert("Coupon code is valid, you have recieved a discount of 25% on your order");

            let discountAmount = total * 0.25;
            newTotal = total - discountAmount;
        } else if (enteredCode == "#420Skate") {
            alert("Coupon code is valid, you have recieved a discount of 5% on your order");

            let discountAmount = total * 0.05;
            newTotal = total - discountAmount;
        } else if (enteredCode == "#TheSkate") {
            alert("Coupon code is valid, you have recieved a discount of 7% on your order");

            let discountAmount = total * 0.07;
            newTotal = total - discountAmount;
        }

        //Becase we want to save the new total across pages we save it to session storage
        sessionStorage.setItem("total", JSON.stringify(newTotal));

        //Displays new total at bottom of page
        document.getElementById("displayTotal").innerHTML = "Your total is R" + (newTotal * 1.15) + " including VAT";
    } else {
        alert("Entered code is not valid");
    }
}

//Dropdown menu using jquery
$(document).ready(function () {
    $("ul.parent > li").click(function () {
        $(this).find(".child").show(400);
    });
});

//Display confirm order
$(document).ready(function () {
    $("#collection").click(function () {
        //Displays confirm order button
        $("#confirmOrder").show(400);

        //Hides other delivery options
        $("#dropdown").hide(400);
    });
});

//Animation using jquery
$(document).ready(function () {
    $("#confirmOrder").click(function () {
        var id = "id" + Math.random().toString(25).slice(9);
        $("#animation").animate({
            height: 'toggle'
        });

        alert("Your order was successful your reference number is " + id);
    });
});


//Total changes based on the the type of delivery
$(document).ready(function () {

    let total = JSON.parse(sessionStorage.getItem("total"));

    $("#standardDel").click(function () {
        total += 150;

        //Becase we want to save the new total across pages we save it to session storage
        sessionStorage.setItem("total", JSON.stringify(total));

        //Displays new total at bottom of page
        $("#displayTotal").html("Your total is R" + (total * 1.15).toFixed(2) + " including VAT");

        //Displays confirm order button
        $("#confirmOrder").show(400);

        //Hides other delivery options
        $("#dropdown").hide(400);
    });
    $("#expressDel").click(function () {
        total += 250;

        //Becase we want to save the new total across pages we save it to session storage
        sessionStorage.setItem("total", JSON.stringify(total));

        //Displays new total at bottom of page
        $("#displayTotal").html("Your total is R" + (total * 1.15).toFixed(2) + " including VAT");

        //Displays confirm order button
        $("#confirmOrder").show(400);

        //Hides other delivery options
        $("#dropdown").hide(400);
    });
    $("#sameDayDel").click(function () {
        total += 350;

        //Becase we want to save the new total across pages we save it to session storage
        sessionStorage.setItem("total", JSON.stringify(total));

        //Displays new total at bottom of page
        $("#displayTotal").html("Your total is R" + (total * 1.15).toFixed(2) + " including VAT");

        //Displays confirm order button
        $("#confirmOrder").show(400);

        //Hides other delivery options
        $("#dropdown").hide(400);
    });
});

//function using chained effect
$(document).ready(function () {
    $("#couponSubmit").click(function () {
        $("#couponSubmit").css("color", "red").slideUp(2000).slideDown(2000);
    });
});