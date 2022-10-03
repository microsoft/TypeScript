/// <reference path="fourslash.ts" />

////declare function foo<T>(x: T, y: T): T;
////
////foo/*1*//*2*/;
////foo(/*3*/100/*4*/);
////foo/*5*//*6*/();

const charMap = {
    1: "(",
    2: "<",
    3: ",",
    4: ",",
    5: "(",
    6: "<",
}

for (const markerName of Object.keys(charMap)) {
    const triggerCharacter = charMap[markerName];
    goTo.marker(markerName);
    edit.insert(triggerCharacter);
    verify.signatureHelpPresentForTriggerReason({
        kind: "characterTyped",
        triggerCharacter,
    });
    verify.signatureHelpPresentForTriggerReason({
        kind: "retrigger",
        triggerCharacter,
    });
    edit.backspace(triggerCharacter.length);
}
