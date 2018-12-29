import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { addDeck } from '../actions';
import { removeDeck } from '../utils/api';
import { white, gray } from '../utils/colors';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title,
    };
  };
  reset = () => {
    const { remove, goBack, title } = this.props;
    remove();
    goBack();
    removeDeck(title);
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== null;
  }
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>{deck.title}</Text>
        <Text style={styles.baseText}>
          {deck.questions.length > 1
            ? deck.questions.length + ' cards'
            : deck.questions.length + ' card'}
        </Text>
        <View style={styles.groupButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('AddCard', { title: deck.title })}
          >
            <Text style={styles.baseText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Quiz', { title: deck.title })}
          >
            <Text style={styles.baseText}>Start Quiz</Text>
          </TouchableOpacity>
          <TextButton style={{ marginTop: 20 }} onPress={this.reset}>
            Delete Deck
          </TextButton>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;
  return {
    title,
    deck: state[title],
  };
}
function mapDispatchToProps(dispatch, { navigation }) {
  const { title } = navigation.state.params;

  return {
    remove: () =>
      dispatch(
        addDeck({
          [title]: null,
        }),
      ),
    goBack: () => navigation.goBack(),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: white,
    alignItems: 'center',
  },
  groupButton: {
    marginTop: 200,
  },
  baseText: {
    fontSize: 25,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    height: 45,
    width: 220,
    backgroundColor: gray,
    justifyContent: 'center',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail);
