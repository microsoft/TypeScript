/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////const fooo = 0;
////class C {
////    foo: number;
////    constructor() {[|
////        foo = 10;
////    |]}
////}

goTo.file("/b.ts");
verify.codeFixAvailable([
    { description: `Add import from "./a"` },
    { description: "Change spelling to 'fooo'" },
    { description: "Add 'this.' to unresolved variable" },
]);
verify.codeFix({
    index: 2,
    description: "Add 'this.' to unresolved variable",
    newRangeContent: `
        this.foo = 10;
    `
});
