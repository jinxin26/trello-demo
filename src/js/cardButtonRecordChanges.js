import axios from 'axios';

const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
console.log("context=",context);
let demandChangeCount;
t.get(context.card, 'shared', 'demandChangeCount').then(demandChangeCountInResponse => {
    demandChangeCount = demandChangeCountInResponse ? demandChangeCountInResponse : 0;
    showDemandChangeCount(`total changes: ${demandChangeCount}`);
});

let info = {
    cardId: '',
    descriptions: '',
    version: ''
}

const getVersionRecord = () => {
    axios.get(`http://localhost:8086/description/${context.card}`).then(list => {

        console.log('length of list', list.data.length);
        console.log('list', list);
        for (let i = list.data.length - 1; i >= list.data.length - 5; i--) {
            const button = document.createElement("button");
            console.log(list.data[i].version);
            button.textContent = list.data[i].version;
            document.body.appendChild(button);
        }
    });
}
getVersionRecord();

// use remove to delete a certain info
// t.remove(context.card, 'shared', 'demandInfo').then(res => console.log("this is remove", res));

let demandInfo = [];
t.card("desc").then(curDesc => {
    console.log('this is curDesc', curDesc);
    t.get(context.card, 'shared', 'demandInfo').then(totalDesc => {
        console.log('this is totalDesc', totalDesc);
        if (!totalDesc) {
            demandInfo.push(curDesc);
            console.log('this is demandInfo', demandInfo);
            t.set(context.card, 'shared', {demandInfo}).then(res => {
                console.log('init set', res);
                t.get(context.card, 'shared', 'demandInfo').then(res => console.log('this is demandInfo after set', res));
            });
        }
        demandInfo.push(totalDesc);
        console.log('demandInfo', demandInfo);
    })
})

window.onRecordBtnClick = function onRecordBtnClick() {
    demandChangeCount = demandChangeCount + 1;
    console.log("demandChangeCount is increased, now its value is: ", demandChangeCount);
    showDemandChangeCount(`total changes: ${demandChangeCount}`);
}

window.onSaveBtnClick = function onSaveBtnClick () {
    t.set(context.card, 'shared', {demandChangeCount});
    console.log("demandChangeCount is saved!");
    showDemandChangeCount(`total changes: ${demandChangeCount} (save successfully!)`);

    // postDescription(info);
    t.card('id','desc').then(res => {
        console.log('id', res);
        info.cardId = res.id;
        info.descriptions = res.desc;
        info.version = `v${demandChangeCount}.0`;
        axios.post("http://localhost:8086/description", info).then(res => {
            console.log('this is post info', res);

            const btnList = document.getElementsByTagName("button");
            for (let i = 0; i < btnList.length; i++) {
                if(btnList[i].textContent.substr(0, 1) !== "v") {
                    btnList.remove(i);
                }
            }
            console.log('btnList length', btnList.length);
            if(btnList.length < 5) {
                axios.get(`http://localhost:8086/description/${context.card}`).then(list => {

                    for (let i = list.data.length - 1; i >= list.data.length - (5 - btnList.length); i--) {
                        const button = document.createElement("button");
                        console.log(list.data[i].version);
                        button.textContent = list.data[i].version;
                        document.body.appendChild(button);
                    }
                });
            }
            else {
                axios.get(`http://localhost:8086/description/${context.card}`).then(list => {

                    for (let i = list.data.length - 1, j = 0; i >= list.data.length - (5 - btnList.length), j < 5; i--, j++) {
                        btnList[j].textContent = list.data[i].version;
                    }
                });
            }
        });
    });



    // t.card("desc").then(curDesc => {
    //     console.log('this is curDesc after save', curDesc);
    //     if(curDesc !== demandInfo[demandInfo.length - 1]) {
    //         demandInfo.push(curDesc);
    //         console.log('this is demandInfo after save', demandInfo);
    //         t.set(context.card, 'shared', { demandInfo }).then(res => {
    //             console.log('set', res);
    //             t.get(context.card, 'shared', 'demandInfo').then(res => console.log('this is demandInfo after set and save', res));
    //         });
    //     }
    // })
}

const showDemandChangeCount = demandChangeCount => {
    let element = document.getElementById("demandChangeCount");
    element.innerHTML = demandChangeCount;
}