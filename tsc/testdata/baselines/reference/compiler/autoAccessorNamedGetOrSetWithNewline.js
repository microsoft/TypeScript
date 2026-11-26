//// [tests/cases/compiler/autoAccessorNamedGetOrSetWithNewline.ts] ////

//// [autoAccessorNamedGetOrSetWithNewline.ts]
class C {
    accessor get
    m() { return 42; }

    accessor set
    n() { return 42; }
}

const c = new C();
const m: () => number = c.m;
const n: () => number = c.n;


//// [autoAccessorNamedGetOrSetWithNewline.js]
"use strict";
class C {
    accessor get;
    m() { return 42; }
    accessor set;
    n() { return 42; }
}
const c = new C();
const m = c.m;
const n = c.n;
