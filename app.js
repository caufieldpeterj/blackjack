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
        deckOfCards.push(card);
    }
};

const resetGame = () => {
    location.reload();
};


const createGame = () => {   
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
                $card.text(player.hand[player.hand.length-1].Rank);
                $playerHand.append($card);
            } else {
                dealer.hand.push(deckOfCards.pop());
                if (dealer.hand.length-1 > 0) {
                    $card.text(dealer.hand[dealer.hand.length-1].Rank);
                    $dealerHand.append($card);
                } else {
                    $card.text('Dealer: Card 1').attr('id', 'face-down-dealer-card');
                    $dealerHand.append($card);
                }
                
            }            
        }
    }

    const splitHand = () => {
        if (player.hand[0].Rank === player.hand[1].Rank) {
            $buttons = $('.buttons');
            $splitButton = $('<button>').text('Split Hand').attr('id', 'split-hand');
            $buttons.append($splitButton); 
            
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
        } else if (playerHand===21 && dealerHand < 21) {
            let $h3 = $('<h3>').text('NATURAL BLACKJACK FOR THE PLAYER!');
            $('body').append($h3);
        } else if (playerHand < 21 && dealerHand===21) {
            const $dealerHand = $('#face-down-dealer-card');
            $dealerHand.text(dealer.hand[0].Rank);
            let $h3 = $('<h3>').text('NATURAL BLACKJACK FOR THE DEALER!');
            $('body').append($h3);
        } else if (playerHand > 21 || dealerHand > 21) {
            let $h3 = $('<h3>').text('Houston we have a problem');
            $('body').append($h3);
        } else {
            return;
        }
    };
    
    ShuffleDeck(deckOfCards);
    
    dealCards();
    
    splitHand();

    checkNaturals();
};


const checkTotals = () => {
    let dealerTotal = 0;
    for (cardValues of dealer.hand) {
        dealerTotal += cardValues.Value;
    }
    
    let playerTotal = 0;
    for (cardValues of player.hand) {
        playerTotal += cardValues.Value;
    }

    if (dealerTotal > 21) {
        console.log('Player wins');
    } else if (playerTotal > 21) {
        console.log('Dealer wins');
    } else if (playerTotal === dealerTotal) {
        console.log('Push');
    } else if (dealerTotal > playerTotal) {
        console.log('Dealer wins');
    } else if (dealerTotal < playerTotal) {
        console.log('Player wins');
    }
}

const hitPlayer = () => {
    
    player.hand.push(deckOfCards.pop());
    
    const $card = $('<div>').addClass('cards');
    $card.text(player.hand[player.hand.length-1].Rank);
    
    const $playerHand = $('#player-cards');
    $playerHand.append($card);
    
    let playerHandTotal = player.hand[0].Value + player.hand[1].Value;
    for (let i=2;i<player.hand.length;i++) {
        // console.log(player.hand[i].Value);
        playerHandTotal += player.hand[i].Value;
    }
    console.log("New player total: "+playerHandTotal);
}


const dealerLogic = () => {
    console.log('now it\'s the dealer\'s turn');

    const $dealerHand = $('#face-down-dealer-card');
    $dealerHand.text(dealer.hand[0].Rank);

    let dealerHand = 0;
    for (let i=0;i<dealer.hand.length;i++) {
        dealerHand += dealer.hand[i].Value;
    }

    while (dealerHand < 17) {
        console.log('dealer will hit');
        dealer.hand.push(deckOfCards.pop());
        const $card = $('<div>').addClass('cards');
        const $dealerHand = $('#dealer-cards');
        for (let i=2;i<dealer.hand.length;i++) {
            dealerHand += dealer.hand[i].Value;
            $card.text(dealer.hand[dealer.hand.length-1].Rank);
            $dealerHand.append($card);
        }
        console.log('Dealer\'s hand totals '+ dealerHand);
    }
    checkTotals();
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
    $splitButton.on('click', ()=>{console.log('still gotta figure this out')});

});