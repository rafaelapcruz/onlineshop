
var title = (localStorage.getItem("title")).split(",");
var quantity = (localStorage.getItem("quantity")).split(",");
var price = (localStorage.getItem("price")).split(",");
var image = (localStorage.getItem("image")).split(",");
console.log(title, price, image);

document.addEventListener("DOMContentLoaded", addItemToCart(title));
document.addEventListener("DOMContentLoaded", updateCartSubtotal);

function addItemToCart(title) {
	for (var i = 0; i < title.length; i++) {
		var newItem = title[i];
		var newCartRow = document.createElement('tr');
		newCartRow.setAttribute('class', 'cart-row');
		var cartBody = document.getElementById('cart-body');
		var cartRowHTLM = `
			<tr class="cart-row">
				<th class="cart-item" scope="row"><img src="${image[i]}" width="50" height="50"><span class="title">${title[i]}</span></th>
				<td class="cart-price">${price[i]}</td>
				<td class="cart-quantity"><input class="btn-quantity" type="number" min="1" value="${quantity[i]}"></td>
				<td class="cart-subtotal"><span class="subtotal-value">subtotal</span><button type="button" class="btn btn-danger btn-sm btn-spacing">Remove</td>
			</tr>`
		newCartRow.innerHTML = cartRowHTLM;
		cartBody.append(newCartRow);
		newCartRow.getElementsByClassName('btn-quantity')[0].addEventListener('change', updateCartSubtotal);
	}
}

function removeCartTable() {
	var cartTable = document.getElementsByClassName('cart-table')[0];
	cartTable.remove()
	document.getElementsByClassName('btn-checkout')[0].innerHTML = "Thank you for your purchase!";
}

function removeCartItem(event) {
	var cartRows = document.getElementsByClassName('cart-row');
	if (cartRows.length == 1) {
		removeCartTable();
		document.getElementsByClassName('btn-checkout')[0].innerHTML = "Your cart is empty!";
		var buttonHome = '<a class="btn btn-primary" href="./index.html" role="button" style="background-color: #f7d1ba; border-color: #f7a97b; text-align: center;">Continue shopping</a>';
		document.getElementById('backToHome').innerHTML = buttonHome;
		localStorage.clear();
	} else {
		var buttonClicked = event.target; //seleciona o bot??o que foi o "target" do evento (click)
		var rowElement = buttonClicked.parentElement.parentElement;
		//remove cartRow from array;
		var titleElementTitle = rowElement.getElementsByClassName('title')[0].innerText;
	for (var i = 0; i < title.length; i++) {
		if (title[i] == titleElementTitle) {
			title.splice(i, 1);
			price.splice(i, 1);
			image.splice(i, 1);
			localStorage.setItem("title", title);
    		localStorage.setItem("price", price);
   			localStorage.setItem("image", image);
		}
	}
	rowElement.remove()

	updateCartTotal();
	}
}

var removeCartItemButtons = document.getElementsByClassName('btn-danger') //seleciona todos os bot??es Remove
for (var i = 0; i < removeCartItemButtons.length; i++) { //para cada bot??o Remove
	var buttonRemove = removeCartItemButtons[i];
	buttonRemove.addEventListener('click', removeCartItem); //adicionar o "eventListener" que ?? ativado quando o bot??o Remove ?? clicado e chama a fun????o removeCartItem
}


function updateCartTotal() {
	var cartTotal = 0;
	var subtotalElements = document.getElementsByClassName('subtotal-value');
	console.log(subtotalElements)
	for (var i = 0; i < subtotalElements.length; i++) { //para cada linha da tabela
		var subtotalElement = subtotalElements[i]; //
		console.log(subtotalElement);
		var subtotalValue = parseFloat(subtotalElement.innerText.slice(0, -1));
		console.log(subtotalValue);
		cartTotal += subtotalValue;
	}
	document.getElementsByClassName('cart-total')[0].innerText = cartTotal.toFixed(2) + "???";
}

function updateCartSubtotal() {
	var rowSubtotal = 0;
	var cartRows = document.getElementsByClassName('cart-row');
	for (var i = 0; i < cartRows.length; i++) { //para cada linha da tabela
		var rowElement = cartRows[i]; //
		console.log(rowElement);
		var priceElement = rowElement.getElementsByClassName('cart-price')[0]; //porque ?? que aqui temos de colocar o elemento de ??ndice zero, se s?? h?? um elemento? Ser?? porque getElementsByClassName retorna sempre um array?
		console.log(priceElement);
		var quantityElement = rowElement.getElementsByClassName('btn-quantity')[0];
		console.log(quantityElement);
		var price = parseFloat(priceElement.innerText.slice(0, -1)); //apanhamos o texto com o pre??o (innerText) e removemos o sinal de euro com slice e convertemos num n??mero para poderos fazer o c??lculo
		console.log(price);
		var quantity = quantityElement.value;
		console.log(quantity);
		rowSubtotal += price * quantity;
		console.log(rowSubtotal);
		rowElement.getElementsByClassName('subtotal-value')[0].innerText = rowSubtotal.toFixed(2) + "???";
		rowSubtotal = 0;
	}
	updateCartTotal();
}

var quantityButtons = document.getElementsByClassName('btn-quantity'); //seleciona todos os bot??es Quantity
for (var i = 0; i < quantityButtons.length; i++) { //para cada bot??o Quantity
	var quantityButton = quantityButtons[i];
	quantityButton.addEventListener('change', updateCartSubtotal); //adicionar o "eventListener" que ?? ativado quando o valor do bot??o Quantity ?? alterado e chama a fun????o updateCartSubtotal
}