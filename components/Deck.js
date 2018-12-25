import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Deck extends Component {
  render() {
    //const { deck } = this.props;
    return (
      <View />
      // <TouchableOpacity key={deck.title}>
      //   <View>
      //     <Text>{deck.title}</Text>
      //     <Text>
      //       {deck.questions.length > 1
      //         ? deck.questions.length + ' cards'
      //         : deck.questions.length + ' card'}
      //     </Text>
      //   </View>
      // </TouchableOpacity>
    );
  }
}

function mapStateToProps(decks, title) {
  console.log(decks);
  console.log(title);
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Deck);
