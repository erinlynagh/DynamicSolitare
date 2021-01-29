import React from 'react';
import {StyleSheet,Image,View,Dimensions} from 'react-native';
import PlayingCard from './PlayingCard.js';
import {Card} from 'react-bootstrap';


class CardDeck extends React.Component {

    constructor(props) {
        super(props)
        this.deck = this.props.cards
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