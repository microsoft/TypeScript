/// <reference path="fourslash.ts" />

// @Filename: a.ts
////export class C {
////    [|constructor|](n: number);
////    [|constructor|]();
////    [|constructor|](n?: number){}
////    static f() {
////        this.f();
////        new [|this|]();
////    }
////}
////new [|C|]();
// Does not handle alias.
////const D = C;
////new D();

// @Filename: b.ts
////import { C } from "./a";
////new [|C|]();

// @Filename: c.ts
////import { C } from "./a";
////class D extends C {
////    constructor() {
////        [|super|]();
////        super.method();
////    }
////    method() { super(); }
////}
// Does not find 'super()' calls for a class that merely implements 'C',
// since those must be calling a different constructor.
////class E implements C {
////    constructor() { super(); }
////}

// Works with qualified names too
// @Filename: d.ts
////import * as a from "./a";
////new a.[|C|]();
////class d extends a.C { constructor() { [|super|](); }

const ranges = test.ranges();
const [a0, a1, a2, a3, a4, b0, c0, d0, d1] = ranges;
verify.referenceGroups([a0, a2], defs("class C"));
verify.referenceGroups(a1, defs("class C"));

function defs(definition: string) {
    return [
        { definition, ranges: [a0, a1, a2, a3, d0, d1, a4] },
        { definition: "(alias) class C\nimport C", ranges: [b0] },
        { definition: "(alias) class C\nimport C", ranges: [c0] }
    ]
}
