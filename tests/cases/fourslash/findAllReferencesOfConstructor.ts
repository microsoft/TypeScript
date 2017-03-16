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
const [r0, r1, r2] = ranges;
verify.referenceGroups([r0, r2], [{ definition: "constructor C(n: number): C (+1 overload)", ranges }]);
verify.referenceGroups(r1, [{ definition: "constructor C(): C (+1 overload)", ranges }]);
