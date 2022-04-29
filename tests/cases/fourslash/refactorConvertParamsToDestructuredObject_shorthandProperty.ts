/// <reference path='fourslash.ts' />

// @Filename: f.ts
////function /*a*/f/*b*/(a: number, b: number, ...rest: string[]) { }
////const a = 4;
////const b = 5;
////f(a, b);
////const rest = ["a", "b", "c"];
////f(a, b, ...rest);
////f(/** a */ a /** aa */, /** b */ b /** bb */);


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function f({ a, b, rest = [] }: { a: number; b: number; rest?: string[]; }) { }
const a = 4;
const b = 5;
f({ a, b });
const rest = ["a", "b", "c"];
f({ a, b, rest: [...rest] });
f({ /** a */ a /** aa */, /** b */ b /** bb */ });`
});