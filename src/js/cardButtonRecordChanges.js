const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
console.log("context=",context);
let demandChangeCount;
t.get(context.card, 'shared', 'demandChangeCount').then(demandChangeCountInResponse => {
    demandChangeCount = demandChangeCountInResponse ? demandChangeCountInResponse : 0;
    showDemandChangeCount(`total changes: ${demandChangeCount}`);
});

let demandInfo = [];
t.card("desc").then(function (cards) {
    console.log('t.cards(\'desc\') res: ', JSON.stringify(cards, null, 2));
    if(demandInfo.length === 0) {
        demandInfo.push(cards);
        console.log('Init demandInfo', demandInfo);
    }
});

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