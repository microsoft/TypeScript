//// [tests/cases/compiler/arrayReferenceWithoutTypeArgs.ts] ////

//// [arrayReferenceWithoutTypeArgs.ts]
class X {
    public f(a: Array) { }
}

//// [arrayReferenceWithoutTypeArgs.js]
class X {
    f(a) { }
}
