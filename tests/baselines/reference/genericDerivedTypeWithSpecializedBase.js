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
}
class B extends A {
}
var x;
var y;
x = y; // error
