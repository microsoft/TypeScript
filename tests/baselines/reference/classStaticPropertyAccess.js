//// [tests/cases/compiler/classStaticPropertyAccess.ts] ////

//// [classStaticPropertyAccess.ts]
class A {
    public static "\""() {}
    public static x: number = 1;
    public static y: number = 1;
    private static _b: number = 2;
}

const a = new A();

a["\""] // Error
a['y']  // Error
a.y     // Error
A._b    // Error
A.a


//// [classStaticPropertyAccess.js]
"use strict";
class A {
    static "\""() { }
}
A.x = 1;
A.y = 1;
A._b = 2;
const a = new A();
a["\""]; // Error
a['y']; // Error
a.y; // Error
A._b; // Error
A.a;
