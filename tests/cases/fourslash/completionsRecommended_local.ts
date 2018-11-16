/// <reference path="fourslash.ts" />

////enum Enu {}
////class Cls {}
////abstract class Abs {}
////const e: Enu = E/*e0*/;
////const e: Enu = /*e1*/;
////const c: Cls = new C/*c0*/;
////const c: Cls = new /*c1*/;
////const a: Abs = new A/*a0*/;
////const a: Abs = new /*a1*/;

// Also works on mutations
////let enu: Enu;
////enu = E/*let0*/;
////enu = E/*let1*/;

const cls = (ctr: boolean): FourSlashInterface.ExpectedCompletionEntry => ({
    name: "Cls",
    text: ctr ? "constructor Cls(): Cls" : "class Cls",
    kind: "class",
    isRecommended: true,
});

// Not recommended, because it's an abstract class
const abs = (ctr: boolean): FourSlashInterface.ExpectedCompletionEntry => ({
    name: "Abs",
    text: ctr ? "constructor Abs(): Abs" : "class Abs",
    kind: "class",
    kindModifiers: "abstract",
});

verify.completions(
    {
        marker: ["e0", "e1", "let0", "let1"],
        includes: { name: "Enu", text: "enum Enu", kind: "enum", isRecommended: true },
        isNewIdentifierLocation: true,
    },
    { marker: "c0", includes: cls(true) },
    { marker: "c1", includes: cls(false) },
    { marker: "a0", includes: abs(true) },
    { marker: "a1", includes: abs(false) },
);
