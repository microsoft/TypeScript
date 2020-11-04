/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: f3.ts
//// import { C } from "./f1";
//// import { D } from "./f2";
//// const c = new C();
//// c.m0(new D());

// @Filename: f2.ts
//// export class D { }

// @Filename: f1.ts
//// export class C {[|
////     |]x: number;
//// }

verify.getAndApplyCodeFix(/*errorCode*/ undefined, 0);

verify.rangeIs(`
    m0(arg0: D) {
        throw new Error("Method not implemented.");
    }
`);