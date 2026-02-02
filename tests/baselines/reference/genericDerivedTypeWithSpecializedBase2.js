//// [tests/cases/compiler/genericDerivedTypeWithSpecializedBase2.ts] ////

//// [genericDerivedTypeWithSpecializedBase2.ts]
class A<T extends { length: number }> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

declare var x: A<{ length: number; foo: number }>;
declare var y: B<number>;
x = y;  // error


//// [genericDerivedTypeWithSpecializedBase2.js]
class A {
}
class B extends A {
}
x = y; // error
