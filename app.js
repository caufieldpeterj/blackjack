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
    Jack: 10,
    Queen: 10,
    King: 10, 
    Ace: 11
};

// console.log(Object.values(cardRank));

// for loop to iterate over the suits and for loop to iterate over the cards to create the actual cards

let deckOfCards = [];

for (suit of cardSuits) {
    for (ranks in cardRank) {
        // console.log(values, suits);
        // console.log(cardRank[ranks])
        let card = {Rank: ranks, Value: (cardRank[ranks]), Suit: suit}
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
                $card.text('Dealer: Card 1').attr('id', 'face-down-dealer-card');
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
        $dealerHand.text(dealer.hand[0].Rank);
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
    dealCards();
    checkNaturals();
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
        let $h3 = $('<h3>').text('checkTotal says... DEALER BUSTED! PLAYER WINS!');
        $('body').append($h3);
    } else if (playerTotal > 21) {
        let $h3 = $('<h3>').text('checkTotal says... BUSTED! DEALER WINS!');
        $('body').append($h3);
    } else if (playerTotal === dealerTotal) {
        let $h3 = $('<h3>').text('checkTotal says... PUSH!');
        $('body').append($h3);
    }
    // } else if (dealerTotal > playerTotal) {
    //     let $h3 = $('<h3>').text('DEALER WINS!');
    //     $('body').append($h3);
    // } else if (dealerTotal < playerTotal) {
    //     let $h3 = $('<h3>').text('PLAYER WINS!');
    //     $('body').append($h3);
    // } else {
    //     let $h3 = $('<h3>').text('HOUSTON WE HAVE A PROBLEM!');
    //     $('body').append($h3);
    // }
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
    // adding the card to the hand
    player.hand.push(deckOfCards.pop());
    // jQuery and setting the card text
    const $card = $('<div>').addClass('cards');
    $card.text(player.hand[player.hand.length-1].Rank);
    const $playerHand = $('#player-cards');
    $playerHand.append($card);
    
    // iterate over the player hand and add card values to the hand total
    let playerHandTotal = 0;
    for (let i=0;i<player.hand.length;i++) {
        playerHandTotal += player.hand[i].Value;
    }

    console.log("New player total: "+playerHandTotal);
 
    playerHasAce = findAce(player.hand);

    if (playerHasAce && playerHandTotal > 21) {
        playerHandTotal -= 10;
        console.log("subtracting 10 from hand, new total is " + playerHandTotal);
    }

    if (playerHandTotal>21) {
        let $h3 = $('<h3>').text('BUST, PLAYER LOSES. DEALER WINS!');
        $('body').append($h3);
    }


    /*
    // if the player has and ace and HITTING caused their total to go over 21...
    if (playerHasAce && playerHandTotal > 21) {
        // iterate over the player's hand
        for (let i=0; i<player.hand.length; i++) {
            // if any of the cards have the rank of Ace 
            if (player.hand[i].Rank === "Ace") {
                // set ace index equal to that cards position in the player's hand array
                let aceIndex = i;
                // reassign the ace a value of 1 vs. 11
                player.hand[aceIndex].Value = 1;
                }

        console.log("after we recalculate hand total: "+ playerHandTotal);
        }
    }
    */
}



const dealerLogic = () => {
    const $dealerHand = $('#face-down-dealer-card');
    $dealerHand.text(dealer.hand[0].Rank);

    let dealerHand = 0;
    for (let i=0;i<dealer.hand.length;i++) {
        dealerHand += dealer.hand[i].Value;
    }

    dealerHasAce = findAce(dealer.hand);
    if (dealerHasAce) {
        console.log("The dealer has an Ace");
    }


    while (dealerHand < 17) {
        console.log('dealer will hit');
        dealer.hand.push(deckOfCards.pop());
        const $card = $('<div>').addClass('cards');
        const $dealerHand = $('#dealer-cards');
        dealerHand += dealer.hand[dealer.hand.length-1].Value;
        $card.text(dealer.hand[dealer.hand.length-1].Rank);
        $dealerHand.append($card);
        dealerHasAce = findAce(dealer.hand);
        if (dealerHasAce && dealerHand > 21) {
            for (let i=0;i<dealer.hand.length;i++) {
                if (dealer.hand[i].Rank === "Ace") {
                    let aceIndex = i;
                    dealer.hand[aceIndex].Value = 1;
                }
            }
        }
        console.log('Dealer\'s hand totals '+ dealerHand);
    }
    
    let playerTotal = 0;
    for (cardValues of player.hand) {
        playerTotal += cardValues.Value;
    }

    checkTotals();

    if (dealerHand <= 21 && dealerHand > playerTotal) {
        let $h3 = $('<h3>').text('DEALER WINS!');
        $('body').append($h3);
    } else if (playerTotal <= 21 && dealerHand < playerTotal) {
        let $h3 = $('<h3>').text('PLAYER WINS!');
        $('body').append($h3);
    } else {
        // let $h3 = $('<h3>').text('HOUSTON WE HAVE A PROBLEM!');
        // $('body').append($h3);
    }
};



$(() => {
    // console.log(dealer.hand);
    // console.log(player.hand);
    // console.log('What would you like to do, hit or stand?');

    const $deal = $('#deal');
    $deal.on('click', createGame);

    // target the HIT button using jQuery, assigning to $hit variable
    // adding an event listener, passing in the callback function hitPlayer
    const $hit = $('#hit');
    $hit.on('click', hitPlayer);

    const $stand = $('#stand');
    $stand.on('click', dealerLogic);

    const $reset = $('#reset');
    $reset.on('click', resetGame);

    const $splitButton = $('#split-hand');
    $splitButton.on('click', splitHandFunction);

});
