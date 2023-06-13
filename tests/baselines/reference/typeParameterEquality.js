//// [tests/cases/compiler/typeParameterEquality.ts] ////

//// [typeParameterEquality.ts]
class C {
    get x(): <T>(a: T) => T { return null; }
    set x(p: <U>(a: U) => U) {}
}

//// [typeParameterEquality.js]
class C {
    get x() { return null; }
    set x(p) { }
}
