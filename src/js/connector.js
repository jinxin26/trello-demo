console.log('Hello World!');

let demandChangeCount;
// const onSaveBtnClicked = function (t, opts) {
//   changingTimes = changingTimes + 1;
// }

const onBtnClick = function(t, opts) {
  console.log('Someone clicked the button');
  return t.popup({
    title: 'Demand Change',
    url: './cardButtonRecordChanges.html'
  });
};

const cardButtons = function(t, opts) {
  return [{
    text: 'Demand Changes',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emoji_u1f601.svg/2048px-Emoji_u1f601.svg.png',
    callback: onBtnClick,
    condition: 'edit'
  }, {
    text: 'Open',
    condition: 'always',
    target: 'Trello Developer Site'
  }];
}

window.TrelloPowerUp.initialize(
  {
    'board-buttons':function (t, opts) {
      return [{
        text:'Requirement Changes',
        callback:t.modal({
          title:'Requirement Changes Analysis',
          fullscreen:true,
        })
      }];
    },
    'card-badges': function(t, opts) {
      const cardId = t.getContext().card;
      return t.get(cardId, 'shared', 'demandChangeCount').then(res => {
        console.log('card-badges by card id', res);
        if(res) {
          return t.card('name')
            .get('name')
            .then(res => {
              console.log('card-badges', res);
              return [{
                text: demandChangeCount,
                color: 'red'
              }]
            });
        }
      })
    },
    'card-buttons': cardButtons,
    'card-detail-badges': function (t, opts) {
      const cardId = t.getContext().card;
      return t.get(cardId, 'shared', 'demandChangeCount').then(res => {
        demandChangeCount = res ? res : 0;
        console.log('demandChangeCount', demandChangeCount);
        return [{
          dynamic: function () {
            return {
              title: 'Changes',
              text: demandChangeCount,
              color: 'red',
              refresh: 10
            };
          },
        }];
      });
    },
  }
);
