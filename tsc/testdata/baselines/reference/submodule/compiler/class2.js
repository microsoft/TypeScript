//// [tests/cases/compiler/class2.ts] ////

//// [class2.ts]
class foo { constructor() { static f = 3; } }

//// [class2.js]
"use strict";
class foo {
    constructor() { }
    static f = 3;
}
