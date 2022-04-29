/// <reference path='fourslash.ts' />

// @Filename: a.ts
////function /*a*/fn1/*b*/(a: number, b: number, ...args: [number, number]) { }
////fn1(1, 2, 3, 4);

// @Filename: b.ts
////function /*c*/fn2/*d*/(a: number, b: number, ...args: [number, number, ...string[]]) { }
////fn2(1, 2, 3, 4);
////fn2(1, 2, 3, 4, "a");

// @Filename: c.ts
////function /*e*/fn3/*f*/(b: boolean, c: []) { }
////fn3(true, []);

// @Filename: d.ts
////function /*g*/fn4/*h*/(a: number, ...args: [...string[]] ) { }
////fn4(2);
////fn4(1, "two", "three");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function fn1({ a, b, args }: { a: number; b: number; args: [number, number]; }) { }
fn1({ a: 1, b: 2, args: [3, 4] });`
});

goTo.select("c", "d");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function fn2({ a, b, args }: { a: number; b: number; args: [number, number, ...string[]]; }) { }
fn2({ a: 1, b: 2, args: [3, 4] });
fn2({ a: 1, b: 2, args: [3, 4, "a"] });`
});

goTo.select("e", "f");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function fn3({ b, c }: { b: boolean; c: []; }) { }
fn3({ b: true, c: [] });`
});

goTo.select("g", "h");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function fn4({ a, args = [] }: { a: number; args?: [...string[]]; }) { }
fn4({ a: 2 });
fn4({ a: 1, args: ["two", "three"] });`
});