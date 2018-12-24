import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

class AddCard extends Component {
  render() {
    return (
      <View>
        <TextInput placeholder="Question" />
        <TextInput placeholder="Answer" />
        <TouchableOpacity>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddCard;