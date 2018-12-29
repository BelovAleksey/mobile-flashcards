import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { gray, white, green, red } from '../utils/colors';
import TextButton from './TextButton';

class Quiz extends Component {
  state = {
    showQuestion: true,
    cardNumber: 0,
    rightAnswers: 0,
  };
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return { title };
  };
  render() {
    const { deck } = this.props;
    const countOfCard = deck.questions.length;
    const { showQuestion, cardNumber, rightAnswers } = this.state;
    if (countOfCard === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.baseText}>
            Sorry, you cannot take a quiz because there are no cards in the deck
          </Text>
        </View>
      );
    }
    if (cardNumber === countOfCard) {
      clearLocalNotification().then(setLocalNotification);
      return (
        <View style={styles.container}>
          <Text style={styles.baseText}>
            Congratulation! You finished Quiz and your results - {rightAnswers} of {countOfCard}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>
          {cardNumber + 1}/{countOfCard}
        </Text>
        <View>
          <Text style={styles.baseText}>
            {showQuestion ? deck.questions[cardNumber].question : deck.questions[cardNumber].answer}
          </Text>
        </View>
        <TextButton
          style={{ marginTop: 200 }}
          onPress={() => this.setState({ showQuestion: !showQuestion })}
        >
          {showQuestion ? 'Answer' : 'Question'}
        </TextButton>
        <TouchableOpacity
          style={styles.correctButton}
          onPress={() =>
            this.setState({ cardNumber: cardNumber + 1, rightAnswers: rightAnswers + 1 })
          }
        >
          <Text style={styles.baseText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.unCorrectButton}
          onPress={() => this.setState({ cardNumber: cardNumber + 1 })}
        >
          <Text style={styles.baseText}>Uncorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    backgroundColor: white,
    alignItems: 'center',
  },
  inputTitle: {
    backgroundColor: gray,
    fontSize: 25,
    marginTop: 20,
    height: 45,
    width: 220,
    borderRadius: 10,
  },
  baseText: {
    fontSize: 25,
    textAlign: 'center',
  },
  correctButton: {
    marginTop: 40,
    borderRadius: 10,
    height: 45,
    width: 220,
    backgroundColor: green,
    justifyContent: 'center',
  },
  unCorrectButton: {
    marginTop: 20,
    borderRadius: 10,
    height: 45,
    width: 220,
    backgroundColor: red,
    justifyContent: 'center',
  },
});

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;
  const deck = state[title];
  return {
    title,
    deck,
  };
}

export default connect(mapStateToProps)(Quiz);
