//// [classStaticPropertyAccess.ts]
class A {
    public static x: number = 1;
    public static y: number = 1;
    private static _b: number = 2;
}

const a = new A();

a['y'] // Error
a.y    // Error
A._b   // Error
A.a


//// [classStaticPropertyAccess.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    A.x = 1;
    A.y = 1;
    A._b = 2;
    return A;
}());
var a = new A();
a['y']; // Error
a.y; // Error
A._b; // Error
A.a;
