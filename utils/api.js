import { AsyncStorage } from 'react-native';
const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

export function fetchDecksResult() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(initialDecksResults);
}

function initialDecksResults(results) {
  return results === null
    ? new Promise(function(resolve, reject) {
        setTimeout(function() {
          AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
          resolve(decks);
        }, 200);
      })
    : JSON.parse(results);
}

export function submitDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
}

export function removeDeck(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
