console.log('Hello World!');

let changeCount = 0;
const onSaveBtnClicked = function (t, opts) {
  changeCount = changeCount + 1;
}

const onBtnClick = function(t, opts) {
  console.log('Someone clicked the button');
  return t.popup({
    title: 'Demand Change',
    items: [{
      text: 'Choose Time',
      callback: onSaveBtnClicked,
    },{
      text: 'In 1 hour'
    }, {
      text: 'In 2 hour'
    }]
  });
};

window.TrelloPowerUp.initialize(
  {
    'card-badges': function(t, opts) {
      let cardAttachments = t.card('attachments');
      // let cardAttachments = opts.attachments;
      return t.card("name")
        .get("name")
        .then(function(cardName) {
        console.log('card name  ' + cardName);
        return [
          {
          dynamic: function() {
            return {
              text: "Dynamic" + (Math.random() * 100).toFixed(0).toString(),
              color: "green",
              refresh: 10,
            };
          },
        },
          {
            text: "Static",
            color: null,
          }];
      });
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
    },
    'card-detail-badges': function (t, opts) {
      return t.card('name')
        .get('name')
        .then(function (cardName) {
          return [{
            dynamic: function () {
              return {
                title: 'Detail Badge',
                text: changeCount.toString(),
                color: 'red',
                refresh: 10
              };
            },
          },{
            title: 'Detail',
            text: '6',
            color: 'blue'
          }];
        });
    },
  }
);
