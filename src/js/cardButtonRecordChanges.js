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

const addBtnForVersionRecord = (list, versionRecord, curPage) => {
    versionRecord.remove();
    versionRecord = document.createElement("div");
    document.body.appendChild(versionRecord);
    versionRecord.id = "versionRecord";

    for (let i = list.data.length - 1 - curPage * 5; i >= list.data.length - curPage * 5 - 5 && i >= 0; i--) {
        const button = document.createElement("button");
        button.textContent = list.data[i].version;
        button.addEventListener('click', function () {onVersionBtnCLick(button.textContent)});
        versionRecord.appendChild(button);
    }

    if(list.data.length > 5 || curPage !== 0) {
        const prevPage = document.createElement("button");
        prevPage.textContent = "<";
        prevPage.onclick = function() {
            if(curPage > 0) {
                curPage = curPage - 1;
                addBtnForVersionRecord(list, versionRecord, curPage);
            }
        }
        versionRecord.appendChild(prevPage);

        const nextPage = document.createElement("button");
        nextPage.textContent = ">";
        nextPage.onclick = function() {
            if(curPage <= list.data.length / 5)
            {
                curPage = curPage + 1;
                addBtnForVersionRecord(list, versionRecord, curPage);
            }
        }
        versionRecord.appendChild(nextPage);
    }
}

function onVersionBtnCLick(text) {
    console.log('text', text);
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

            // const btnList = document.getElementsByTagName("button");
            // let versionBtnList = [];
            // for (let i = 0; i < btnList.length; i++) {
            //     if(btnList[i].textContent.substr(0, 1) === "v") {
            //         versionBtnList.push(btnList[i]);
            //     }
            // }

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