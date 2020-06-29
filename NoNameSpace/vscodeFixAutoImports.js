// this should be used in vscode developper tools.

// rowElement means the whole row element
const triggerEvent = new KeyboardEvent("keydown",{
    // code: "KeyS",
    // key: "s",
    bubbles: true,
    composed: true,
    ctrlKey: true,
    keyCode: 83,
});

function isFolder(rowElement){
    const twistie = rowElement.querySelector(".monaco-tl-twistie");
    const classNames = twistie.className.split(" ");
    return classNames.some(n=>n==="collapsible");
}

function isCollpasedFolder(rowElement){
    const twistie = rowElement.querySelector(".monaco-tl-twistie");
    const classNames = twistie.className.split(" ");
    return classNames.some(n=>n==="collapsible") && classNames.some(n=>n==="collapsed");
}

// aria-level -- which could be used to determinated contain relation.

async function ExpandIfElementIsCollapsedFolder(rowElement){
    if(isCollpasedFolder(rowElement)){
        rowElement.click();
        await waitForRenderResponse();
    }
}

async function worker(startElementIdPrefix, startElementIdIndex){
    console.log("start");
    let curRawElement = document.querySelector("#"+startElementIdPrefix+startElementIdIndex);
    const startLevel = curRawElement.attributes["aria-level"].value;
    function condition(){
        const curLevel = curRawElement.attributes["aria-level"].value;
        if(curLevel !== startLevel){
            return true;
        }
        return false;
    }
    let i = startElementIdIndex;
    do{
        console.log(startElementIdPrefix+i);
        await ExpandIfElementIsCollapsedFolder(curRawElement);
        await triggerImportAllMissingImports(curRawElement);
        i++;
        const lastRawElement = curRawElement;
        curRawElement = document.querySelector("#"+startElementIdPrefix+i);
    }
    while(condition());
}

async function triggerImportAllMissingImports(rawElement){
    if(!isFolder(rawElement)){
        // here is very stange, if i call waitForRenderResponse for twice after each steps, things would go wrong.
        rawElement.click();
        document.activeElement.dispatchEvent(triggerEvent);
    }
}

async function waitForRenderResponse(){
    return new Promise(resolve=>{
        setTimeout(()=>{
                resolve();
        },0);
    });
}

worker("list_id_3_",5);