================================================
            BLACKJACK PSEUDOCODE
================================================
Name of game: 
    Blackjack

How to win:
    Sum of your cards === 21, or are less than 21 but greater than the sum of the dealer's cards

How to lose:
    sum of your cards > 21, or are less than the sum of your opponent's cards

Expanded Rules: 
    https://bicyclecards.com/how-to-play/blackjack/

==============================================
                GAME STRUCTURE
==============================================

==============================================
                    THE SETUP
==============================================
Overview:  A function that creates the player & dealer objects, and the deck of cards.
*/

// A dealer, single-player, and a deck of 52 cards exists
const player = {};
const dealer = {};

/*
====================================================
FIRST METHOD
====================================================

// creating the deckOfCards object, where the suits are keys, and values are the card values
let deckOfCards = {
    Clubs: [2,3,4,5,6,7,8,9,10,10,10,10,11],
    Diamonds: [2,3,4,5,6,7,8,9,10,10,10,10,11],
    Hearts: [2,3,4,5,6,7,8,9,10,10,10,10,11],
    Spades: [2,3,4,5,6,7,8,9,10,10,10,10,11],
};
// instantiating the suit varibale, assigning it a random suit within the deckOfCards object
let suit = Object.keys(deckOfCards)[Math.floor(Math.random()*4)];
console.log(suit);

// instantiating the cardValue varibale, assigning it a random value within the deckOfCards object
let cardValue = Math.floor(Math.random()*13);
console.log(cardValue);

// Prints an array of the objects property names (suits, in our case)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys 
// console.log(Object.keys(deckOfCards));

player.firstCard = {};
player.firstCard.suits = suit;
player.firstCard.value = cardValue;

console.log(player);

// This was too simple, after researching I discovered the Fisher-Yates shuffle algorithm... which leads to the.......

====================================================
SECOND METHOD
====================================================

// I think we should create card objects vs. using arrays
// the keys are the actual name of the card (Four, Five, Jack, Queen, King, Ace) 
// and value is the numerical value of the card.. will allow us to assign an Ace a value of 1 or 11?
// I found this link below Monday morning at 8:28am, after outlining this method over the weekend/with Raahima (TA)! Hard to believe, but it's the truth.
// https://www.programiz.com/javascript/examples/shuffle-card
*/

const suits2 = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

const cards2 = {
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
    Ace: {
        One: 1,
        Eleven: 11
    }
};
// for loop to iterate over the suits and for loop to iterate over the cards to create the actual cards
let deckOfCards2 = [];

for (suits of suits2) {
    for (values in cards2) {
        // console.log(values, suits);
        let card2 = {Value: values, Suit: suits}
        deckOfCards2.push(card2);
    }
}
// console.log(deckOfCards2)             // prints an array of card objects
// console.log(deckOfCards2.length);     // returns 52 cards

/*
==============================================
                SHUFFLE AND DEAL
==============================================

Overview: shuffle the deck, and deal the player and dealer 2 cards.

https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    Summary: Fisher-Yates' algo was slightly modified by Richard Durstenfeld in '64 to improve the run-time to O(n), as the former was developed in 1938 using pencil and paper. Feautured in https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming 


Deal Sequence
    - At random, the single-player gets a card from the deck
    - At random, the dealer gets a card 
    - At random, the single-player gets another card 
    - At random, the dealer gets another card (face down)
*/


// Initializing a function to shuffle the deck
// https://gist.github.com/webbower/8d19b714ded3ec53d1d7ed32b79fdbac
const ShuffleDeck = (deck) => {
    for (let i=deck.length-1;i>0;i--) {
        let x = Math.floor(Math.random()*(i+1));
        [deck[i], deck[x]] = [deck[x], deck[i]];
    }
}

console.log(deckOfCards2);
ShuffleDeck(deckOfCards2);
console.log(deckOfCards2);




/*
==============================================
                    NATURALS
==============================================
- If the sum of the player's cards is 21 && the dealers 1st card is not a 10 or Ace... NATURAL BLACKJACK for that player

- If the sum of the player's cards is not 21 AND the dealer's 1st card is a 10 or Ace check to see if the sum of dealer's cards is 21... if so, NATURAL BLACKJACK for the dealer

- If the sum of the player's cards === 21 AND the dealer's 1st card is a 10 or Ace check to see if the sum of dealer's cards is 21... if sum of dealers card is 21... tie game
*/

/*
==============================================
                    THE PLAY
==============================================

- The player goes first, chooses to hit, stand, or split if their first 2 cards are of the same denomination ex. 2 queens, 2 sevens, 2 aces, etc. If the player splits anything other than aces, the player plays the hand to their left by standing or hitting, then the hand to their right. With a pair of aces, the player is given one card for each ace and may not draw again





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


/*
==============================================
                    NATURALS
==============================================
- If the sum of the player's cards is 21 && the dealers 1st card is not a 10 or Ace... NATURAL BLACKJACK for that player

- If the sum of the player's cards is not 21 AND the dealer's 1st card is a 10 or Ace check to see if the sum of dealer's cards is 21... if so, NATURAL BLACKJACK for the dealer

- If the sum of the player's cards === 21 AND the dealer's 1st card is a 10 or Ace check to see if the sum of dealer's cards is 21... if sum of dealers card is 21... tie game
*/


/*
==============================================
                THE PLAY
==============================================

- The player goes first, chooses to hit, stand, or split if their first 2 cards are of the same denomination ex. 2 queens, 2 sevens, 2 aces, etc. If the player splits anything other than aces, the player plays the hand to their left by standing or hitting, then the hand to their right. With a pair of aces, the player is given one card for each ace and may not draw again
*/