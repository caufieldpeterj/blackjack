================================================
            BLACKJACK
================================================
Name of game: 
    Blackjack

Where to play: 
    https://caufieldpeterj.github.io/ 

How to win:
    Sum of your cards is 21, or are less than 21 but greater than the sum of the dealer's cards

How to lose:
    sum of your cards > 21, or are less than the sum of the dealer's cards

Expanded Rules: 
    https://bicyclecards.com/how-to-play/blackjack/

==============================================
                THE SETUP
==============================================
Overview:  There is a single player, a dealer, and a deck of 52 cards.

The cards are reprented as objects, with keys being the rank of the card (Four, Five, Jack, Queen, King, Ace) and value is the numerical value of the card (pip values for 2-10, honor cards are 10, and Ace can be 1 or 11).

I found this link below Monday (2/8) morning at 8:28am, after outlining this method over the weekend/with Raahima (TA)! Hard to believe, but it's the truth.
https://www.programiz.com/javascript/examples/shuffle-card

==============================================
                SHUFFLE AND DEAL
==============================================

First, we shuffle the deck and then deal the player and dealer 2 cards.

https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    Summary: Fisher-Yates' algo was slightly modified by Richard Durstenfeld in '64 to improve the run-time to O(n), as the former was developed in 1938 using pencil and paper. 
    Feautured in https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming 


Deal Sequence
    - At random, the single-player gets a card from the deck
    - At random, the dealer gets a card 
    - At random, the single-player gets another card 
    - At random, the dealer gets another card (face down)

Initializing a function to shuffle the deck
https://gist.github.com/webbower/8d19b714ded3ec53d1d7ed32b79fdbac
const ShuffleDeck = (deck) => {
    for (let i=deck.length-1;i>0;i--) {
        let x = Math.floor(Math.random()*(i+1));
        [deck[i], deck[x]] = [deck[x], deck[i]];
    }
}

==============================================
                    NATURALS
==============================================

If the sum of the player's cards is 21 && the dealers 1st card is not a 10 or Ace... NATURAL BLACKJACK for that player

If the sum of the player's cards is not 21 AND the dealer's 1st card is a 10 or Ace check to see if the sum of dealer's cards is 21... if so, NATURAL BLACKJACK for the dealer

If the sum of the player's cards === 21 AND the dealer's 1st card is a 10 or Ace check to see if the sum of dealer's cards is 21... if sum of dealers card is 21... tie game

==============================================
                    THE PLAY
==============================================

The player goes first, chooses to hit, stand, or split if their first 2 cards are of the same denomination ex. 2 queens, 2 sevens, 2 aces, etc. If the player splits anything other than aces, the player plays the hand to their left by standing or hitting, then the hand to their right. With a pair of aces, the player is given one card for each ace and may not draw again.

Next, the dealer checks his cards to see if his total is greater than or equal to 17. If so, he must stand. If not, he must hit until he reaches 17+. 

Closest player to 21, wins.

Thanks for reading, I hope you enjoy this application!