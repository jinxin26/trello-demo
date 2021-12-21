const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
console.log("context=",context);
let demandChangeCount;
t.get(context.card, 'shared', 'demandChangeCount').then(demandChangeCountInResponse => {
    demandChangeCount = demandChangeCountInResponse ? demandChangeCountInResponse : 0;
    showDemandChangeCount(`total changes: ${demandChangeCount}`);
});

// use remove to delete a certain info
// t.remove(context.card, 'shared', 'demandInfo').then(res => console.log("this is remove", res));

// let demandInfo = [1, 2];
let test = ['1'];
t.set(context.card, 'shared', {test});
t.get(context.card, 'shared', 'test').then(res => console.log('test', res));
// t.card("desc").then(curDesc => {
//     console.log('this is curDesc', curDesc);
//     t.get(context.card, 'shared', 'demandInfo').then(totalDesc => {
//         console.log('this is totalDesc', totalDesc);
//         if (!totalDesc) {
//             demandInfo.push(curDesc);
//             console.log('this is demandInfo', demandInfo);
//             t.set(context.card, 'shared', {demandInfo});
//             t.get(context.card, 'shared', 'demandInfo').then(res => console.log('this is demandInfo after set', res));
//         }
//     })
// })
// t.get(context.card, 'shared', 'demandInfo').then(res => {
//     if(res.length === 0) {
//         t.card("desc").then(cards => {
//             console.log('t.cards(\'desc\') res: ', JSON.stringify(cards, null, 2));
//             demandInfo.push(cards);
//             t.set(context.card, 'shared', {demandInfo});
//         });
//         console.log('Init demandInfo by t.card', demandInfo);
//     }
//     else {
//         console.log('init demandInfo by t.get', res);
//         demandInfo.push(res);
//         t.set(context.card, 'shared', {demandInfo});
//         console.log('changed demandInfo', demandInfo[demandInfo.length - 1]);
//     }
// });

onRecordBtnClick = () => {
    demandChangeCount = demandChangeCount + 1;
    console.log("demandChangeCount is increased, now its value is: ", demandChangeCount);
    showDemandChangeCount(`total changes: ${demandChangeCount}`);
}

onSaveBtnClick = () => {
    t.set(context.card, 'shared', {demandChangeCount});
    console.log("demandChangeCount is saved!");
    showDemandChangeCount(`total changes: ${demandChangeCount} (save successfully!)`);

    t.card("desc").then(curDesc => {
        console.log('this is curDesc after save', curDesc);
        t.get(context.card, 'shared', 'demandInfo').then(totalDesc => {
            console.log('this is totalDesc after save', totalDesc);
            if(curDesc !== totalDesc[totalDesc.length - 1]) {
                demandInfo.push(curDesc);
                console.log('this is demandInfo after save', demandInfo);
                t.set(context.card, 'shared', {demandInfo})
                t.get(context.card, 'shared', 'demandInfo').then(res => console.log('this is demandInfo after set and save', res));
            }
        })
    })
}

showDemandChangeCount = demandChangeCount => {
    let element = document.getElementById("demandChangeCount");
    element.innerHTML = demandChangeCount;
}