/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: f2.ts
//// import * as X from "./f1";
//// X.C.m0(1, "", []);
//// X.C.x;
//// let c = new X.C;
//// c.m1();
//// c.y = {};

// @Filename: f1.js
//// [|export class C {
////     constructor() { }
//// }
////
//// |]

verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);

verify.rangeIs(`
export class C {
    m1() {
        throw new Error("Method not implemented.");
    }
    static m0(arg0, arg1, arg2) {
        throw new Error("Method not implemented.");
    }
    constructor() {
        this.y = undefined;
    }
}
C.x = undefined;
`);