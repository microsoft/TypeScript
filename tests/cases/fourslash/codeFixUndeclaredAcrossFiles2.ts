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
////     x: number;
////     static y: string;
////     constructor() { }
//// }|]

verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);

verify.rangeIs(`
export class C {
    m1(): any {
        throw new Error("Method not implemented.");
    }
    static m0(arg0: any, arg1: any, arg2: any): any {
        throw new Error("Method not implemented.");
    }
    x: number;
    static y: string;
    constructor() {
        this.y = undefined;
    }
}
`);