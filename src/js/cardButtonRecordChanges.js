const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
console.log("context=",context);
let demandChangeCount;
t.get(context.card, 'shared', 'demandChangeCount').then(demandChangeCountInResponse => {
    demandChangeCount = demandChangeCountInResponse ? demandChangeCountInResponse : 0;
    showDemandChangeCount(`total changes: ${demandChangeCount}`);
});

t.remove(context.card, 'shared', 'demandInfo').then(res => console.log(res));

t.get(context.card, 'shared', 'demandInfo').then(res => console.log(res));
// let demandInfo = [];
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
    t.card('desc').then(res => {
        console.log('init res', res);
        demandInfo.push(res);
        console.log('changed demandInfo', demandInfo);
    });
    t.set(context.card, 'shared', {demandInfo}).then(res => console.log('current demandInfo', res));
}

showDemandChangeCount = demandChangeCount => {
    let element = document.getElementById("demandChangeCount");
    element.innerHTML = demandChangeCount;
}