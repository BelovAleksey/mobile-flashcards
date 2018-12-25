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
function initialDecksResults() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(decks);
    }, 200);
  });
}
export function fetchDecksResult() {
  return initialDecksResults();
}
