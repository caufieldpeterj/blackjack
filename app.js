/*
==============================================
                    THE SETUP
==============================================
Overview:  A function that creates the player & dealer objects, and the deck of cards.A dealer, single-player, and a deck of 52 cards exists

// I think we should create card objects vs. using arrays
// the keys are the actual name of the card (Four, Five, Jack, Queen, King, Ace) 
// and value is the numerical value of the card.. will allow us to assign an Ace a value of 1 or 11?
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
/*
==============================================
                SHUFFLE 
==============================================

Overview: shuffle the deck

https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    Summary: Fisher-Yates' algo was slightly modified by Richard Durstenfeld in '64 to improve the run-time to O(n), as the former was developed in 1938 using pencil and paper. Feautured in https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming 
*/

// Initializing a function to shuffle the deck
// https://gist.github.com/webbower/8d19b714ded3ec53d1d7ed32b79fdbac
const ShuffleDeck = (deck) => {
    for (let i=deck.length-1;i>0;i--) {
        let x = Math.floor(Math.random()*(i+1));
        [deck[i], deck[x]] = [deck[x], deck[i]];
    }
}  
// console.log(typeof deckOfCards2);
// console.log(deckOfCards);
/*
==============================================
                DEAL 
==============================================
Deal Sequence
    - At random, the single-player gets a card from the deck
    - At random, the dealer gets a card 
    - At random, the single-player gets another card 
    - At random, the dealer gets another card (face down)
*/
// grabbing player and dealer divs with jQuery
const $playerHand = $('#player-cards');
const $dealerHand = $('#dealer-cards');

const dealCards = () => {
    for (let i=0;i<4;i++) {
        const $card = $('<div>').addClass('cards');
        if (i%2===0) {
            player.hand.push(deckOfCards.pop())
            // $card.text('first card');
            $playerHand.append($card);
        } else {
            dealer.hand.push(deckOfCards.pop());
            // $card.text('first card')
            $dealerHand.append($card);
        }            
    }
};

/*
==============================================
                    NATURALS
==============================================
- If the sum of the player's cards is 21 && the dealers 1st card is not a 10 or Ace... NATURAL BLACKJACK for that player

- If the sum of the player's cards is not 21 AND the dealer's 1st card is a 10 or Ace check to see if the sum of dealer's cards is 21... if so, NATURAL BLACKJACK for the dealer

- If the sum of the player's cards === 21 AND the dealer's 1st card is a 10 or Ace check to see if the sum of dealer's cards is 21... if sum of dealers card is 21... tie game
*/
const checkNaturals = () => {
    let dealerHand = dealer.hand[0].Value + dealer.hand[1].Value;
    let playerHand = player.hand[0].Value + player.hand[1].Value;
    // console.log(dealerHand);
    // console.log(typeof dealerHand);          // returns number
    console.log("Dealer total: " +dealerHand);
    console.log("Player total: " +playerHand);

    if (playerHand===21 && dealerHand===21) {
        let $h3 = $('<h3>').text('DOUBLE BLACKJACK, TIE GAME!');
        $('body').append($h3);
    } else if (playerHand===21 && dealerHand < 21) {
        let $h3 = $('<h3>').text('NATURAL BLACKJACK FOR THE PLAYER!');
        $('body').append($h3);
    } else if (playerHand < 21 && dealerHand===21) {
        let $h3 = $('<h3>').text('NATURAL BLACKJACK FOR THE DEALER!');
        $('body').append($h3);
    } else if (playerHand > 21 || dealerHand > 21) {
        let $h3 = $('<h3>').text('Houston we have a problem');
        $('body').append($h3);
    } else {
        return;
    }
};

/*
==============================================
                THE PLAY
==============================================

- The player goes first, chooses to hit, stand, or split if their first 2 cards are of the same denomination ex. 2 queens, 2 sevens, 2 aces, etc. If the player splits anything other than aces, the player plays the hand to their left by standing or hitting, then the hand to their right. With a pair of aces, the player is given one card for each ace and may not draw again
*/

const hitPlayer = () => {
    // console.log('the player wants another card');
    // console.log(player.hand);
    player.hand.push(deckOfCards.pop());
    // console.log(player.hand);
    let playerHandTotal = player.hand[0].Value + player.hand[1].Value;
    for (let i=2;i<player.hand.length;i++) {
        // console.log(player.hand[i].Value);
        playerHandTotal += player.hand[i].Value;
    }
    console.log("New player total: "+playerHandTotal);
}


$(() => {
    ShuffleDeck(deckOfCards);
    dealCards(); 
    checkNaturals();
    // console.log(dealer.hand);
    // console.log(player.hand);
    console.log('What would you like to do, hit or stand?');

    // target the HIT button using jQuery, assigning to $hit variable
    // adding an event listener, passing in the callback function hitPlayer
    const $hit = $('#hit');
    $hit.on('click', hitPlayer);

    const $stand = $('#stand');
    $stand.on('click', ()=>{console.log('now it\'s the dealer\'s turn')});


    const $deal = $('#deal');
    $stand.on('click', ()=>{console.log('need to reset the game')});



});