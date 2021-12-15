console.log('Hello World!');

let changeCount;
const onSaveBtnClicked = function (t, opts) {
  changeCount = t.get('card', 'shared', 'changeCount');
  console.log(changeCount);
  changeCount = changeCount + 1;
}

const onSetBtnCLicked = function(t) {
  console.log('before set', changeCount);
  t.set('card', 'shared', {changeCount: changeCount + 1});
  console.log('after set', changeCount);
}

const onBtnClick = function(t, opts) {
  console.log('Someone clicked the button');
  return t.popup({
    title: 'Demand Change',
    items: [{
      text: 'Choose Time',
      callback: onSaveBtnClicked,
    },{
      text: 'In 1 hour',
      callback: onSetBtnCLicked,
    }, {
      text: 'In 2 hour'
    }]
  });
};

window.TrelloPowerUp.initialize(
  {
    'card-badges': function(t, opts) {
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
        .then(function(cardName) {
          if (changeCount === undefined) {
            t.set('card', 'shared', 'changeCount', '1').then(function() {
              t.get('card', 'shared', 'changeCount').then(res => changeCount = res);
            })
          }
          console.log('changeCount0', changeCount);
          // changeCount = await t.get('card', 'shared', 'changeCount');
          // console.log('changeCount1', changeCount);
          return [{
            dynamic: function() {
              return {
                title: 'Detail Badge',
                text: changeCount.toString(),
                color: 'red',
                refresh: 10
              };
            },
          }];
        });
    },
  }
);
