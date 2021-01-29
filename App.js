import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayingCard from './JS/PlayingCard';
import CardDeck from './JS/CardDeck';
import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.flag = false
    this.state = {
      gameStarted: 0,
      matchModeState: 0,
      matchingCard: '',
      matchingDeck: '',
      player1score: 0,
      player2score: 0,
      selectedCards: ['placeholder'],
      selectedDecks: ['placeholder'],
      discard: [],
      deckRed: ['AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H'],
      tableau1: [],
      tableau2: [],
      tableau3: [],
      tableau4: [],
      deckBlack: ['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S'],
      deck1: ['9H', '10C', 'JH', 'QC', 'KH'],
      deck2: ['9C', '10H', 'JC', 'QH', 'KC'],
      deck3: ['9D', '10S', 'JD', 'QS', 'KD'],
      deck4: ['9S', '10D', 'JS', 'QD', 'KS'],
      red1: [],
      red2: [],
      red3: [],
      red4: [],
      black1: [],
      black2: [],
      black3: [],
      black4: []
    }
  }

  startGame() {
    this.shuffleDeck(this.state.deckRed)
    this.shuffleDeck(this.state.deckBlack)
    this.moveCard('deckRed', 'red1')
    this.moveCard('deckRed', 'red2')
    this.moveCard('deckRed', 'red3')
    this.moveCard('deckRed', 'red4')
    this.moveCard('deckBlack', 'black1')
    this.moveCard('deckBlack', 'black2')
    this.moveCard('deckBlack', 'black3')
    this.moveCard('deckBlack', 'black4')
    this.setState({
      gameStarted: 1
    })
  }

  moveCard(from, to) {
    var deck1 = this.state[from];
    var deck2 = this.state[to];
    var card = ''
    if (!(deck1 === undefined && deck1.length === 0)) {
      card = deck1[0];
      deck1.splice(0, 1)
      deck2.unshift(card)
    }
    this.setState({
      [from]: deck1,
      [to]: deck2
    })
  }

  dealCards() {
    console.log('lol')
  }

  shuffleDeck(array) {
    //find the deck that matches the passed in array
    for (const [key, value] of Object.entries(this.state)) {
      if (value == array) {
        var deckName = key
      }
    }
    //shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]];
    }
    //replace the matching array, update the state
    this.setState({
      [deckName]: array
    })
  }

  enterMatchMode() {
    this.setState({
      matchModeState: 1
    })
  }

  addCard(card, deck) {
    deck.push(card);
  }

  getMatchCard(card, deck) {
    if (card == null) {
      return;
    }
    var suit = card.slice(-1)
    if (suit == "D" || suit == "H") {
      if (this.state.matchModeState == 1) {
        this.setState({
          matchModeState: 2,
          matchingCard: card,
          matchingDeck: deck
        })
      }
    } else {
      if (this.state.matchModeState == 1) {
        this.setState({
          matchModeState: 3,
          matchingCard: card,
          matchingDeck: deck
        })
      }
    }

  }

  selectMatches(card, deck) {
    if (!(this.state.matchModeState == 3 || this.state.matchModeState == 2)) {
      console.log('cannot select a card now')
      return;
    }
    if (this.state.selectedCards.indexOf(card) > -1) {
      console.log('alreadySelected');
      return;
    }
    if(card === undefined || card == ''){return;}
    var suit = card.slice(-1);
    if (this.state.matchModeState === 3 && (suit == "D" || suit == "H")) {
      return;
    }
    if (this.state.matchModeState === 2 && (suit == "C" || suit == "S")) {
      return;
    }
    var newMatchModeState = 2
    if (this.state.matchModeState == newMatchModeState) {
      newMatchModeState = 3
    }
    this.setState({
      selectedCards: [...this.state.selectedCards, card],
      selectedDecks: [...this.state.selectedDecks, deck],
      matchModeState: newMatchModeState
    })
  }

  verifyMatches() {
    if (!(this.state.matchModeState == 2 || this.state.matchModeState == 3)) { return; }
    function sum(newNum) {
      if (newNum == 'A') {
        newNum = 1;
      }
      total += Number(newNum);
    }

    var total = 0;
    var initial = this.state.matchingCard;
    var matches = this.state.selectedCards.slice(1);
    matches.forEach(element => sum(this.getCardValue(element)))
    if (total == this.getCardValue(initial)) { //doesnt work for ten
      this.matchConfirmed()
    }
    else {
      console.log(total)
      alert('match failed')
      this.resetMatchState()
    }
  }

  matchConfirmed() {
    this.setState({
      matchModeState: 4
    })
  }

  addScore(player) {
    var score = this.state.selectedCards.length - 1;
    if (player == 1) {
      score += this.state.player1score;
      this.setState({
        player1score: score
      })
    } else if (player == 2) {
      score += this.state.player2score;
      this.setState({
        player2score: score
      })
    } else {
      return;
    }
    this.moveToTableau()
    this.moveToDiscard()
    this.resetMatchState()
  }

  moveToTableau() {
    var tableau = this.getSuitableTableau(this.state.matchingCard);
    this.moveCard(this.state.matchingDeck, tableau);
  }

  moveToDiscard(){
    var decks = this.state.selectedDecks.slice(1)  
    decks.forEach(element => this.moveCard(element,'discard'))
    decks.forEach(element => this.refreshPiles(element))
  }

  refreshPiles(deck){
    var colour = deck.slice(0,-1)
    if(colour == 'red'){this.moveCard('deckRed',deck)}
    if(colour == 'black'){this.moveCard('deckBlack',deck)}
  }

  getSuitableTableau(card) {
    var t1 = this.state.tableau1
    var t2 = this.state.tableau2
    var t3 = this.state.tableau3
    var t4 = this.state.tableau4
    if (this.getCardValue(card) == 9) {
      if (t1.length == 0) {
        return 'tableau1'
      }
      if (t2.length == 0) {
        return 'tableau2'
      }
      if (t3.length == 0) {
        return 'tableau3'
      }
      if (t4.length == 0) {
        return 'tableau4'
      }
    }
    var c1 = t1[0];
    var c2 = t2[0];
    var c3 = t3[0];
    var c4 = t4[0];
    if (this.cardCheck(card, c1)) {
      return 'tableau1'
    }
    if (this.cardCheck(card, c2)) {
      return 'tableau2'
    }
    if (this.cardCheck(card, c3)) {
      return 'tableau3'
    }
    if (this.cardCheck(card, c4)) {
      return 'tableau4'
    }
    this.endGame();
  }

  endGame(){
    if(this.state.player1score > this.state.player2score){
      alert('player 1 wins')
    }else if(this.state.player2score > this.state.player1score){
      alert('player 2 wins')
    }else{
      alert('tie')
    }
    window.location.reload();
  }


  cardCheck(newCard, oldCard) {
    function checkDifferentSuits(a, b) {
      if (a == 'C' || a == 'S') {
        return (b == 'H' || b == 'D')
      } else if (a == 'H' || a == 'D') {
        return (b == 'C' || b == 'S')
      }
      return false;
    }
    return this.getCardValue(newCard) == this.getCardValue(oldCard) + 1 && checkDifferentSuits(newCard[newCard.length - 1], oldCard[oldCard.length - 1])
  }

  resetMatchState() {
    this.setState({
      matchModeState: 0,
      matchingCard: "",
      selectedCards: ['placeholder'],
      selectedDecks: ['placeholder']
    })
  }

  getCardValue(card){
    if(card[0] == 'J' || card[0] == 'Q'|| card[0] == 'K' || card[0] == 'A'){
      if(card[0] == 'J'){return 11}
      if(card[0] == 'Q'){return 12}
      if(card[0] == 'K'){return 13}
      if(card[0] == 'A'){return 1}
    }
    return Number(card.slice(0,-1));
  }
  
  render() {
    return (
      <Container align="center">
        <Jumbotron>
          <h1>Cards</h1>
        </Jumbotron>
        <Row className="mb-5">
          <Col>
            <CardDeck cards={this.state.discard} />
          </Col>
          <Col>
            <CardDeck cards={this.state.deckRed} />
          </Col>
          <Col>
            <CardDeck cards={this.state.tableau1} />
          </Col>
          <Col>
            <CardDeck cards={this.state.tableau2} />
          </Col>
          <Col>
            <CardDeck cards={this.state.tableau3} />
          </Col>
          <Col>
            <CardDeck cards={this.state.tableau4} />
          </Col>
          <Col>
            <CardDeck cards={this.state.deckBlack} />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className={this.state.matchModeState == 1 ? 'bordered' : null} onClick={() => this.getMatchCard(this.state.deck1[0], 'deck1')}>
            <CardDeck cards={this.state.deck1} />
          </Col>
          <Col className={this.state.matchModeState == 1 ? 'bordered' : null} onClick={() => this.getMatchCard(this.state.deck2[0], 'deck2')}>
            <CardDeck cards={this.state.deck2} />
          </Col>
          <Col className={this.state.matchModeState == 2 && this.state.selectedDecks.indexOf('red1') == -1 ? 'bordered' : null} onClick={() => this.selectMatches(this.state.red1[0], 'red1')}>
            <CardDeck cards={this.state.red1} />
          </Col>
          <Col className={this.state.matchModeState == 2 && this.state.selectedDecks.indexOf('red2') == -1 ? 'bordered' : null} onClick={() => this.selectMatches(this.state.red2[0], 'red2')}>
            <CardDeck cards={this.state.red2} />
          </Col>
          <Col className={this.state.matchModeState == 2 && this.state.selectedDecks.indexOf('red3') == -1 ? 'bordered' : null} onClick={() => this.selectMatches(this.state.red3[0], 'red3')}>
            <CardDeck cards={this.state.red3} />
          </Col>
          <Col className={this.state.matchModeState == 2 && this.state.selectedDecks.indexOf('red4') == -1 ? 'bordered' : null} onClick={() => this.selectMatches(this.state.red4[0], 'red4')}>
            <CardDeck cards={this.state.red4} />
          </Col>
          <Col className={this.state.matchModeState == 4 ? 'bordered' : null} onClick={() => this.addScore(1)}>{this.state.player1score}</Col>
        </Row>
        <Row className="mb-2">
          <Col className={this.state.matchModeState == 1 ? 'bordered' : null} onClick={() => this.getMatchCard(this.state.deck3[0], 'deck3')}>
            <CardDeck cards={this.state.deck3} />
          </Col>
          <Col className={this.state.matchModeState == 1 ? 'bordered' : null} onClick={() => this.getMatchCard(this.state.deck4[0], 'deck4')}>
            <CardDeck cards={this.state.deck4} />
          </Col>
          <Col className={this.state.matchModeState == 3 && this.state.selectedDecks.indexOf('black1') == -1 ? 'bordered' : null} onClick={() => this.selectMatches(this.state.black1[0], 'black1')}>
            <CardDeck cards={this.state.black1} />
          </Col>
          <Col className={this.state.matchModeState == 3 && this.state.selectedDecks.indexOf('black2') == -1 ? 'bordered' : null} onClick={() => this.selectMatches(this.state.black2[0], 'black2')}>
            <CardDeck cards={this.state.black2} />
          </Col>
          <Col className={this.state.matchModeState == 3 && this.state.selectedDecks.indexOf('black3') == -1 ? 'bordered' : null} onClick={() => this.selectMatches(this.state.black3[0], 'black3')}>
            <CardDeck cards={this.state.black3} />
          </Col>
          <Col className={this.state.matchModeState == 3 && this.state.selectedDecks.indexOf('black4') == -1 ? 'bordered' : null} onClick={() => this.selectMatches(this.state.black4[0], 'black4')}>
            <CardDeck cards={this.state.black4} />
          </Col>
          <Col className={this.state.matchModeState == 4 ? 'bordered' : null} onClick={() => this.addScore(2)}>{this.state.player2score}</Col>
        </Row>
        <Row>
          {this.state.gameStarted
            ? <Container>
              {this.state.matchModeState == 0
                ? <Button className="btn btn-block" onClick={() => this.enterMatchMode()}>Create Match</Button>
                : <Button className="btn btn-block" onClick={() => this.verifyMatches()}>Submit Match</Button> 
              }
              {this.state.matchModeState == 0 ? <Button className="btn btn-block" onClick={() => this.endGame()}>No Matches</Button> : null}
            </Container>
            : <Button className="btn btn-block" onClick={() => this.startGame()}>Start Game</Button>
          }
        </Row>
      </Container>
    );
  }
}

export default App;