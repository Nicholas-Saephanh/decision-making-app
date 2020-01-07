"use strict";
//===============================================
//		HELPER FUNCTIONS
//===============================================
(function (window, document) {

	
function addListItem() {
	let buttonClicked = document.getElementById("addItemToList");
	let parentList = document.getElementById(buttonClicked.parentElement.id);
	let listItems = parentList.getElementsByTagName('li');
	let newListItem = document.createElement('li');
	let userInputText = document.getElementById("newItemText").value.trim();
	let newTextNode = document.createTextNode(userInputText);
	let randomListAlert = document.getElementById('randomListAlert');


	//If the value of the text box already exists, dont let user submit that text
	for (let i = listItems.length - 1; i >= 0; i--) {
		if (userInputText.toLowerCase() === listItems[i].innerHTML.toLowerCase()) {
			console.error(listItems[i].innerHTML + " is already on the list!");
			randomListAlert.className = "alert alert-danger";
			randomListAlert.innerHTML = "That item is already on the list! Please type something unique!"
			return
		}
	}

	
	if (userInputText === "") {
		console.error("Please Insert New Item text");
		randomListAlert.className = "alert alert-danger";
		randomListAlert.innerHTML = "'New Item' box is empty! Type something in, then click Add Item!"
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

function chooseRandomListItem() {
	let buttonClicked = document.getElementById("chooseRandom");
	let parentOfButtonClicked = document.getElementById(buttonClicked.parentElement.id);
	let listItemsOfList = parentOfButtonClicked.getElementsByTagName('li');
	let randomNumber = Math.floor(Math.random() * listItemsOfList.length);
	let randomChoice = listItemsOfList[randomNumber];
	let randomListAlert = document.getElementById('randomListAlert');

	if (randomChoice === undefined) {
		console.error("There is nothing on the list dummy!");
		randomListAlert.className = "alert alert-danger";
		randomListAlert.innerHTML = "There is nothing on the list dummy!";
		return
	}
	
	randomListAlert.className = "alert alert-success";
	randomListAlert.innerHTML = "Add any number of unique items to the list and choose randomly between any of them!";
	console.log(randomChoice);
}

//===============================================
//		APP FUNCTIONS 
//===============================================
function coinFlip() {
	var lastFlipResult = document.getElementById('coin').dataset.LastFlipResult;
	//when moving to oop, make an outside variable that keeps count of how many sequential heads and tails, then add agane additional agane per count.
    let random = Math.floor(Math.random() * 2);
    // console.log("Random Number Generated : " + random );  
    if( random == 1 ){ //if 1, flip to the same side
    		// document.getElementById('coin').innerHTML += " AGANE";
		document.getElementById('coin').className="";
		setTimeout(function(){
			document.getElementById('coin').className='animation900';
		}, 1);
    	
    }else{ //flip to the opposite side
    	document.getElementById('coin').className="";
		setTimeout(function(){
			document.getElementById('coin').className='animation1080';
			if (lastFlipResult == 'tails') {
				lastFlipResult = 'heads';
	    		// document.getElementById('coin').innerHTML += " AGANE";
	    	}else{
	    		lastFlipResult = 'tails';
	    		// document.getElementById('coin').innerHTML = "Tails";
	    	}
		}, 1);
		
    }
 }





	//Event listeners to delegate functions from inside the IIFE
	document.getElementById("addItemToList").addEventListener("click", addListItem, false);
	document.getElementById("coinFlip").addEventListener("click", coinFlip, false);
	document.getElementById("chooseRandom").addEventListener("click", chooseRandomListItem, false)
})(window, document);