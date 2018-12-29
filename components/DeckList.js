import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { fetchDecksResult } from '../utils/api';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { receiveDecks } from '../actions';
import { white, green, gray } from '../utils/colors';

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
    return (
      <View style={styles.container}>
        {Object.values(decks).map(deck =>
          deck === null ? null : (
            <TouchableOpacity
              style={styles.deck}
              key={deck.title}
              onPress={() => this.props.navigation.navigate('DeckDetail', { title: deck.title })}
            >
              <View style={{ fontSize: 25, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.baseText}>{deck.title}</Text>
                <Text style={styles.baseText}>
                  {deck.questions.length > 1
                    ? deck.questions.length + ' cards'
                    : deck.questions.length + ' card'}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 30,
    backgroundColor: white,
  },
  deck: {
    alignItems: 'center',
    backgroundColor: gray,
    marginTop: 20,
    borderRadius: 10,
  },
  baseText: {
    fontSize: 25,
    padding: 3,
    margin: 5,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
