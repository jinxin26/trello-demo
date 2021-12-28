//import axios from 'axios';
// axios.get("http://localhost:8086/description/202112210003").then(res => console.log(res));
//
// let info = {
//   cardId: '',
//   descriptions: '',
// }
console.log('Hello World!');

let demandChangeCount;
let demandInfo = [];

const onBtnClick = function(t, opts) {
  console.log('Someone clicked the button');
  return t.popup({
    title: 'Demand Change',
    url: './cardButtonRecordChanges.html'
  });
};

const cardButtons = function(t, opts) {
  // get description of a certain card
  // t.card('desc').then(res => console.log(res));

  // test: axios.post
  // t.card('id','desc').then(res => {
  //   console.log('id', res);
  //   info.cardId = res.id;
  //   info.descriptions = res.desc;
  //   axios.post("http://localhost:8086/description", info).then(res => console.log('this is post info', res));
  // })

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

const getBoardButton = (t, opts) => {
  return [{
    icon: 'https://uxwing.com/wp-content/themes/uxwing/download/19-e-commerce-currency-shopping/change-exchange.png',
    text: 'Requirement Changes',
    condition: 'always',
    callback: function (t, opt) {
      t.modal({
        title: 'Requirement Change Analysis',
        // url: './requirementChangeAnalysis.html',
        url: './changeCurrentPage.html',
        fullscreen: true
      })
    }
  }];
}


window.TrelloPowerUp.initialize(
  {
    'board-buttons':getBoardButton,
    'card-badges': function(t, opts) {
      const cardId = t.getContext().card;
      return t.get(cardId, 'shared', 'demandChangeCount').then(res => {
        console.log('card-badges by card id', res);
        if(res) {
              return [{
                text: '    ',
                color: 'red'
              }]
        }
      })
    },
    'card-buttons': cardButtons,
    'card-detail-badges': function (t, opts) {
      const cardId = t.getContext().card;
      return t.get(cardId, 'shared', 'demandChangeCount').then(res => {
        demandChangeCount = res ? res : 0;
        console.log('demandChangeCount', demandChangeCount);
        if(demandChangeCount !== 0) {
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
        }
      });
    },
  }
);

// t.card("all") can get all infos about a card
// use 'desc' can get description about a card
// return t.cards("all").then(res => console.log(JSON.stringify(res, null, 2)));

// return t.board("all").then(res => console.log(JSON.stringify(res, null, 2))); // get card info (card id) on board

