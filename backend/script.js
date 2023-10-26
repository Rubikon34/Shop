let left = document.getElementsByClassName('btn-arrow__left')[0];
let right = document.getElementsByClassName('btn-arrow__right')[0];
let sliderImgs = document.getElementsByClassName('slider__imgs')[0];
let sliderImg = document.getElementsByClassName('slider__img')[0];
let searchInput = document.getElementsByClassName('search__input')[0];
let searchBtn = document.getElementsByClassName('search__btn')[0];
let allProducts = document.getElementsByClassName('all-products') [0];
let basketDelete = document.getElementsByClassName('basket__delete')[0];
let basketItem = document.getElementsByClassName('basket__item')[0];
let basketDetails = document.getElementsByClassName('basket__details')[0];
let sum = document.getElementsByClassName('sum')[0];
let sumCounter = 0
let close = document.getElementsByClassName('close')[0];
let modalWrapper = document.getElementsByClassName('modal-wrapper')[0]
let orderConfirm = document.getElementsByClassName('order-confirm')[0]
let order = document.getElementsByClassName('order')[0];

let scrollNumber = 1000;
let countSlider = 0;
name = 'Dima';
let allTitle = []




async function aa () {
await fetch('https://dummyjson.com/products?limit=20')
.then(res => res.json())
.then((res) => {
  let products = res.products;
  
  
    console.log(products)

for (let i = 0; i < products.length; i++) {
  if (products[i].price > 0) {
    
  let color="blue"
  if (products[i].discountPercentage > 5 ) {
    color = 'orange'
  }
    if (products[i].discountPercentage > 15 ) {
    color = 'red'
  }
    
    
    
 allProducts.innerHTML += `
  
  <div class="col-12 col-md-6 col-xl-4 col-xxl-3 product product-${products[i].id}">
          <div class="categories">
              <img class="categories__img" src="${products[i].thumbnail}">
              <span class="discountPercentage" style="background:${color}">-${products[i].discountPercentage}%</span>
              <h2 class="categories__title">${products[i].title}</h2> 
              <h4 class="price"> $ ${products[i].price} </h4>
              <p>${products[i].description}</p>
             
             <div class="flex">
                <a href="/details/${products[i].id}" class="show">Переглянути</a> 
                <button class="buy__btn">Купити</button>
            </div>
            
          </div>
        </div>
        
  `
  }
  
}
  buttonBuy()
  
  
  
  
});
}
aa()




left.addEventListener('click', function () {
  if (countSlider >= 0) {
    scrollNumber -= scrollNumber;
    sliderImgs.scrollLeft = scrollNumber;
    countSlider--
    
  }
  

})


right.addEventListener('click', function () {
  if (countSlider < 3) {
    scrollNumber += scrollNumber;
    sliderImgs.scrollLeft = scrollNumber;
    countSlider++
    
  }
  
})

close.addEventListener('click', function () {
  modalWrapper.style.display="none"
}
)



order.addEventListener('click', function () {
  modalWrapper.style.display="flex"
})



let basket = document.getElementsByClassName('basket') [0];

function showBasket () {
  
}

orderConfirm.addEventListener('click', function (e) {
  e.preventDefault()
  let name = document.getElementsByClassName('modal__input')[0].value;
  let lastname = document.getElementsByClassName('modal__input')[1].value;
  let fathername = document.getElementsByClassName('modal__input')[2].value;
  let phone = document.getElementsByClassName('modal__input')[3].value;
  let address = document.getElementsByClassName('modal__input')[4].value;
  let emeil = document.getElementsByClassName('modal__input')[5].value;
  let token = '6106572340:AAFDYLCDNt8LF-vQzmFode9w8aHOvs-N2QY';
  let myId = '2003459592';
  let teacherId = `957139896`;
  let template = encodeURIComponent(`
<b>products:</b>
${allTitle}
<b>name:</b> 
${name}
<b>lastname:</b> 
${lastname}
<b>fathername:</b>
${fathername}
<b>phone number:</b>
${phone}
<b>address:</b>
${address}
<b>email:</b>
${emeil}
  `)
  // <b> - encodeURIComponent
  
  fetch('https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + myId + '&text=' + template + "&parse_mode=HTML")
  fetch('https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + teacherId + '&text=' + template + "&parse_mode=HTML")
}) 



// ::::::::: ПОШУК ::::::::::
searchBtn.addEventListener('click', function () {
  let product = document.getElementsByClassName('product')
  
  for (let i = 0; i < product.length; i++) {
    product[i].style.display = 'none'
  }
  
  
  
  let searchWord = searchInput.value.toLowerCase();
  
  for (let i = 0; i < products.length; i++) {
    if ( (products[i].title.toLowerCase()).indexOf(searchWord) != -1 ) {
      document.getElementsByClassName('product-' + products[i].id)[0].style.display = 'flex';
      
    }
  }
})
basketDelete.addEventListener('click',function () {
 basketItem.style.display = 'none'                               
 })


function buttonBuy () {

let buyBtn = document.getElementsByClassName('buy__btn');
console.log(buyBtn)

for (let i = 0; i < buyBtn.length; i++) {

  
  buyBtn[i].addEventListener('click', function (e) {
    let order = document.getElementsByClassName('order')[0];
    order.style.display = 'block'
    buyBtn[i].textContent="В корзині"
    buyBtn[i].style.background="transparent"
    buyBtn[i].style.color="lime"
   
     let price = e.target.parentNode.parentNode.getElementsByClassName('price')[0].textContent;
     let title = e.target.parentNode.parentNode.getElementsByClassName('categories__title')[0].textContent;
     allTitle.push(title)
    price = price.slice(2)
    // alert(title)
    sumCounter += +price;
    sum.textContent = sumCounter
    
    
    basketDetails.innerHTML += `
    <div class="basket__item">
        <h4 class="basket__title"> ${title} </h4>
        <h5 class="basket__price"> ${price}</h5>
        <button class="basket__delete">x</button>
      </div>
            `


      order.addEventListener('click', function () {
        modalWrapper.style.display="flex"
      })

    
   })

}

}