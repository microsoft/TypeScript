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

goTo.eachMarker(["e0", "e1", "let0", "let1"], () => {
    verify.completionListContains("Enu", "enum Enu", "", "enum", undefined, undefined, { isRecommended: true });
});

goTo.eachMarker(["c0", "c1"], (_, idx) => {
    verify.completionListContains(
        "Cls",
        idx === 0 ? "constructor Cls(): Cls" : "class Cls",
        "",
        "class",
        undefined,
        undefined, {
        isRecommended: true,
    });
});

goTo.eachMarker(["a0", "a1"], (_, idx) => {
    // Not recommended, because it's an abstract class
    verify.completionListContains("Abs", idx == 0 ? "constructor Abs(): Abs" : "class Abs", "", "class");
});
