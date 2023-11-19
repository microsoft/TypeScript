/// <reference path='fourslash.ts' />

//// interface Yadda<T> { x: T }
//// 
//// export let blah: Yadda/*a*/<string>/*b*/;

goTo.marker("a");
verify.refactorAvailableForTriggerReason("invoked", "Extract type", "Extract to type alias")

goTo.marker("b");
edit.applyRefactor({
    triggerReason: "invoked",
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `interface Yadda<T> { x: T }

type /*RENAME*/NewType = Yadda<string>;

export let blah: NewType;`,
});
