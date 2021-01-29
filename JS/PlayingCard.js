import React from 'react';
import {StyleSheet,Image,View,Dimensions} from 'react-native';
import {Card} from 'react-bootstrap';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  thumbContainer: {
    width: width*0.075,
    height: width*1.52821*0.075,
  },
  card: {
    flex: 1,
    width: undefined,
    height: undefined,
    position: 'relative',
    resizeMode: 'cover'
  },
});

class PlayingCard extends React.Component {
    render() {
        var id = this.props.id;
        return([
            <View style={styles.thumbContainer}>
              <Image style={styles.card} source={require("../public/" + id + ".png")}/>
            </View>
        ]);
    } 
  }
export default PlayingCard;