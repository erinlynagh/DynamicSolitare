import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayingCard from './JS/PlayingCard';
import CardDeck from './JS/CardDeck';
import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css'

const MINIMUMCARDCOUNT = 2;

const SCOREFUNCTION = (input = 0) => {
  return Math.pow(2, input)
}

const RANDOMNUMBER = (min = 0, max = 50) => { //inclusive min, exclusive max
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

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
      deck1: ['KH', 'QC', 'JH', '10C', '9H', 'KH'],
      deck2: ['QC', '9C', '10H', 'JC', 'QH', 'KC'],
      deck3: ['JS', '9D', 'KD', '10S', 'JD', 'QS', 'KD'],
      deck4: ['9S', 'KD', '10D', 'KS', 'QD', 'KS',],
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

  getRedCard() {
    var r = RANDOMNUMBER(0, 10);
    switch (r) {
      case 0:
        return 'AH'
      case 1:
        return 'AD'
      case 2:
        return '2D'
      case 3:
        return '2H'
      case 4:
        return '3D'
      case 5:
        return '4D'
      case 6:
        return '5D'
      case 7:
        return '3H'
      case 8:
        return '4H'
      case 9:
        return '5H'
      default:
        return 'AH'
    }
  }

  getBlackCard() {
    var r = RANDOMNUMBER(0, 12);
    console.log(r)
    switch (r) {
      case 0:
      case 1:
        return 'AC'
      case 2:
        return 'AS'
      case 3:
      case 4:
        return '2S'
      case 5:
        return '2C'
      case 6:
        return '3S'
      case 7:
        return '4S'
      case 8:
        return '5S'
      case 9:
        return '3C'
      case 10:
        return '4C'
      case 11:
        return '5C'
    }
  }

  startGame() {
    this.addRedCard('red1')
    this.addRedCard('red2')
    this.addRedCard('red3')
    this.addRedCard('red4')
    this.addBlackCard('black1')
    this.addBlackCard('black2')
    this.addBlackCard('black3')
    this.addBlackCard('black4')
    this.setState({
      matchModeState: 1,
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

  addRedCard(to) {
    var deck = this.state[to];
    deck.unshift(this.getRedCard())
    this.setState({
      [to]: deck
    })
  }

  addBlackCard(to) {
    console.log(to)
    var deck = this.state[to];
    deck.unshift(this.getBlackCard())
    this.setState({
      [to]: deck
    })
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
    if (this.state.selectedDecks.indexOf(deck) > -1) {
      console.log('alreadySelected');
      return;
    }
    if (card === undefined || card == '') { return; }
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
    if (this.state.matchModeState != 4) { return; }
    var score = SCOREFUNCTION(this.state.selectedCards.length - 1);
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
    this.moveToDiscard()
    this.resetMatchState()
  }

  moveToDiscard() {
    var decks = this.state.selectedDecks.slice(1)
    decks.forEach(element => this.moveCard(element, 'discard'))
    decks.forEach(element => this.refreshPiles(element))
    this.moveCard(this.state.matchingDeck, 'discard')
  }

  refreshPiles(deck) {
    var colour = deck.slice(0, -1)
    if (colour == 'red') { this.addRedCard(deck) }
    if (colour == 'black') { this.addBlackCard(deck) }
  }

  endGame() {
    if (this.state.player1score > this.state.player2score) {
      alert('player 1 wins')
    } else if (this.state.player2score > this.state.player1score) {
      alert('player 2 wins')
    } else {
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
      matchModeState: 1,
      matchingCard: "",
      selectedCards: ['placeholder'],
      selectedDecks: ['placeholder']
    })
  }

  getCardValue(card) {
    if (card[0] == 'J' || card[0] == 'Q' || card[0] == 'K' || card[0] == 'A') {
      if (card[0] == 'J') { return 11 }
      if (card[0] == 'Q') { return 12 }
      if (card[0] == 'K') { return 13 }
      if (card[0] == 'A') { return 1 }
    }
    return Number(card.slice(0, -1));
  }

  getCardSuit(card) {
    return card[card.length - 1]
  }

  getCardColour(card) {
    switch (card[card.length - 1]) {
      case "C":
      case "S":
        return 'black'
        break;
        return 'red';
    }
  }

  getStopCards() {
    var card1 = this.state.deck1[0]
    var card2 = this.state.deck2[0]
    var card3 = this.state.deck3[0]
    var card4 = this.state.deck4[0]
    return [card1, card2, card3, card4]
  }

  getRedPlayableCards() {
    var card1 = this.state.red1[0]
    var card2 = this.state.red2[0]
    var card3 = this.state.red3[0]
    var card4 = this.state.red4[0]
    return [card1, card2, card3, card4]
  }

  getBlackPlayableCards() {
    var card1 = this.state.black1[0]
    var card2 = this.state.black2[0]
    var card3 = this.state.black3[0]
    var card4 = this.state.black4[0]
    return [card1, card2, card3, card4]
  }

  Solve(stops, reds, blacks) {
    for (var i = 0; i < stops.length; i++) {
      var stopCard = stops[i];
      var stopValue = this.getCardValue(stopCard)
      console.log('stopping on ' + stopValue)
      if (this.getCardColour(stopCard) == 'black') {
        for (var j = 0; j < blacks.length; j++) {
          for (var k = 0; k < reds.length; k++) {
            if (this.getCardValue(reds[k]) + this.getCardValue(blacks[j]) == stopValue) {
              return [stopCard, blacks[j], reds[k]]
            }
            for (var l = 0; l < blacks.length; l++) {
              if (this.getCardValue(reds[k]) + this.getCardValue(blacks[j]) + this.getCardValue(blacks[l]) == stopValue) {
                return [stopCard,blacks[j],reds[k],blacks[l]]
              }
            }
          }
        }
      } else if (this.getCardColour(stopCard) == 'red') {
        for (var j = 0; j < reds.length; j++) {
          for (var k = 0; k < blacks.length; k++) {
            if (this.getCardValue(blacks[k]) + this.getCardValue(reds[j]) == stopValue) {
              return [stopCard, blacks[k], reds[j]]
            }
            for (var l = 0; l < reds.length; l++) {
              if (this.getCardValue(blacks[k]) + this.getCardValue(reds[j]) + this.getCardValue(reds[l]) == stopValue) {
                return [stopCard,reds[j],blacks[k],reds[l]]
              }
            }
          }
        }
      }
    }
  }

  SecretAISolver() {
    var stopCards = this.getStopCards();
    var redPlayableCards = this.getRedPlayableCards();
    var blackPlayableCards = this.getBlackPlayableCards();
    //console.log(stopCards,redPlayableCards,blackPlayableCards)
    var solution = this.Solve(stopCards, redPlayableCards, blackPlayableCards)
    console.log(solution);
  }

  render() {
    return (
      <Container align="center">
        <Row>
          <Col className={this.state.matchModeState == 4 ? 'bordered' : null} onClick={() => this.addScore(1)}>Player 1 Score &nbsp;{this.state.player1score}</Col>
          <Col xs={10}>
            <Jumbotron className="span:">
              <h1>Dynamic Solitare</h1>
            </Jumbotron>
          </Col>
          <Col className={this.state.matchModeState == 4 ? 'bordered' : null} onClick={() => this.addScore(2)}>Player 2 Score &nbsp;{this.state.player2score}</Col>
        </Row>
        <Row className="mb-2">
          <Col className={this.state.matchModeState == 1 ? 'bordered' : null} onClick={() => this.getMatchCard(this.state.deck1[0], 'deck1')}>
            <CardDeck cards={this.state.deck1} />
          </Col>
          <Col className={this.state.matchModeState == 1 ? 'bordered' : null} onClick={() => this.getMatchCard(this.state.deck2[0], 'deck2')}>
            <CardDeck cards={this.state.deck2} />
          </Col>
          <Col className={this.state.matchModeState == 1 ? 'bordered' : null} onClick={() => this.getMatchCard(this.state.deck3[0], 'deck3')}>
            <CardDeck cards={this.state.deck3} />
          </Col>
          <Col className={this.state.matchModeState == 1 ? 'bordered' : null} onClick={() => this.getMatchCard(this.state.deck4[0], 'deck4')}>
            <CardDeck cards={this.state.deck4} />
          </Col>
        </Row>
        <Row className="mb-2">
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
        </Row>
        <Row className="mb-2">
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
        </Row>
        <Row>
          {this.state.gameStarted
            ? <Container>
              {this.state.matchModeState == 0
                ? <Button className="btn btn-block" onClick={() => this.enterMatchMode()}>Create Match</Button>
                : this.state.selectedCards.length > MINIMUMCARDCOUNT && <Button className="btn btn-block" onClick={() => this.verifyMatches()}>Submit Match</Button>
              }
              {this.state.matchModeState == 0 ? <Button className="btn btn-block" onClick={() => this.endGame()}>No Matches</Button> : null}
            </Container>
            : <Button className="btn btn-block" onClick={() => this.startGame()}>Start Game</Button>
          }
        </Row>
        {/* <br />
        <Button className="btn btn-block" onClick={() => this.SecretAISolver()}>Start AI</Button> */}
      </Container>
    );
  }
}

export default App;