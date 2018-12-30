import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from 'react-navigation';
import { submitDeck } from '../utils/api';
import { white, green, gray } from '../utils/colors';
class AddDeck extends Component {
  state = { name: '', deckExist: false };

  createDeck = () => {
    const { name } = this.state;
    const { decks } = this.props;
    if (decks[name] !== undefined) {
      this.setState({ deckExist: true });
      return;
    }
    const deck = {
      [name]: {
        title: name,
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
    const { name, deckExist } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>What is the title of you new Deck?</Text>
        <TextInput
          style={styles.inputTitle}
          placeholder="Deck Title"
          clearButtonMode="always"
          onChangeText={name => this.setState({ name, deckExist: false })}
        />
        {deckExist ? (
          <Text style={{ fontSize: 20, color: 'red' }}>
            Deck "{name}" is already in use. Please choose another.
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.createDeckButton}
          disabled={!name.trim()}
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
function mapStateToProps(decks) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(AddDeck);
