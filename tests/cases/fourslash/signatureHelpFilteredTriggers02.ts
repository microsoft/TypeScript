/// <reference path="fourslash.ts" />

////function foo<T>(x: T): T {
////  throw null;
////}
////
////foo(/*1*/"");
////foo(` ${100/*2*/}`);
////foo(/*3*/);
////foo(100 /*4*/)
////foo([/*5*/])
////foo({ hello: "hello"/*6*/})

const charMap = {
    1: "(",
    2: ",",
    3: "(",
    4: "<",
    5: ",",
    6: ",",
}

for (const markerName of Object.keys(charMap)) {
    const triggerCharacter = charMap[markerName];
    goTo.marker(markerName);
    edit.insert(triggerCharacter);
    verify.noSignatureHelpForTriggerReason({
        kind: "characterTyped",
        triggerCharacter,
    });
    verify.signatureHelpPresentForTriggerReason({
        kind: "retrigger",
        triggerCharacter,
    });
    edit.backspace(triggerCharacter.length);
}
