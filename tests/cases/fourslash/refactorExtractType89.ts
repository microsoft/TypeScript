/// <reference path='fourslash.ts' />

//// interface Yadda<T> { x: T }
////
//// export let blah: Yadda/*a*/<string>/*b*/;
////
//// interface YaddaWithDefault<T = boolean/*c*/> { x: T/*d*/ }

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

export let blah: NewType;

interface YaddaWithDefault<T = boolean> { x: T }`,
});

goTo.marker("c");
edit.applyRefactor({
    triggerReason: "invoked",
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `interface Yadda<T> { x: T }

type NewType = Yadda<string>;

export let blah: NewType;

type /*RENAME*/NewType_1 = boolean;

interface YaddaWithDefault<T = NewType_1> { x: T }`
});

goTo.marker("d");
edit.applyRefactor({
    triggerReason: "invoked",
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `interface Yadda<T> { x: T }

type NewType = Yadda<string>;

export let blah: NewType;

type NewType_1 = boolean;

type /*RENAME*/NewType_2<T> = T;

interface YaddaWithDefault<T = NewType_1> { x: NewType_2<T> }`
});
