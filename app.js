/*
==============================================
                    THE SETUP
==============================================
Overview:  A function that creates the player & dealer objects, and the deck of cards.A dealer, single-player, and a deck of 52 cards exists

// I think we should create card objects vs. using arrays
// the keys are the rank of the card (Four, Five, Jack, Queen, King, Ace) 
// and value is the numerical value of the card.. what will allow us to assign an Ace a value of 1 or 11?
// I found this link below Monday morning at 8:28am, after outlining this method over the weekend/with Raahima (TA)! Hard to believe, but it's the truth.
// https://www.programiz.com/javascript/examples/shuffle-card
    */

const player = {
    hand: []
};

const dealer = {
    hand: []
};

const cardSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

const cardRank = {
    Two: 2, 
    Three: 3,
    Four: 4, 
    Five: 5, 
    Six: 6,
    Seven: 7, 
    Eight: 8, 
    Nine: 9, 
    Ten: 10,
    J: 10,
    Q: 10,
    K: 10, 
    A: 11
};

let deckOfCards = [];
let card = {};
for (suit of cardSuits) {
    for (ranks in cardRank) {
        // console.log(values, suits);
        // console.log(cardRank[ranks])
        if (cardRank[ranks]<9 || ranks==="Ten") {
            card = {
                Rank: cardRank[ranks], 
                Value: cardRank[ranks], 
                Suit: suit
            };
        } else {
            card = {
                Rank: ranks, 
                Value: cardRank[ranks], 
                Suit: suit
            };           
        }   
        if (card.Suit==="Clubs") {
            card.SuitSymbol = "♣";
        } else if (card.Suit==="Diamonds") {
            card.SuitSymbol = "♦";
        } else if (card.Suit==="Hearts") {
            card.SuitSymbol = "♥";
        } else {
            card.SuitSymbol = "♠";
        }
        deckOfCards.push(card);
    }
};

const resetGame = () => {
    location.reload();
};

const ShuffleDeck = (deck) => {
    for (let i=deck.length-1;i>0;i--) {
        let x = Math.floor(Math.random()*(i+1));
        [deck[i], deck[x]] = [deck[x], deck[i]];
    }
}

const dealCards = () => {
    const $playerHand = $('#player-cards');
    const $dealerHand = $('#dealer-cards');
    for (let i=0;i<4;i++) {
        const $card = $('<div>').addClass('cards');
        if (i%2===0) {
            player.hand.push(deckOfCards.pop())
            $card.text(player.hand[player.hand.length-1].Rank + player.hand[player.hand.length-1].SuitSymbol);
            $playerHand.append($card);
        } else {
            dealer.hand.push(deckOfCards.pop());
            if (dealer.hand.length-1 > 0) {
                $card.text(dealer.hand[dealer.hand.length-1].Rank + dealer.hand[dealer.hand.length-1].SuitSymbol);
                $dealerHand.append($card);
            } else {
                $card.attr('id', 'face-down-dealer-card');
                $dealerHand.append($card);
            }
            
        }            
    }
    splitHand();
}


let dealerHasAce = false;
let playerHasAce = false;

// https://usefulangle.com/post/3/javascript-search-array-of-objects
const findAce = (handOfCards) => {
    for (let i=0;i<handOfCards.length;i++) {
        if (handOfCards[i].Rank === "Ace") {
            let aceIndex = i;
            return true;
            // handOfCards[aceIndex].Value = 1;  //testing changing teh value fo the ace card to 1, works!
        }
    }
}

const checkNaturals = () => {
    let dealerHand = dealer.hand[0].Value + dealer.hand[1].Value;
    let playerHand = player.hand[0].Value + player.hand[1].Value;
    console.log("Dealer total: " + dealerHand);
    console.log("Player total: " + playerHand);

    if (playerHand===21 && dealerHand===21) {
        let $h3 = $('<h3>').text('DOUBLE BLACKJACK, TIE GAME!');
        $('body').append($h3);
    } else if (playerHand===21) {
        let $h3 = $('<h3>').text('NATURAL BLACKJACK FOR THE PLAYER!');
        $('body').append($h3);
    } else if (dealerHand===21) {
        const $dealerHand = $('#face-down-dealer-card');
        $dealerHand.text(dealer.hand[0].Rank + dealer.hand[0].SuitSymbol);
        let $h3 = $('<h3>').text('NATURAL BLACKJACK FOR THE DEALER!');
        $('body').append($h3);
    } else if (dealerHand > 21) {
        for (let i=0; i<dealer.hand.length; i++) {
            if (dealer.hand[i].Rank === "Ace") {
                let aceIndex = i;
                dealer.hand[aceIndex].Value = 1;
                }
            }
        let $h3 = $('<h3>').text('The dealer has 2 aces and we are printing out the hand values below, hopefully the new hand value is 12 not 22');
        $('body').append($h3);
        console.log('dealer hand value within the check Naturals function is now '+ dealerHand);
    } else if (playerHand > 21) {
        for (let i=0; i<player.hand.length; i++) {
            if (player.hand[i].Rank === "Ace") {
                let aceIndex = i;
                player.hand[aceIndex].Value = 1;
                }
            }
        let $h3 = $('<h3>').text('The player has 2 aces and we are printing out the hand values below, hopefully the new hand value is 12 not 22');
        $('body').append($h3);
        console.log('player hand value within the check Naturals function is now '+ playerHand);
    } else {
        return;
    }
};

const createGame = () => {      
    ShuffleDeck(deckOfCards);
    console.log(player.hand);
    if (player.hand.length > 0) {
        resetGame();
        return;
    } else {
        dealCards();
        checkNaturals();
    }    
};


const checkTotals = () => {
    let dealerTotal = 0;
    dealerHasAce = findAce(dealer.hand);
    for (cardValues of dealer.hand) {
        dealerTotal += cardValues.Value;
        if (dealerTotal>21 && dealerHasAce) {
            dealerTotal -= 10;
        }
    }
    console.log('check totals function calculates dealer total of : '+ dealerTotal);

    let playerTotal = 0;
    playerHasAce = findAce(player.hand);
    for (cardValues of player.hand) {
        playerTotal += cardValues.Value;
        if (playerTotal>21 && playerHasAce) {
            playerTotal -= 10;
        }
    }
    console.log('check totals function calculates player total of : '+ playerTotal);

    if (dealerTotal > 21) {
        let $h3 = $('<h3>').text('DEALER BUSTED! PLAYER WINS!');
        $('body').append($h3);
    } else if (playerTotal > 21) {
        let $h3 = $('<h3>').text('BUSTED! DEALER WINS!');
        $('body').append($h3);
    } else if (playerTotal === dealerTotal) {
        let $h3 = $('<h3>').text('PUSH!');
        $('body').append($h3);
    } else if (dealerTotal > playerTotal) {
        let $h3 = $('<h3>').text('DEALER WINS!');
        $('body').append($h3);
    } else if (dealerTotal < playerTotal) {
        let $h3 = $('<h3>').text('PLAYER WINS!');
        $('body').append($h3);
    } else {
        let $h3 = $('<h3>').text('HOUSTON WE HAVE A PROBLEM!');
        $('body').append($h3);
    }
}

const splitHand = () => {
    if (player.hand[0].Rank === player.hand[1].Rank) {
        $buttons = $('.buttons');
        $splitButton = $('<button>').text('Split Hand').attr('id', 'split-hand');
        $buttons.append($splitButton);        
    }
}

const splitHandFunction = () => {
    let $h3 = $('<h3>').text('Splitting '+ player.hand[0].Rank+'s');
    $('body').append($h3);
}

const hitPlayer = () => {
    if (player.hand.length === 0) {
        resetGame();
    } else {
        // adding the card to the hand
        player.hand.push(deckOfCards.pop());
    }
    
    // jQuery and setting the card text
    const $card = $('<div>').addClass('cards');
    $card.text(player.hand[player.hand.length-1].Rank + player.hand[player.hand.length-1].SuitSymbol);
    const $playerHand = $('#player-cards');
    $playerHand.append($card);
    
    // iterate over the player hand and add card values to the hand total
    let playerHandTotal = 0;
    for (let i=0;i<player.hand.length;i++) {
        playerHandTotal += player.hand[i].Value;
    }
    console.log("New player total: "+playerHandTotal);

    let playerAceCount = 0;
    // for loop to iterate over player hand
    for (let i=0;i<player.hand.length;i++) {
        if (player.hand[i].Rank === "Ace") {
            playerAceCount += 1;
        }
    }
    
    if (playerAceCount===0 && playerHandTotal > 21) {
        let $h3 = $('<h3>').text('BUST, PLAYER LOSES. DEALER WINS!');
        $('body').append($h3);
    } else if (playerAceCount>0 && playerHandTotal > 21) {
        playerHandTotal -= 10 * playerAceCount;
        console.log("subtracting 10 points for each Ace in the hand, new total is " + playerHandTotal);
        if (playerHandTotal>21) {
            let $h3 = $('<h3>').text('BUST, PLAYER LOSES. DEALER WINS!');
            $('body').append($h3);
        }
    }
}

const dealerLogic = () => {
    // flip over the dealer's face-down card
    const $dealerHand = $('#face-down-dealer-card');
    $dealerHand.text(dealer.hand[0].Rank + dealer.hand[0].SuitSymbol);
    
    // initializing dealer's hand assigning it a value of 0
    let dealerHand = 0;
    // iterate over the dealer's hand and sum the cards
    for (let i=0;i<dealer.hand.length;i++) {
        dealerHand += dealer.hand[i].Value;
    }

    while (dealerHand < 17) {
        console.log('Dealer will hit');
        // push another card to the dealer's hand
        dealer.hand.push(deckOfCards.pop());
        const $card = $('<div>').addClass('cards').text(dealer.hand[dealer.hand.length-1].Rank + dealer.hand[dealer.hand.length-1].SuitSymbol);
          
        dealerHand += dealer.hand[dealer.hand.length-1].Value;

        const $dealerHand = $('#dealer-cards');
        $dealerHand.append($card);
        
        console.log('Dealer\'s hand totals '+ dealerHand);
    }
    
    // determine whether or not the dealer has an Ace
    dealerHasAce = findAce(dealer.hand);
    // instantiating a variable to keep track of number of Aces within the dealer's hand
    let aceCount = 0;
    
    // if the dealer has an Ace, and his hand is greater than 21 loop thru the dealer's hand and keep count of the aces
    if (dealerHasAce && dealerHand > 21) {
        for (let i=0;i<dealer.hand.length;i++) {
            if (dealer.hand[i].Rank === "Ace") {
                aceCount +=1;
                dealer.hand[i].Value = 1;
                for (let i=0;i<dealer.hand.length;i++) {
                    newDealerHand += dealer.hand[i].Value;
                }
            }
        }
    }  

    checkTotals();
};

// onload function
$(() => {
    
    // const $reset = $('#reset');
    // $reset.on('click', resetGame);

    // target the DEAL ID using jQuery, assigning to $deal variable
    // adding an event listener, passing in the callback function createGame
    const $deal = $('#deal');
    $deal.on('click', createGame);

    // target the HIT ID using jQuery, assigning to $hit variable
    // adding an event listener, passing in the callback function hitPlayer
    const $hit = $('#hit');
    $hit.on('click', hitPlayer);

    // target the STAND ID using jQuery, assigning to $stand variable
    // adding an event listener, passing in the callback function dealerLogic
    const $stand = $('#stand');
    $stand.on('click', dealerLogic);

    // target the SPLIT-HAND ID using jQuery, assigning to $splitButton variable
    // adding an event listener, passing in the callback function splitHandFunction
    const $splitButton = $('#split-hand');
    $splitButton.on('click', splitHandFunction);

});