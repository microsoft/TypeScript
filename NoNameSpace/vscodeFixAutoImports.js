// this should be used in vscode developper tools.

// rowElement means the whole row element

// https://stackoverflow.com/questions/52926371/vscode-typescript-add-all-missing-imports-shortcut
const triggerEvent = new KeyboardEvent("keydown", {
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
const arrowDownEventFALSE = new KeyboardEvent("keyDown", {
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

async function worker(startElementIdPrefix, startElementIdIndex) {
    console.log("start");
    let curRawElement = document.querySelector("#" + startElementIdPrefix + startElementIdIndex);
    const startLevel = curRawElement.attributes["aria-level"].value;
    function condition() {
        let curLevel = curRawElement && curRawElement.attributes &&curRawElement.attributes["aria-level"].value;
        if(!curLevel){
            waitForRenderResponse(0.01);
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
        // console.log(startElementIdPrefix + i);
        await ExpandIfElementIsCollapsedFolder(curRawElement);
        await triggerImportAllMissingImports(curRawElement);
        i++;
        const lastRawElement = curRawElement;
        selector = "#" + startElementIdPrefix + i;
        curRawElement = document.querySelector(selector);
        // console.log(curRawElement);
        document.activeElement.dispatchEvent(arrowDownEvent);
        document.activeElement.dispatchEvent(arrowDownEvent);
        document.activeElement.dispatchEvent(arrowDownEvent);
    }
    while (condition());
}

async function triggerImportAllMissingImports(rawElement) {
    if (!isFolder(rawElement)) {
        // here is very stange, if i call waitForRenderResponse for twice after each steps, things would go wrong.
        rawElement.click();
        document.activeElement.dispatchEvent(triggerEvent);
    }
}

async function waitForRenderResponse(time =0) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

worker("list_id_3_", 11);