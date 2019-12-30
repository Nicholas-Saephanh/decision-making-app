//===============================================
//		HELPER FUNCTIONS
//===============================================
function addListItem() {
	// var buttons = document.getElementsByTagName("button");
	// var buttonsCount = buttons.length;
	// for (let i = 0; i <= buttonsCount; i++) {
	//     buttons[i].onclick = function(e) {
	//         alert(this.id);
	//     };
	// }​
	let buttonClicked = document.getElementById("addItemToList");
	let parentList = document.getElementById(buttonClicked.parentElement.id);
	let listItems = parentList.getElementsByTagName('li');
	let newListItem = document.createElement('li');
	let userInputText = document.getElementById("newItemText").value.trim();
	let newTextNode = document.createTextNode(userInputText);


	//If the value of the text box already exists, dont let user submit that text
	for (let i = listItems.length - 1; i >= 0; i--) {
		if (userInputText.toLowerCase() === listItems[i].innerHTML.toLowerCase()) {
			console.error(listItems[i].innerHTML + " is already on the list!")
			console.error('Item already exists')
			return
		}
	}

	
	if (userInputText === "") {
		console.error("Please Insert New Item text");
		return 
	}else{
		newListItem.appendChild(newTextNode);
		parentList.appendChild(newListItem);
		document.getElementById("newItemText").value = "";
	}
	

	// Adds item to HTML <ul>
	// "Add Item" button must be a child of <ul> and have the id of addItem

	//Find button parent
	console.log(buttonClicked.parentElement.id);
}

function chooseRandomListItem(buttonID) {
	let buttonClicked = document.getElementById(buttonID);
	let parentOfButtonClicked = document.getElementById(buttonClicked.parentElement.id);
	let listItemsOfList = parentOfButtonClicked.getElementsByTagName('li');
	let randomNumber = Math.floor(Math.random() * listItemsOfList.length);
	let randomChoice = listItemsOfList[randomNumber];

	if (randomChoice === undefined) {
		console.error("There is nothing on the list dummy!");
		return
	}

	console.log(randomChoice);
}

//===============================================
//		APP FUNCTIONS
//===============================================
function coinFlip() {
	//when moving to oop, make an outside variable that keeps count of how many sequential heads and tails, then add agane additional agane per count.
    let random = Math.floor(Math.random() * 2);
    // console.log("Random Number Generated : " + random );  
    if( random == 1 ){
    	if (document.getElementById('coin').innerHTML == 'HEADS') {
    		document.getElementById('coin').innerHTML += " AGANE";
    	}else{
    		document.getElementById('coin').innerHTML = 'HEADS';
    	}
    }else{
		if (document.getElementById('coin').innerHTML == 'TAILS') {
    		document.getElementById('coin').innerHTML += " AGANE";
    	}else{
    		document.getElementById('coin').innerHTML = 'TAILS';
    	}
    }
 }

