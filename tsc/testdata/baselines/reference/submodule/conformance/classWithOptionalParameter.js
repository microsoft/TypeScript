//// [tests/cases/conformance/types/namedTypes/classWithOptionalParameter.ts] ////

//// [classWithOptionalParameter.ts]
// classes do not permit optional parameters, these are errors

class C {
    x?: string;
    f?() {}
}

class C2<T> {
    x?: T;
    f?(x: T) {}
}

//// [classWithOptionalParameter.js]
class C {
    x;
    f() { }
}
class C2 {
    x;
    f(x) { }
}
