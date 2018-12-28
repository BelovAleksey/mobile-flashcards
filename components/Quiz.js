import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

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
        <View>
          <Text>Sorry, you cannot take a quiz because there are no cards in the deck</Text>
        </View>
      );
    }
    if (cardNumber === countOfCard) {
      clearLocalNotification().then(setLocalNotification);
      return (
        <View>
          <Text>
            Congratulation! You finished Quiz and your results - {rightAnswers} of {countOfCard}
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text>
          {cardNumber + 1}/{countOfCard}
        </Text>
        <View>
          <Text>
            {showQuestion ? deck.questions[cardNumber].question : deck.questions[cardNumber].answer}
          </Text>
        </View>
        <TouchableOpacity onPress={() => this.setState({ showQuestion: !showQuestion })}>
          <Text>{showQuestion ? 'Answer' : 'Question'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.setState({ cardNumber: cardNumber + 1, rightAnswers: rightAnswers + 1 })
          }
        >
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ cardNumber: cardNumber + 1 })}>
          <Text>UnCorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;
  const deck = state[title];
  return {
    title,
    deck,
  };
}

export default connect(mapStateToProps)(Quiz);
