var productName = document.getElementById('pn');
var productPrice = document.getElementById('pp');
var productCategory = document.getElementById('pc');
var productDesc = document.getElementById('pd');

var currentIndex = -1; // -1 means no product is being updated.
var allProducts = [];


if(localStorage.getItem('allProducts') !=null ){
    allProducts=JSON.parse(localStorage.getItem('allProducts') );
    displayProducts();
}

function addNewElement(){

    var product = {

        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
    }

    allProducts.push(product);
    localStorage.setItem("allProducts", JSON.stringify(allProducts));

    clearForm();
    displayProducts();
}

function clearForm(){

    productName.value ="";
    productCategory.value ="";
    productPrice.value ="";
    productDesc.value ="";
}


function displayProducts(){

    var cartona = "";

    for(var i=0; i<allProducts.length; i++){

        cartona +=  ` <tr>
                    <td>`+allProducts[i].name + `</td>
                    <td>`+allProducts[i].price + `</td>
                    <td>`+allProducts[i].category + `</td>
                    <td>${ allProducts[i].desc } </td>

                    <td>
                        <button onClick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                    </td>

                    <td>
                    <button onClick="prepareUpdate(${i})" class="btn btn-warning">Update</button>
                    </td>

                </tr>  `


    }

    document.getElementById('tbody').innerHTML=cartona;


}

function deleteProduct(index){

    allProducts.splice( index, 1 );
    displayProducts();
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
}

function search( term ) {
    //var term = document.getElementById('search').value;
    var cartona = "";

    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(term.toLowerCase())  ==  true ) {
            cartona += `
                <tr>
                    <td>${allProducts[i].name}</td>
                    <td>${allProducts[i].price}</td>
                    <td>${allProducts[i].category}</td>
                    <td>${allProducts[i].desc}</td>
                    <td>
                        <button onClick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                    </td>
                    <td>
                        <button onClick="prepareUpdate(${i})" class="btn btn-warning">Update</button>
                    </td>
                </tr>
            `;
        }
    }

    // Update table
    document.getElementById('tbody').innerHTML = cartona;
}

// Prepare update (fills form with selected product)
function prepareUpdate(index) {
    currentIndex = index; // Store index of the product being updated
    productName.value = allProducts[index].name;
    productPrice.value = allProducts[index].price;
    productCategory.value = allProducts[index].category;
    productDesc.value = allProducts[index].desc;

    document.getElementById('update-btn').style.display = "inline-block";
    
    var addBtn = document.getElementById('add-btn');
    if (addBtn) { addBtn.style.display = 'none'; }
}

// Update the selected product
function updateProduct() {
    if (currentIndex !== -1) {
        allProducts[currentIndex] = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDesc.value,
        };

        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        displayProducts();
        clearForm();
        resetButtons();
        currentIndex = -1; // Reset index
    }
}

// Reset buttons after update
function resetButtons() {
    document.getElementById('update-btn').style.display = "none";
    // Show the Add button again after update
    var addBtn = document.getElementById('add-btn');
    if (addBtn) { addBtn.style.display = 'inline-block'; }
}


//Regular Expression
function validateName(){

    var regEx = /^[a-z]{3,5}$/i;

    return regEx.test(productName.value);
}

