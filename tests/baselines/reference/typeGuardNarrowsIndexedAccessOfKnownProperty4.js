//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty4.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty4.ts]
class Foo {
    x: number | undefined;

    constructor() {
        this.x = 5;

        this.x;    // number
        this['x']; // number

        const key = 'x';
        this[key]; // number
    }
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty4.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo() {
        this.x = 5;
        this.x; // number
        this['x']; // number
        var key = 'x';
        this[key]; // number
    }
    return Foo;
}());
