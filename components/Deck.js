import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Deck extends Component {
  render() {
    const { deck } = this.props;
    console.log(this.props);
    console.log(this.props.navigation);
    return (
      <TouchableOpacity
        key={deck.title}
        onPress={() => this.props.navigation.navigate('DeckDetail', { title: deck.title })}
      >
        <View>
          <Text>{deck.title}</Text>
          <Text>
            {deck.questions.length > 1
              ? deck.questions.length + ' cards'
              : deck.questions.length + ' card'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(decks, { title }) {
  return {
    deck: decks[title],
  };
}

export default connect(mapStateToProps)(Deck);
