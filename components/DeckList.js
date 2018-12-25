import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { fetchDecksResult } from '../utils/api';
import { connect } from 'react-redux';
import Deck from './Deck';
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
    return Object.values(decks).map(deck => (
      <View key={deck.title}>
        <Deck title={deck.title} />
      </View>
    ));
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
