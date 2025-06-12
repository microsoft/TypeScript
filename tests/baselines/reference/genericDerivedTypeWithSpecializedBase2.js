//// [tests/cases/compiler/genericDerivedTypeWithSpecializedBase2.ts] ////

//// [genericDerivedTypeWithSpecializedBase2.ts]
class A<T extends { length: number }> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

var x: A<{ length: number; foo: number }>;
var y: B<number>;
x = y;  // error


//// [genericDerivedTypeWithSpecializedBase2.js]
class A {
}
class B extends A {
}
var x;
var y;
x = y; // error
