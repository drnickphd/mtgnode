/*
| -------------------------------------------------------------------
|  MTGNode Deck Model
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

// Dependencies
//==============
var _ = require('lodash'),
    parser = require('mtg-parser');
    CardModel = require('./CardModel');

// Main Class
//============
function DeckModel(){

  // Properties
  //------------
  var self = this;


  // Methods
  //----------
  this.getCards = function(user, deck_id){
    var deck = _.find(user.decks, function(deck){
      return deck.id === deck_id;
    });
    return CardModel.getByIdArray(deck.cards);
  }

  // Add message when no card is found
  this.parse = function(text, format) {
    var cards = [],
        deck = parser(text, format);

    deck.cards.map(function(c) {
      var potential_cards;

      if (c.set !== undefined)
        potential_cards = CardModel.searchByNameAndSet(c.name, c.set);
      else
        potential_cards = CardModel.searchByName(c.name);

      if (potential_cards.length > 0)
        for (var i = 0; i < c.number; i++)
          cards.push(potential_cards[0]);
    });

    return cards;
  }
}

// Exporting
//============
module.exports = new DeckModel();
