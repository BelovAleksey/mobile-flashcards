import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from 'react-navigation';

class AddDeck extends Component {
  state = { text: '' };

  createDeck = () => {
    const deck = {
      [this.state.text]: {
        title: this.state.text,
        questions: [],
      },
    };
    this.props.dispatch(addDeck(deck));
    this.toHome();
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'DeckList',
      }),
    );
  };

  render() {
    return (
      <View>
        <Text>What is the title of you new Deck?</Text>
        <TextInput placeholder="Deck Title" onChangeText={text => this.setState({ text })} />
        <TouchableOpacity onPress={this.createDeck}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(AddDeck);
