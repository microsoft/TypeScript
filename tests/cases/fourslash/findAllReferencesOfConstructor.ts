/// <reference path="fourslash.ts" />

// @Filename: a.ts
////export class C {
////    /*0*/constructor(n: number);
////    /*1*/constructor();
////    /*2*/constructor(n?: number){}
////    static f() {
////        this.f();
////        new this();
////    }
////}
////new C();
// Does not handle alias.
////const D = C;
////new D();

// @Filename: b.ts
////import { C } from "./a";
////new C();

// @Filename: c.ts
////import { C } from "./a";
////class D extends C {
////    constructor() {
////        super();
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
////new a.C();
////class d extends a.C { constructor() { super(); }

verify.baselineFindAllReferences('0', '1', '2')
