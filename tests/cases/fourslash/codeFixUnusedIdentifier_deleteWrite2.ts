/// <reference path='fourslash.ts' />

// @strict: false
// @noLib: true
// @noUnusedLocals: true

////export class C {
////    private p: number;
////
////    m() { this.p = 0; }
////}

verify.codeFix({
    description: "Remove unused declaration for: 'p'",
    newFileContent:
`export class C {

    m() { }
}`,
});
