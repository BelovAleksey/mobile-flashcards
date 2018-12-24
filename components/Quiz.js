import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

class AddDeck extends Component {
  render() {
    return (
      <View>
        <Text>number/count</Text>
        <TouchableOpacity>
          <Text>What a fuck?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>UnCorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddDeck;
