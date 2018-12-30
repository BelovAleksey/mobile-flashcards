import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { white, green, gray } from '../utils/colors';

class AddCard extends Component {
  state = { question: '', answer: '' };
  static navigationOptions = () => {
    return {
      title: 'Add Card',
    };
  };
  addCard = () => {
    const { title, navigation } = this.props;
    const card = this.state;
    this.props.dispatch(addCard(title, card));
    navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputTitle}
          placeholder="Question"
          onChangeText={text => this.setState({ question: text })}
        />
        <TextInput
          style={styles.inputTitle}
          placeholder="Answer"
          onChangeText={text => this.setState({ answer: text })}
        />
        <TouchableOpacity
          style={styles.createCardButton}
          disabled={!question.trim() || !answer.trim()}
          onPress={this.addCard}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
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
    paddingLeft: 10,
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
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  createCardButton: {
    marginTop: 200,
    borderRadius: 10,
    height: 45,
    width: 220,
    backgroundColor: green,
    justifyContent: 'center',
  },
});

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;
  return { title };
}

export default connect(mapStateToProps)(AddCard);
