import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

class AddDeck extends Component {
  render() {
    return (
      <View>
        <Text>What is the title of you new Deck?</Text>
        <TextInput placeholder="Deck Title" />
        <TouchableOpacity>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddDeck;
