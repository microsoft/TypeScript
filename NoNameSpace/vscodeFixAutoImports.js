/* eslint-disable no-var */
// this should be used in vscode developper tools.

// rowElement means the whole row element

// https://stackoverflow.com/questions/52926371/vscode-typescript-add-all-missing-imports-shortcut
var triggerEvent = new KeyboardEvent("keydown", {
    // code: "KeyS",
    // key: "s",
    bubbles: true,
    composed: true,
    ctrlKey: true,
    keyCode: 83,
});

// ATTENTION!!!!!!
// this event could not be triggered normally
// you need to copy one global event and rename it to arrowDownEvent
// document.addEventListener('keydown',function(e){console.log(e)})
// arrowDownEvent = temp1
var arrowDownEventFALSE = new KeyboardEvent("keyDown", {
    altKey: false,
    bubbles: true,
    cancelBubble: false,
    cancelable: true,
    charCode: 0,
    code: "ArrowDown",
    composed: true,
    ctrlKey: false,
    defaultPrevented: true,
    detail: 0,
    eventPhase: 0,
    isComposing: false,
    isTrusted: true,
    key: "ArrowDown",
    keyCode: 40,
    location: 0,
    metaKey: false,
    repeat: false,
    returnValue: false,
    shiftKey: false,
    timeStamp: 9281411.61000001,
    type: "keydown",
    which: 40,
    srcElement:document.querySelector(".monaco-list.list_id_3"),
    target:document.querySelector(".monaco-list.list_id_3"),
    sourceCapabilities:  new InputDeviceCapabilities()
});

function isFolder(rowElement) {
    const twistie = rowElement.querySelector(".monaco-tl-twistie");
    const classNames = twistie.className.split(" ");
    return classNames.some(n => n === "collapsible");
}

function isCollpasedFolder(rowElement) {
    const twistie = rowElement.querySelector(".monaco-tl-twistie");
    const classNames = twistie.className.split(" ");
    return classNames.some(n => n === "collapsible") && classNames.some(n => n === "collapsed");
}

// aria-level -- which could be used to determinated contain relation.

async function ExpandIfElementIsCollapsedFolder(rowElement) {
    if (isCollpasedFolder(rowElement)) {
        rowElement.click();
        await waitForRenderResponse();
    }
}

var notImportInTimeFilesName = [];

async function worker(startElementIdPrefix, startElementIdIndex) {
    console.log("start");
    let curRawElement = document.querySelector("#" + startElementIdPrefix + startElementIdIndex);
    const startLevel = curRawElement.attributes["aria-level"].value;
    function condition() {
        let curLevel = curRawElement && curRawElement.attributes &&curRawElement.attributes["aria-level"].value;
        while(!curLevel){
            waitForRenderResponse(1);
            debugger;
            curRawElement = document.querySelector(selector);
            curLevel = curRawElement && curRawElement.attributes &&curRawElement.attributes["aria-level"].value;
        }
        if (curLevel !== startLevel) {
            return true;
        }
        return false;
    }
    let i = startElementIdIndex;
    let selector;
    do {
        await ExpandIfElementIsCollapsedFolder(curRawElement);
        await triggerImportAllMissingImports(curRawElement);
        i++;
        selector = "#" + startElementIdPrefix + i;
        curRawElement = document.querySelector(selector);
        document.activeElement.dispatchEvent(arrowDownEvent);
        document.activeElement.dispatchEvent(arrowDownEvent);
        document.activeElement.dispatchEvent(arrowDownEvent);
    }
    while (condition());
}

async function triggerImportAllMissingImports(rawElement) {
    const tsAndNotDeclaration = RegExp("(?<!\\.d)\\.ts");
    if (!isFolder(rawElement) && tsAndNotDeclaration.test(rawElement.textContent)) {
        // here is very stange, if i call waitForRenderResponse for twice after each steps, things would go wrong.
        rawElement.click();
        await waitForRenderResponse(1000);
        function getFixedFlag(){
            const lines = document.querySelectorAll(".view-line");
            return [...lines].some(l=>l.textContent.startsWith("import"));
        }
        let importFixedFlag = false;
        let count = 0;
        const waitInternal = 1000 ; // ms
        const totalWaitTime = 20; // s
        const waitTimes = totalWaitTime*1000/waitInternal;
        while(!importFixedFlag && count < waitTimes){
            document.activeElement.dispatchEvent(triggerEvent);
            count+=1;
            await waitForRenderResponse(1000);
            importFixedFlag = getFixedFlag();
        }
        if(count>=waitTimes){
            notImportInTimeFilesName.push(rawElement.textContent);
        }
    }
}

async function waitForRenderResponse(time = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

worker("list_id_3_", 11);
