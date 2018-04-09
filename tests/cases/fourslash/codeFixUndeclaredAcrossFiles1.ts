/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: f2.js
//// import * as X from "./f1";
//// X.C.m0(1, "", []);
//// X.C.x;
//// let c = new X.C;
//// c.m1();
//// c.y = {};

// @Filename: f1.ts
//// export class C {[|
////     |]x: number;
////     static y: string;
//// }

verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);

verify.rangeIs(`
    y: { [x: string]: any; };
    m1(): any {
        throw new Error("Method not implemented.");
    }
    static x: any;
    static m0(arg0: any, arg1: any, arg2: any): any {
        throw new Error("Method not implemented.");
    }
`);
