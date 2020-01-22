"use strict";
//===============================================
//		APP IIFE
//===============================================
(function(window, document) {

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
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
        } else {
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
        let listID = document.getElementById("list");
        let listItemsOfList = listID.getElementsByTagName('li');
        let randomNumber = Math.floor(Math.random() * listItemsOfList.length);
        let randomChoice = listItemsOfList[randomNumber];
        let randomListAlert = document.getElementById('randomListAlert');
        let slotDiv = document.getElementById('slotBox');
        let newH1 = document.createElement('h1');
        if (randomChoice === undefined) {
            console.error("There is nothing on the list dummy!");
            randomListAlert.className = "alert alert-danger";
            randomListAlert.innerHTML = "There is nothing on the list dummy!";
            return
        }






        randomListAlert.className = "alert alert-success";
        randomListAlert.innerHTML = "Add any number of unique items to the list and choose randomly between any of them!";

        slotDiv.innerHTML = "";
        newH1.appendChild(document.createTextNode(randomChoice.innerHTML));
        newH1.className = 'animated fadeIn';
        slotDiv.appendChild(newH1);

        console.log(randomChoice);
    }

    //===============================================
    //		APP FUNCTIONS 
    //===============================================
    function coinFlip() {
        let lastFlipResult = document.getElementById('coin').dataset.lastFlipResult;
        let random = Math.floor(Math.random() * 2);
        if (random == 1) {
            //if 1, flip to the opposite side
            //Find #coin and remove all classes to reapply class to activate css animation
            document.getElementById('coin').className = "";
            setTimeout(function() {
                if (lastFlipResult === 'heads') {
                    document.getElementById('coin').className = 'animation900FromHeads';
                    document.getElementById('coin').dataset.lastFlipResult = 'tails';
                    console.log('heads to tails')
                } else if (lastFlipResult === 'tails') {
                    document.getElementById('coin').className = 'animation1080FromTails';
                    document.getElementById('coin').dataset.lastFlipResult = 'heads';
                    console.log('tails to heads')
                }
            }, 0);

        } else {
            //flip to the same side
            document.getElementById('coin').className = "";
            setTimeout(function() {
                if (lastFlipResult === 'heads') {
                    document.getElementById('coin').className = 'animation1080FromHeads';
                    document.getElementById('coin').dataset.lastFlipResult = 'heads';
                    console.log('from heads to heads')
                } else if (lastFlipResult === 'tails') {
                    document.getElementById('coin').className = 'animation900FromTails';
                    document.getElementById('coin').dataset.lastFlipResult = 'tails';
                    console.log('tails to tails')
                }
            }, 0);

        }
    }


    /*===============================
    		Deck 
    ================================*/
    const deck = {
        ranks: ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'],
        suits: ['♠', '♥', '♣', '♦'],
        cards: [],
        suitColor: {
            '♠': 'black',
            '♣': 'black',
            '♦': 'red',
            '♥': 'red',
        },
        createDeck: function() {
            let id = 1;
            deck.cards = [];
            document.getElementById('deckOutput').innerHTML = "";
            for (let r = 0; r < deck.ranks.length; r++) {
                for (let s = 0; s < deck.suits.length; s++) {
                    let card = {
                        id: id,
                        rank: deck.ranks[r],
                        suit: deck.suits[s],
                        color: (deck.suits[s] === '♠' || deck.suits[s] === '♣') ? "black" : "red"

                    }
                    deck.cards.push(card);
                    id++;
                }
            }
            deck.shuffle(deck.cards)
            console.table(deck.cards);
            // Fisher–Yates shuffle
            // console.table(this.shuffle(this.cards));
            // this.isDeckShuffled = false;
            // this.shuffleCount = 0;
        },
        shuffle(array) {
            //Fisher–Yates shuffle
            var m = array.length,
                t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        },
        draw() {
            const drawnCard = deck.cards.pop();
            console.table(deck.cards);
            console.log(drawnCard);
            let cardStyle = document.createElement('span');
            cardStyle.style='border:1px black solid;padding:50px 25px; display:inline-block;';
            let cardValue = document.createTextNode(` ${drawnCard.rank} of ${drawnCard.suit}`);
            cardStyle.appendChild(cardValue);

            document.getElementById('deckOutput').appendChild(cardStyle);

        }
    }
    // Add these 2 to even listeners later.
    deck.createDeck();
    deck.shuffle(deck.cards)

    /*===============================
    		Rock  Paper Scissors 
    ================================*/

    function rockPaperScissors() {
        const random = getRandomIntInclusive(1, 3);
        const rpsDiv = document.getElementById("rpsOutput");
        // const rpsArr = ["Rock", "Paper", "Scissors"];
        console.log(random);
        switch (random) {
            case 1:
                rpsDiv.innerHTML = "<h1 class='animated fadeIn'> Rock </h1>";
                break;
            case 2:
                rpsDiv.innerHTML = "<h1 class='animated fadeIn'> Paper </h1>";
                break;
            case 3:
                rpsDiv.innerHTML = "<h1 class='animated fadeIn'> Scissors </h1>";
                break;
        }
    }




    function runScript(e) {
        //See notes about 'which' and 'key'
        if (document.activeElement.id === 'newItemText' && e.keyCode == 13) {
            addListItem();
            return false;
        }
    }
    //Event listeners to delegate functions from inside the IIFE
    document.getElementById("coinFlip").addEventListener("click", coinFlip, false);
    document.getElementById("newItemText").addEventListener("keyup", runScript, false);
    document.getElementById("addItemToList").addEventListener("click", addListItem, false);
    document.getElementById("chooseRandom").addEventListener("click", chooseRandomListItem, false);
    document.getElementById('resetDeck').addEventListener("click", deck.createDeck, false);
    document.getElementById('drawCard').addEventListener("click", deck.draw, false);
    document.getElementById('chooseRps').addEventListener("click", rockPaperScissors, false);
})(window, document);