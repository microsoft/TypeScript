//// [tests/cases/compiler/genericDerivedTypeWithSpecializedBase.ts] ////

//// [genericDerivedTypeWithSpecializedBase.ts]
class A<T> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

var x: A<number>;
var y: B<number>;
x = y;  // error


//// [genericDerivedTypeWithSpecializedBase.js]
class A {
    x;
}
class B extends A {
    y;
}
var x;
var y;
x = y; // error
