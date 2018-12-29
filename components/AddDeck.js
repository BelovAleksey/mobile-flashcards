import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from 'react-navigation';
import { submitDeck } from '../utils/api';
import { white, green, gray } from '../utils/colors';
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
    submitDeck(deck);
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
      <View style={styles.container}>
        <Text style={styles.baseText}>What is the title of you new Deck?</Text>
        <TextInput
          style={styles.inputTitle}
          placeholder="Deck Title"
          onChangeText={text => this.setState({ text })}
        />
        <TouchableOpacity
          style={styles.createDeckButton}
          disabled={this.state.text === ''}
          onPress={this.createDeck}
        >
          <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: white,
    alignItems: 'center',
  },
  inputTitle: {
    backgroundColor: gray,
    fontSize: 25,
    marginTop: 20,
    paddingLeft: 10,
    height: 45,
    width: 220,
    borderRadius: 10,
  },
  baseText: {
    fontSize: 20,
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  createDeckButton: {
    marginTop: 200,
    borderRadius: 10,
    height: 45,
    width: 220,
    backgroundColor: green,
    justifyContent: 'center',
  },
});

export default connect()(AddDeck);
