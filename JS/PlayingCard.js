import React from 'react';
import {StyleSheet,Image,Text} from 'react-native';

const styles = StyleSheet.create({
    card: {
      width: 110,
      height: 170,
    },
  });

class PlayingCard extends React.Component {

    render() {
        var id = this.props.id;
        return([
            <Image style={styles.card} source={require("../public/" + id + ".png")}/>
        ]);
    }
    
  }
export default PlayingCard;