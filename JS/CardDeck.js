import React from 'react';
import {StyleSheet,Image,View,Dimensions} from 'react-native';
import PlayingCard from './PlayingCard.js';
import {Card} from 'react-bootstrap';


class CardDeck extends React.Component {

    constructor(props) {
        super(props)
        this.deck = this.props.cards
    }

    shuffleDeck (array){
        for (let i = array.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]];
        }
    }

    addCard(card){
        this.deck.push(card);
    }

    render() {
        if(this.deck[0] != null){
            return([
                <PlayingCard id={this.deck[0]}/>
            ]);
        }else{
            return([
                <PlayingCard id={'purple_back'}/>
            ]);
        }
        
    } 
  }
export default CardDeck;