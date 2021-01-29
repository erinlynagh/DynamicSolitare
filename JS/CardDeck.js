import React from 'react';
import {StyleSheet,Image,View,Dimensions} from 'react-native';
import PlayingCard from './PlayingCard.js';
import {Card} from 'react-bootstrap';


class CardDeck extends React.Component {
    render() {
        var id = this.props.id;
        var deck = ['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS']
        if(id === '0'){
            deck = ['AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H']
        }else if(id === '1'){
            deck = ['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S']
        }else if(id === '2'){
            deck = ['9H', '10C', 'JH', 'QC', 'KH']
        }else if(id === '3'){
            deck = ['9C', '10H', 'JC', 'QH', 'KC']
        }else if(id === '4'){
            deck = ['9D', '10S', 'JD', 'QS', 'KD']
        }else if(id === '5'){
            deck = ['9S', '10D', 'JS', 'QD', 'KS']
        }
        return([
            <PlayingCard id={deck[0]}/>
        ]);
    } 
  }
export default CardDeck;