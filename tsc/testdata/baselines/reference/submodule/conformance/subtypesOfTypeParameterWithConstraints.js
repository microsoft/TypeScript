//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypesOfTypeParameterWithConstraints.ts] ////

//// [subtypesOfTypeParameterWithConstraints.ts]
// checking whether other types are subtypes of type parameters with constraints

class C3<T> {
    foo: T;
}

class D1<T extends U, U> extends C3<T> {
    [x: string]: T;
    foo: T; // ok
}

class D2<T extends U, U> extends C3<U> {
    [x: string]: U;
    foo: T; // ok
}

class D3<T extends U, U> extends C3<T> {
    [x: string]: T;
    foo: U; // error
}

class D4<T extends U, U> extends C3<U> {
    [x: string]: U;
    foo: U; // ok
}


// V > U > T
// test if T is subtype of T, U, V
// should all work
class D5<T extends U, U extends V, V> extends C3<T> {
    [x: string]: T;
    foo: T; // ok
}

class D6<T extends U, U extends V, V> extends C3<U> {
    [x: string]: U;
    foo: T;
}

class D7<T extends U, U extends V, V> extends C3<V> {
    [x: string]: V;
    foo: T; // ok
}

// test if U is a subtype of T, U, V
// only a subtype of V and itself
class D8<T extends U, U extends V, V> extends C3<T> {
    [x: string]: T;
    foo: U; // error
}

class D9<T extends U, U extends V, V> extends C3<U> {
    [x: string]: U;
    foo: U; // ok
}

class D10<T extends U, U extends V, V> extends C3<V> {
    [x: string]: V;
    foo: U; // ok
}

// test if V is a subtype of T, U, V
// only a subtype of itself
class D11<T extends U, U extends V, V> extends C3<T> {
    [x: string]: T;
    foo: V; // error
}

class D12<T extends U, U extends V, V> extends C3<U> {
    [x: string]: U;
    foo: V; // error
}

class D13<T extends U, U extends V, V> extends C3<V> {
    [x: string]: V;
    foo: V; // ok
}

// Date > V > U > T
// test if T is subtype of T, U, V, Date
// should all work
class D14<T extends U, U extends V, V extends Date> extends C3<Date> {
    [x: string]: Date;
    foo: T; // ok
}

class D15<T extends U, U extends V, V extends Date> extends C3<T> {
    [x: string]: T;
    foo: T; // ok
}

class D16<T extends U, U extends V, V extends Date> extends C3<U> {
    [x: string]: U;
    foo: T;
}

class D17<T extends U, U extends V, V extends Date> extends C3<V> {
    [x: string]: V;
    foo: T;
}

// test if U is a subtype of T, U, V, Date
// only a subtype of V, Date and itself
class D18<T extends U, U extends V, V extends Date> extends C3<Date> {
    [x: string]: Date;
    foo: T; // ok
}

class D19<T extends U, U extends V, V extends Date> extends C3<T> {
    [x: string]: T;
    foo: U; // error
}

class D20<T extends U, U extends V, V extends Date> extends C3<U> {
    [x: string]: U;
    foo: U; // ok
}

class D21<T extends U, U extends V, V extends Date> extends C3<V> {
    [x: string]: V;
    foo: U;
}

// test if V is a subtype of T, U, V, Date
// only a subtype of itself and Date
class D22<T extends U, U extends V, V extends Date> extends C3<Date> {
    [x: string]: Date;
    foo: T; // ok
}

class D23<T extends U, U extends V, V extends Date> extends C3<T> {
    [x: string]: T;
    foo: V; // error
}

class D24<T extends U, U extends V, V extends Date> extends C3<U> {
    [x: string]: U;
    foo: V; // error
}

class D25<T extends U, U extends V, V extends Date> extends C3<V> {
    [x: string]: V;
    foo: V; // ok
}

// test if Date is a subtype of T, U, V, Date
// only a subtype of itself
class D26<T extends U, U extends V, V extends Date> extends C3<Date> {
    [x: string]: Date;
    foo: Date; // ok
}

class D27<T extends U, U extends V, V extends Date> extends C3<T> {
    [x: string]: T;
    foo: Date; // error
}

class D28<T extends U, U extends V, V extends Date> extends C3<U> {
    [x: string]: U;
    foo: Date; // error
}

class D29<T extends U, U extends V, V extends Date> extends C3<V> {
    [x: string]: V;
    foo: Date; // error
}

//// [subtypesOfTypeParameterWithConstraints.js]
// checking whether other types are subtypes of type parameters with constraints
class C3 {
    foo;
}
class D1 extends C3 {
    foo; // ok
}
class D2 extends C3 {
    foo; // ok
}
class D3 extends C3 {
    foo; // error
}
class D4 extends C3 {
    foo; // ok
}
// V > U > T
// test if T is subtype of T, U, V
// should all work
class D5 extends C3 {
    foo; // ok
}
class D6 extends C3 {
    foo;
}
class D7 extends C3 {
    foo; // ok
}
// test if U is a subtype of T, U, V
// only a subtype of V and itself
class D8 extends C3 {
    foo; // error
}
class D9 extends C3 {
    foo; // ok
}
class D10 extends C3 {
    foo; // ok
}
// test if V is a subtype of T, U, V
// only a subtype of itself
class D11 extends C3 {
    foo; // error
}
class D12 extends C3 {
    foo; // error
}
class D13 extends C3 {
    foo; // ok
}
// Date > V > U > T
// test if T is subtype of T, U, V, Date
// should all work
class D14 extends C3 {
    foo; // ok
}
class D15 extends C3 {
    foo; // ok
}
class D16 extends C3 {
    foo;
}
class D17 extends C3 {
    foo;
}
// test if U is a subtype of T, U, V, Date
// only a subtype of V, Date and itself
class D18 extends C3 {
    foo; // ok
}
class D19 extends C3 {
    foo; // error
}
class D20 extends C3 {
    foo; // ok
}
class D21 extends C3 {
    foo;
}
// test if V is a subtype of T, U, V, Date
// only a subtype of itself and Date
class D22 extends C3 {
    foo; // ok
}
class D23 extends C3 {
    foo; // error
}
class D24 extends C3 {
    foo; // error
}
class D25 extends C3 {
    foo; // ok
}
// test if Date is a subtype of T, U, V, Date
// only a subtype of itself
class D26 extends C3 {
    foo; // ok
}
class D27 extends C3 {
    foo; // error
}
class D28 extends C3 {
    foo; // error
}
class D29 extends C3 {
    foo; // error
}
