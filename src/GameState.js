// TOOD: Move gameState related code into class
import * as Tantrix from './Tantrix.js';

export class GameState {
  constructor( json ) {
    if ( json ) {
      Object.assign( this, json );
    }
    else {
      Object.assign( this, {
        board: [],
        hands: [ [], [], ],
        deck: Array.from( Array( Tantrix.NumTiles ), ( _, i ) => i ),
        turn: 0,
      } );

      for ( let i = 0; i < Tantrix.HandSize; i ++ ) {
        this.hands.forEach( hand => hand.push( this.pullFromDeck() ) );
      }
    }
  }

  pullFromDeck() {
    return this.deck.splice( Math.floor( Math.random() * this.deck.length ), 1 )[ 0 ];
  }

  makeMove( move ) {
    this.board.push( {
      id: move.id,
      rot: move.rot,
      col: move.col,
      row: move.row,
    } );

    this.hands[ this.turn ][ move.handIndex ] = this.pullFromDeck();
    this.turn = ( this.turn + 1 ) % this.hands.length;
  }
}