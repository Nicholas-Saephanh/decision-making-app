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
		randomListAlert.className = "alert alert-success";
		randomListAlert.innerHTML = "Add any number of unique items to the list and choose randomly between any of them!";
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
	let slotDiv = document.getElementById('slotBox');
	let newH1 = document.createElement('h1');
	let newH1TextNode = document.createTextNode(randomChoice.innerHTML);

	


	if (randomChoice === undefined) {
		console.error("There is nothing on the list dummy!");
		randomListAlert.className = "alert alert-danger";
		randomListAlert.innerHTML = "There is nothing on the list dummy!";
		return
	}
	
	randomListAlert.className = "alert alert-success";
	randomListAlert.innerHTML = "Add any number of unique items to the list and choose randomly between any of them!";

	slotDiv.innerHTML ="";
	newH1.appendChild(newH1TextNode);
	newH1.className='animated fadeIn';
	slotDiv.appendChild(newH1);

	console.log(randomChoice);
}

//===============================================
//		APP FUNCTIONS 
//===============================================
function coinFlip() {
	let lastFlipResult = document.getElementById('coin').dataset.lastFlipResult;
    let random = Math.floor(Math.random() * 2); 
    if( random == 1 ){ 
    	//if 1, flip to the opposite side
    	//Find #coin and remove all classes to reapply class to activate css animation
		document.getElementById('coin').className="";
		setTimeout(function(){
			if (lastFlipResult === 'heads') {
				document.getElementById('coin').className='animation900FromHeads';
				document.getElementById('coin').dataset.lastFlipResult = 'tails';
				console.log('heads to tails')
	    	}else if(lastFlipResult === 'tails'){
	    		document.getElementById('coin').className='animation1080FromTails';
	    		document.getElementById('coin').dataset.lastFlipResult = 'heads';
	    		console.log('tails to heads')
	    	}		
		}, 0);
    	
    }else{ 
    	//flip to the same side
    	document.getElementById('coin').className="";
		setTimeout(function(){
			if (lastFlipResult === 'heads') {
				document.getElementById('coin').className='animation1080FromHeads';
				document.getElementById('coin').dataset.lastFlipResult = 'heads';
				console.log('from heads to heads')
	    	}else if(lastFlipResult === 'tails'){
	    		document.getElementById('coin').className='animation900FromTails';
	    		document.getElementById('coin').dataset.lastFlipResult = 'tails';
	    		console.log('tails to tails')
	    	}	
		}, 0);
		
    }
 }


	function runScript(e) {
	    //See notes about 'which' and 'key'
	    if (document.activeElement.id === 'newItemText' && e.keyCode == 13 ) {
	        addListItem();
	        return false;
	    }
	}



	//Event listeners to delegate functions from inside the IIFE
	document.getElementById("newItemText").addEventListener("keyup", runScript, false);
	document.getElementById("addItemToList").addEventListener("click", addListItem, false);
	document.getElementById("coinFlip").addEventListener("click", coinFlip, false);
	document.getElementById("chooseRandom").addEventListener("click", chooseRandomListItem, false)
})(window, document);