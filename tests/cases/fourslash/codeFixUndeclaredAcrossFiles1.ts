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
//// c.m2(c);

// @Filename: f1.ts
//// export class C {[|
////     |]x: number;
//// }

verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);
verify.getAndApplyCodeFix(/*errorCode*/undefined, 0);

verify.rangeIs(`
    m2(c: C) {
        throw new Error("Method not implemented.");
    }
    y: {};
    m1() {
        throw new Error("Method not implemented.");
    }
    static x: any;
    static m0(arg0: number, arg1: string, arg2: undefined[]) {
        throw new Error("Method not implemented.");
    }
`);
