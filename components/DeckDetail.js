import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { addDeck } from '../actions';

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
    //add remove Deck from Storage
  };

  render() {
    const { deck } = this.props;
    return (
      <View>
        <Text>Deck1</Text>
        <Text>2 cards</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddCard', { title: deck.title })}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Quiz', { title: deck.title })}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        <TextButton onPress={this.reset}>Delete Deck</TextButton>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail);
