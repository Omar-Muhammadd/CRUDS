// var
var header = document.getElementById("header");
var body = document.getElementsByTagName("body");

// var total
var total = document.getElementById("total");
var totall = document.querySelectorAll(".totall");


// var inputs 
var title = document.getElementById("productTitle");
var price = document.getElementById("productPrice");
var taxes = document.getElementById("productTaxes");
var ads = document.getElementById("productAds");
var discount = document.getElementById("productDiscount");
var category = document.getElementById("productCategory");
var count = document.getElementById("productCount");


// var Table
var table = document.getElementById("table");
var tbody = document.getElementById("tbody");
var td = document.querySelectorAll("td");
var firstChild = document.querySelector("td:first-child");


// var Buttons
var create = document.getElementById("create");
var addDelAll = document.getElementById("Add-btn-deleteAll"); // var div delete all


// var Search
var searchProduct = document.getElementById("productSearch");



// Total
totall.forEach( 
    function(totall){
        totall.addEventListener("input", 
            function(){
                if (price.value != ''){
                    var sum = Number( price.value ) +  +taxes.value  + Number( ads.value ) - discount.value;
                    total.innerHTML = sum;
                    total.style.background = "green";
                } else{
                    total.innerHTML = '';
                    total.style.background = "brown";
                }
        })
})





// Create 
let mood = 'Create Product';
let tmp;
let productsArray;

if(localStorage.product != null){
    productsArray = JSON.parse(localStorage.product);
    ShowData();
}else{
    productsArray = [];
}


create.addEventListener("click", createProduct);

function createProduct(){
    let product = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        category : category.value.toLowerCase(),
        total : total.innerHTML,
        count: count.value,
    }

    create_and_update(product);
    localStorage.setItem('product', JSON.stringify(productsArray));
    
    ShowData();
}

// fun create & update
function create_and_update(product){
    if(title.value != ''){
        if ( mood === 'Create Product' ){
            // add new product [create]
            if( product.count > 1){
                for(let i = 0; i < product.count ; i++){
                    productsArray.push(product);
                }
            }else{
                productsArray.push(product);
            }
        }else {
            // update a product 
            productsArray[tmp] = product;
            mood = 'Create Product';
            create.innerHTML = mood;
            count.style.display = 'block';
            idSpan.innerHTML = '';
            idSpan.style.marginLeft = '0';
            idSpan.style.padding = '0';
            
    
            scroll({
                top: 797,
                behavior: "smooth"
            })
        }
        clearInputs();
    }
   
} 





// clear inputs
function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    category.value = '';
    count.value = '';
    total.innerHTML = '';
    total.style.background = 'brown';
}




// Read
function ShowData(){
    let cartoona = '';
    for( let i=0 ; i < productsArray.length ; i++ ){
        cartoona += `
        <tr >
            <td data-label="id">${i+1}</td>
            <td data-label="title">${productsArray[i].title}</td>
            <td data-label="price">${productsArray[i].price}</td>
            <td data-label="taxes">${productsArray[i].taxes}</td>
            <td data-label="ads">${productsArray[i].ads}</td>
            <td data-label="discount">${productsArray[i].discount}</td>
            <td data-label="total">${productsArray[i].total}</td>
            <td data-label="category">${productsArray[i].category}</td>
            <td class="dis"><button class="updateAndDelete update" type="submit" onclick="Update(${i})">Update</button></td>
            <td class="dis left"><button class="updateAndDelete Delete" type="submit" onclick="Delete(${i})">Detete</button></td>
        </tr>
    `;
    }

    tbody.innerHTML = cartoona;

    // add a button delete all
    if( productsArray.length > 0 ){
        addDelAll.innerHTML = `<button class="btn" type="submit" onclick="DeleteAll()">Delete All [${productsArray.length}]</button>`;
    }
    else {
        addDelAll.innerHTML = ``;
    }

}


// Update

if (!document.getElementById('idSpan')) {
    idSpan = document.createElement('span');
    idSpan.id = 'idSpan'; 
    idSpan.style.fontWeight = 'bold';
    idSpan.style.marginLeft = '5px';
    idSpan.style.background = 'brown';
    idSpan.style.padding = '5px';
    idSpan.style.borderRadius = '3px';
}


function Update(i){
    title.value = productsArray[i].title;
    price.value = productsArray[i].price;
    taxes.value = productsArray[i].taxes;
    ads.value = productsArray[i].ads;
    discount.value = productsArray[i].discount;
    category.value = productsArray[i].category;
    total.innerHTML = productsArray[i].total;
    count.style.display = 'none';
    if(price.value > 0){
        total.style.background = 'green';
    }
    mood = 'Update Product';
    create.innerHTML = mood;
    tmp = i;

    scroll({
        top: 33,
        behavior: "smooth"
    })


    // add id top inputs 
     idSpan.innerHTML = `ID: ${tmp+1}`;

     if (!document.getElementById('idSpan')) {
         title.parentNode.insertBefore(idSpan, title);
     }
    
}





// Delete 
function Delete(i){
    productsArray.splice(i,1);
    localStorage.product = JSON.stringify(productsArray);
    ShowData();
}


// Delete All
function DeleteAll(){
    localStorage.clear();
    productsArray.splice(0);
    ShowData();
}






// serach
let search = 'Title';

function searchByButton(id){
    if(id === "searchTitle"){
        search = "Title"
    }else{
        search = "Category"
    }
    searchProduct.value = '';
    ShowData();
    searchProduct.placeholder = "Search by "+search;
    searchProduct.focus()
    searchInput()
}


function searchInput(value){
    let cartoona = '';
    if(search == "Title"){
        for(let i=0 ; i < productsArray.length ; i++){
            if(productsArray[i].title.includes(value.toLowerCase())){
                cartoona += `
                <tr >
                    <td data-label="id">${i+1}</td>
                    <td data-label="title">${productsArray[i].title}</td>
                    <td data-label="price">${productsArray[i].price}</td>
                    <td data-label="taxes">${productsArray[i].taxes}</td>
                    <td data-label="ads">${productsArray[i].ads}</td>
                    <td data-label="discount">${productsArray[i].discount}</td>
                    <td data-label="total">${productsArray[i].total}</td>
                    <td data-label="category">${productsArray[i].category}</td>
                    <td class="dis"><button class="updateAndDelete update" type="submit" onclick="Update(${i})">Update</button></td>
                    <td class="dis left"><button class="updateAndDelete Delete" type="submit" onclick="Delete(${i})">Detete</button></td>
                </tr>
            `;
            }
        }
   }else{
        for(let i=0 ; i < productsArray.length ; i++){
            if(productsArray[i].category.includes(value.toLowerCase())){
                cartoona += `
                <tr >
                    <td data-label="id">${i+1}</td>
                    <td data-label="title">${productsArray[i].title}</td>
                    <td data-label="price">${productsArray[i].price}</td>
                    <td data-label="taxes">${productsArray[i].taxes}</td>
                    <td data-label="ads">${productsArray[i].ads}</td>
                    <td data-label="discount">${productsArray[i].discount}</td>
                    <td data-label="total">${productsArray[i].total}</td>
                    <td data-label="category">${productsArray[i].category}</td>
                    <td class="dis"><button class="updateAndDelete update" type="submit" onclick="Update(${i})">Update</button></td>
                    <td class="dis left"><button class="updateAndDelete Delete" type="submit" onclick="Delete(${i})">Detete</button></td>
                </tr>
            `;
            }
        }
   }
   tbody.innerHTML = cartoona;
}

