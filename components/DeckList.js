import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { fetchDecksResult } from '../utils/api';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { receiveDecks } from '../actions';

class DeckList extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecksResult()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState({ ready: true }));
  }

  render() {
    const { ready } = this.state;
    const { decks } = this.props;
    if (!ready) {
      return <AppLoading />;
    }
    return Object.values(decks).map(deck =>
      deck === null ? null : (
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
      ),
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
