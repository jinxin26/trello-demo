console.log('Hello World!');

const onBtnClick = function(t, opts) {
  console.log('Someone clicked the button');
};

window.TrelloPowerUp.initialize(
  {
    'card-badges': function(t, opts) {
      return [];
    },
    'card-buttons': function(t, opts) {
      return [{
        text: 'Demand-Power-Up',
        callback: onBtnClick,
        condition: 'edit'
      }, {
        text: 'Open',
        condition: 'always',
        target: 'Trello Developer Site'
      }];
    }
  }
);
