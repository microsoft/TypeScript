//// [privateNamesNoAccessibilityModifiers.ts]
// @target es6

class A {
    public #foo = 3;         // Error
    private #bar = 3;        // Error
    protected #baz = 3;      // Error
    readonly #qux = 3;       // OK
}


//// [privateNamesNoAccessibilityModifiers.js]
"use strict";
// @target es6
var A = /** @class */ (function () {
    function A() {
        this[] = 3; // Error
        this[] = 3; // Error
        this[] = 3; // Error
        this[] = 3; // OK
    }
    return A;
}());
