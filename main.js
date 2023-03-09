var arr = [
  {
    product_name: "Title 1 ",
    product_price: "200$",
    product_imag: "1.jpg",
    added_to_cart: false
  },
  {
    product_name: "Title 2 ",
    product_price: "300$",
    product_imag: "2.jpg",
    added_to_cart: false
  },
  {
    product_name: "Title 3 ",
    product_price: "400$",
    product_imag: "3.jpg",
    added_to_cart: false
  },
  {
    product_name: "Title 4 ",
    product_price: "500$",
    product_imag: "4.jpg",
    added_to_cart: false
  },
  {
    product_name: "Title 5 ",
    product_price: "600$",
    product_imag: "5.jpg",
    added_to_cart: false
  },
  {
    product_name: "Title 6 ",
    product_price: "700$",
    product_imag: "6.jpg",
    added_to_cart: false
  }
];

let cartItems = [];
let divItems = document.querySelector('.cart-items');
let tempId;
let badge = document.querySelector(".badge");
var b = document.querySelectorAll('.cart');

function createCartItem(button) {
  let divItem = document.createElement("div");
  divItem.className = "cart-content";
  divItem.setAttribute('con', "con");
  divItem.setAttribute('id', button.getAttribute('src'));
  divItem.setAttribute('src', button.getAttribute('src'))

  divItems.appendChild(divItem);

  // Create ImageTag
  let imgItem = document.createElement("img");
  imgItem.className = "img-cart";
  let j = button.getAttribute('src');
  imgItem.setAttribute("src", 'imgs/' + j + '.jpg');
  divItem.appendChild(imgItem);

  //Create SpanTitle
  let spanItem = document.createElement("span");
  let spanItemContent = document.createTextNode('' + button.getAttribute('title'));
  spanItem.appendChild(spanItemContent);
  divItem.appendChild(spanItem);

  //Create SpanPrice
  let spanPrice = document.createElement("span");
  let spanPriceContent = document.createTextNode('' + button.getAttribute('price'));
  spanPrice.appendChild(spanPriceContent);
  divItem.appendChild(spanPrice);
  cartItems.push(divItem);
  
}
let localStorageItems = localStorage.getItem("carttItems");
if(localStorageItems) {
  localStorageItems = localStorageItems.split(",");
  
  for (let i = 0; i < localStorageItems.length; i++) {
    createCartItem(b[+localStorageItems[i] - 1]);
    b[+localStorageItems[i] - 1].innerHTML = "Remove From Cart";
    arr[+localStorageItems[i] - 1].added_to_cart = true;
  }
  badge.innerHTML = cartItems.length;
}


for (let i = 0; i < arr.length; i++) {
  let images = document.querySelectorAll(".img");
  let titles = document.querySelectorAll(".title");
  let prices = document.querySelectorAll(".price");
  
  images[i].setAttribute('src', 'imgs/' + arr[i].product_imag);
  titles[i].innerHTML = arr[i].product_name;
  prices[i].innerHTML = arr[i].product_price;

  b[i].addEventListener("click", () => {
    arr[i].added_to_cart = !arr[i].added_to_cart;
    if (arr[i].added_to_cart == false) {
      b[i].innerHTML = "Add To Cart";
      cartItems.forEach((element, index, arr) => {
        tempId = element.getAttribute("id");
        if(+tempId === (i + 1)) {
          
          element.remove();
          arr.splice(index, 1);
          localStorageItems = localStorage.getItem("carttItems");
          // console.log("localStorageItems remove ", localStorageItems);
          localStorageItems = localStorageItems.split(",");
          localStorageItems.splice(index, 1);
          localStorageItems = localStorageItems.join(",");
        
          localStorage.setItem("carttItems", localStorageItems);
          return;
        }
      })
    
    }
    else {
      b[i].innerHTML = "Remove From Cart";
      createCartItem(b[i]);

      localStorageItems = localStorage.getItem("carttItems");
      if(localStorageItems) {
        localStorageItems += `,${i + 1}`
      } else {
        localStorageItems = i + 1;
      }
      localStorage.setItem("carttItems", localStorageItems);
      
    }
    badge.innerHTML = cartItems.length;

  })
  if (arr[i].added_to_cart == false) {
    b[i].innerHTML = "Add To Cart";
  }
  else {
    b[i].innerHTML = "Remove From Cart";
  }
}



// Create Popup With The Image
  let btns = document.querySelectorAll(".view");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
    let i = btn.getAttribute("src");
  
      
    //Create Overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
     
    //Create popupBox
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    
    //Create Image
    let popupImage = document.createElement("img");
    popupImage.setAttribute('src', 'imgs/' + arr[i].product_imag);
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    
    //create Div 
    let div = document.createElement("div");
    div.setAttribute("class","cont")  
    popupBox.appendChild(div);
    
    //Create Title
    let imgHeading = document.createElement("h3");
    let imgText = document.createTextNode(''+ arr[i].product_name);
    imgHeading.appendChild(imgText);
    div.appendChild(imgHeading);
      
    
    //Create Price
    let price = document.createElement("h3");
    price.innerHTML =  arr[i].product_price;
    div.appendChild(price);
        
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});