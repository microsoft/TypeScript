//// [tests/cases/compiler/genericDerivedTypeWithSpecializedBase.ts] ////

//// [genericDerivedTypeWithSpecializedBase.ts]
class A<T> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

declare var x: A<number>;
declare var y: B<number>;
x = y;  // error


//// [genericDerivedTypeWithSpecializedBase.js]
"use strict";
class A {
    x;
}
class B extends A {
    y;
}
x = y; // error
