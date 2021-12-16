// console.log('Hello World!');
//
// let changeCount;
// const onSaveBtnClicked = function (t, opts) {
//   changeCount = t.get('card', 'shared', 'changeCount');
//   console.log(changeCount);
//   changeCount = changeCount + 1;
// }
//
// const onSetBtnCLicked = function(t) {
//   console.log('before set', changeCount);
//   changeCount = changeCount + 1;
//   console.log('type', typeof changeCount);
//   const permission = t.getContext().permissions;
//   console.log('permission', permission);
//   t.card('name').then(t.set('card', 'shared', 'changeCount',  changeCount).then(res => console.log(res)))
//
//   // t.set('card', 'shared', 'changeCount',  changeCount);
//   // t.get('card', 'shared', 'changeCount').then(res => {
//   //   console.log('res', res);
//   // });
//   console.log('after set', changeCount);
// }
//
// const onBtnClick = function(t, opts) {
//   console.log('Someone clicked the button');
//   return t.popup({
//     title: 'Demand Change',
//     items: [{
//       text: 'Choose Time',
//       callback: onSaveBtnClicked,
//     },{
//       text: 'In 1 hour',
//       callback: onSetBtnCLicked,
//     }, {
//       text: 'In 2 hour'
//     }]
//   });
// };
//
// window.TrelloPowerUp.initialize(
//   {
//     'card-badges': function(t, opts) {
//       return t.card("name")
//         .get("name")
//         .then(function(cardName) {
//         console.log('card name  ' + cardName);
//         return [
//           {
//           dynamic: function() {
//             return {
//               text: "Dynamic" + (Math.random() * 100).toFixed(0).toString(),
//               color: "green",
//               refresh: 10,
//             };
//           },
//         },
//           {
//             text: "Static",
//             color: null,
//           }];
//       });
//     },
//     'card-buttons': function(t, opts) {
//       return [{
//         text: 'Demand-Power-Up',
//         callback: onBtnClick,
//         condition: 'edit'
//       }, {
//         text: 'Open',
//         condition: 'always',
//         target: 'Trello Developer Site'
//       }];
//     },
//     'card-detail-badges': function (t, opts) {
//       return t.card('all')
//         .get('card', 'shared', 'changeCount', '1')
//         // .then(res => console.log('this is all', res))
//         // // .get('name')
//         // // .then(
//         // //   function(cardName) {
//         .then(res => {
//             console.log('this is the card info: ', res)
//           if(!res) {
//             changeCount = 0;
//             console.log('changeCount', changeCount);
//           }
//           return [{
//             dynamic: function() {
//               return {
//                 title: 'Detail Badge',
//                 text: '0' || res.toString(),
//                 color: 'red',
//                 refresh: 10
//               };
//             },
//           }];
//           }).catch(error => console.log('error', error));
//         }
//   }
// );


console.log('Hello World!');

let changingTimes = 0;
const onSaveBtnClicked = function (t, opts) {
  changingTimes = changingTimes + 1;
}

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
      t.get();
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
    'card-buttons': cardButtons,
    'card-detail-badges': function (t, opts) {
      return t.card('name')
        .get('name')
        .then(function (cardName) {
          return [{
            dynamic: function () {
              return {
                title: 'Changes',
                text: changingTimes.toString(),
                color: 'red',
                refresh: 10
              };
            },
          }]
        })
    },
  }
);
