/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f(a, b) {
////    const x = 0;
////}
////function g(a, b, c) { return a; }
////
////interface I {
////    m(x: number): void;
////}
////
////class C implements I {
////    m(x: number): void {} // Does not remove 'x', which is inherited
////    n(x: number): void {}
////}
////
////declare function takesCb(cb: (x: number, y: string) => void): void;
////takesCb((x, y) => {});
////takesCb((x, y) => { x; });
////takesCb((x, y) => { y; });
////
////{
////    let a, b;
////}
////for (let i = 0, j = 0; ;) {}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`function f() {
}
function g(a) { return a; }

interface I {
    m(x: number): void;
}

class C implements I {
    m(x: number): void {} // Does not remove 'x', which is inherited
    n(): void {}
}

declare function takesCb(cb: (x: number, y: string) => void): void;
takesCb(() => {});
takesCb((x) => { x; });
takesCb((x, y) => { y; });

{
}
for (; ;) {}`,
});
