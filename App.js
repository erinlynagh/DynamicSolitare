import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayingCard from './JS/PlayingCard';
import CardDeck from './JS/CardDeck';
import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
    <Container align="center">
      <Jumbotron>
        <h1>Cards</h1>
      </Jumbotron>
      <Row className='mb-5'>
        <Col>
          <PlayingCard id="purple_back" />
        </Col>
        <Col>
          <PlayingCard id="red_back" />
        </Col>
        <Col>
          <PlayingCard id="yellow_back" />
        </Col>
        <Col>
          <PlayingCard id="yellow_back" />
        </Col>
        <Col>
          <PlayingCard id="yellow_back" />
        </Col>
        <Col>
          <PlayingCard id="yellow_back" />
        </Col>
        <Col>
          <PlayingCard id="gray_back" />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <CardDeck id="2"/>
        </Col>
        <Col>
        <CardDeck id="3"/>
        </Col>
        <Col>
          <PlayingCard id="2H" />
        </Col>
        <Col>
          <PlayingCard id="5D" />
        </Col>
        <Col>
          <PlayingCard id="8C" />
        </Col>
        <Col>
          <PlayingCard id="2C" />
        </Col>
        <Col>Score1</Col>
      </Row>
      <Row className="mb-2">
      <Col>
      <CardDeck id="4"/>
        </Col>
        <Col>
        <CardDeck id="5"/>
        </Col>
        <Col>
          <PlayingCard id="2H" />
        </Col>
        <Col>
          <PlayingCard id="5D" />
        </Col>
        <Col>
          <PlayingCard id="8C" />
        </Col>
        <Col>
          <PlayingCard id="2C" />
        </Col>
        <Col>Score2</Col>
      </Row>
      <Row>
        <Button className="btn btn-block">Deal</Button>
      </Row>
    </Container>
  );
}
