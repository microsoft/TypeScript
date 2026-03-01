/// <reference path="fourslash.ts" />

////function f() {
////    const a = { prop: 123 };
////    const { prop } = /*a*/a/*b*/;
////}
goTo.select("a", "b");
verify.refactorAvailableForTriggerReason("invoked", "Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent:
`function f() {
    const { prop } = { prop: 123 };
}`,
    triggerReason: "invoked"
});
