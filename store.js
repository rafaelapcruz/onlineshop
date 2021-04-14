
console.log(localStorage.getItem("title")); //não funciona

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
		//var buttonEnd = "<button type="button" class="btn">Continue shopping"; //substituir Maria
		document.getElementById('backtoshop').innerHTML = "Maria";
	} else {
	var buttonClicked = event.target; //seleciona o botão que foi o "target" do evento (click)
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal();
	}
}

var removeCartItemButtons = document.getElementsByClassName('btn-danger') //seleciona todos os botões Remove
for (var i = 0; i < removeCartItemButtons.length; i++) { //para cada botão Remove
	var buttonRemove = removeCartItemButtons[i];
	buttonRemove.addEventListener('click', removeCartItem); //adicionar o "eventListener" que é ativado quando o botão Remove é clicado e chama a função removeCartItem
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
	document.getElementsByClassName('cart-total')[0].innerText = cartTotal + "€";
}

function updateCartSubtotal() {
	var rowSubtotal = 0;
	var cartRows = document.getElementsByClassName('cart-row');
	for (var i = 0; i < cartRows.length; i++) { //para cada linha da tabela
		var rowElement = cartRows[i]; //
		console.log(rowElement);
		var priceElement = rowElement.getElementsByClassName('cart-price')[0]; //porque é que aqui temos de colocar o elemento de índice zero, se só há um elemento? Será porque getElementsByClassName retorna sempre um array?
		console.log(priceElement);
		var quantityElement = rowElement.getElementsByClassName('btn-quantity')[0];
		console.log(quantityElement);
		var price = parseFloat(priceElement.innerText.slice(0, -1)); //apanhamos o texto com o preço (innerText) e removemos o sinal de euro com slice e convertemos num número para poderos fazer o cálculo
		console.log(price);
		var quantity = quantityElement.value;
		console.log(quantity);
		rowSubtotal += price * quantity;
		console.log(rowSubtotal);
		rowElement.getElementsByClassName('subtotal-value')[0].innerText = rowSubtotal + "€";
		rowSubtotal = 0;
	}
	updateCartTotal();
}

var quantityButtons = document.getElementsByClassName('btn-quantity'); //seleciona todos os botões Quantity
for (var i = 0; i < quantityButtons.length; i++) { //para cada botão Quantity
	var quantityButton = quantityButtons[i];
	quantityButton.addEventListener('change', updateCartSubtotal); //adicionar o "eventListener" que é ativado quando o valor do botão Quantity é alterado e chama a função updateCartSubtotal
}