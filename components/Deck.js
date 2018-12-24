import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TextButton from './TextButton';

class Deck extends Component {
  render() {
    return (
      <View>
        <Text>Deck1</Text>
        <Text>2 cards</Text>
        <TouchableOpacity>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        <TextButton>Delete Deck</TextButton>
      </View>
    );
  }
}

export default Deck;
