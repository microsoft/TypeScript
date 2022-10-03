/// <reference path="fourslash.ts" />

////declare class ViewJayEss {
////    constructor(obj: object);
////}
////new ViewJayEss({
////    methods: {
////        sayHello/**/
////    }
////});

goTo.marker();
edit.insert("(");
verify.noSignatureHelpForTriggerReason({
    kind: "characterTyped",
    triggerCharacter: "(",
});

edit.insert(") {},");
verify.noSignatureHelpForTriggerReason({
    kind: "characterTyped",
    triggerCharacter: ",",
});
