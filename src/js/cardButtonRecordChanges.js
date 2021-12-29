import axios from 'axios';
const Diff = require('diff');

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

const addBtnForVersionRecord = (list, versionRecord, curPage) => {
    versionRecord.remove();
    versionRecord = document.createElement("div");
    document.body.appendChild(versionRecord);
    versionRecord.id = "versionRecord";

    console.log('this is list', list.data);
    const listWithoutV0 = list.data.filter(item => item.version !== 'v0.0');
    console.log('this is list after filter', list.data);
    console.log('this is listWithoutV0 after filter', listWithoutV0);
    for (let i = list.data.length - 1 - curPage * 5; i >= list.data.length - curPage * 5 - 5 && i >= 0; i--) {
        if(list.data[i].version !== 'v0.0') {
            const button = document.createElement("button");
            button.textContent = list.data[i].version;
            button.addEventListener('click', function () {onVersionBtnCLick(button.textContent)});
            versionRecord.appendChild(button);
        }
    }

    if(list.data.length > 5 || curPage !== 0) {
        const prevPage = document.createElement("button");
        prevPage.textContent = "<";
        prevPage.onclick = function() {
            if(curPage <= 0) {
                prevPage.disabled = true;
            }
            curPage = curPage - 1;
            addBtnForVersionRecord(list, versionRecord, curPage);

        }
        versionRecord.appendChild(prevPage);

        const nextPage = document.createElement("button");
        nextPage.textContent = ">";
        nextPage.onclick = function() {
            if(curPage === list.data.length / 5 - 1)
            {
                nextPage.disabled = true;
            }
            curPage = curPage + 1;
            addBtnForVersionRecord(list, versionRecord, curPage);
        }
        versionRecord.appendChild(nextPage);
    }
}

function onVersionBtnCLick(text) {
    console.log('text', text);
    axios.get(`http://localhost:8086/description/${context.card}`).then(list => {
        console.log('length of list', list.data.length);

        const versionNum = parseInt(text.substring(1));
        const lastVersionNum = versionNum - 1;
        const lastVersionText = `v${lastVersionNum}.0`;
        console.log("2.lastVersionNum: ", lastVersionNum);
        console.log("3.lastVersionText: ", lastVersionText);

        let currentData;
        let oldData;
        list.data.forEach(item => {
            if (item.version === text) {
                currentData = item;
            }
            if (item.version === lastVersionText) {
                oldData = item;
            }
        });
        console.log("4.currentData: ", currentData);
        console.log("5.oldData: ", oldData);

        const diff = Diff.diffChars(oldData.descriptions, currentData.descriptions);
        console.log("6.versionDiff: ", diff);

        return t.modal({
            url: './versionComparisons.html',
            args: {text: diff},
            height: 500,
            fullscreen: false,
            title: 'Description Comparison'
        })

    });

}

const getVersionRecord = () => {
    axios.get(`http://localhost:8086/description/${context.card}`).then(list => {
        const versionRecord = document.getElementById("versionRecord");
        let curPage = 0;
        addBtnForVersionRecord(list, versionRecord, curPage);
    });
}
getVersionRecord();

// use remove to delete a certain info
// t.remove(context.card, 'shared', 'demandInfo').then(res => console.log("this is remove", res));

let demandInfo = [];
t.card("desc").then(curDesc => {
    t.get(context.card, 'shared', 'demandInfo').then(totalDesc => {
        if (!totalDesc) {
            demandInfo.push(curDesc);
            t.set(context.card, 'shared', {demandInfo}).then(res => {
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

            axios.get(`http://localhost:8086/description/${context.card}`).then(list => {
                let versionRecord = document.getElementById("versionRecord");
                addBtnForVersionRecord(list, versionRecord, 0);
            });
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