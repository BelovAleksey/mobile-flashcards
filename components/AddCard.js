import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { NavigationActions } from 'react-navigation';

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
      <View>
        <TextInput
          placeholder="Question"
          onChangeText={text => this.setState({ question: text })}
        />
        <TextInput placeholder="Answer" onChangeText={text => this.setState({ answer: text })} />
        <TouchableOpacity disabled={question === '' || answer === ''} onPress={this.addCard}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
  ß;
}
function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;
  return { title };
}

export default connect(mapStateToProps)(AddCard);
