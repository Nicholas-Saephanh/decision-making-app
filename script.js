"use strict";

//===============================================
//		APP IIFE
//===============================================
(function (window, document) {
	//Create a button INSIDE the UL with #addItemToList
	//Create a text input INSIDE the UL with #newItemText
function addListItem() {
	//target button inside UL
	let buttonClicked = document.getElementById("addItemToList");
	//Get the id of the parent element, which should be the UL
	let parentList = document.getElementById(buttonClicked.parentElement.id);
	//Array of li in the UL
	let listItems = parentList.getElementsByTagName('li');
	//Creates empty Element node li
	let newListItem = document.createElement('li');
	//Takes the value of the input box 
	let userInputText = document.getElementById("newItemText").value.trim();
	//create html text node from userInputText
	let newTextNode = document.createTextNode(userInputText);
	//Get the alert box at top of list appendChild
	let randomListAlert = document.getElementById('randomListAlert');


	//If the value of the text box already exists, dont let user submit that text and throw error into alert box
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

  // Setup your threejs scene
    var scene = new THREE.Scene();
    // ...
    
    // Setup your cannonjs world
    var world = new CANNON.World();
    // ...
    
    DiceManager.setWorld(world);
    
    // Create a dice
    var dice = new DiceD6({backColor: '#ff0000'});
    scene.add(dice.getObject());
    
    // If you want to place the mesh somewhere else, you have to update the body
    dice.getObject().position.x = 150;
    dice.getObject().position.y = 100;
    dice.getObject().rotation.x = 20 * Math.PI / 180;
    dice.updateBodyFromMesh();
    
    // Set the value of the side, which will be upside after the dice lands
    DiceManager.prepareValues([{dice: dice, value: 6}]);
    
    //Animate everything
    function animate() {
        world.step(1.0 / 60.0);
        
        dice.updateMeshFromBody(); // Call this after updating the physics world for rearranging the mesh according to the body
        
        renderer.render(scene, camera);
        
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);