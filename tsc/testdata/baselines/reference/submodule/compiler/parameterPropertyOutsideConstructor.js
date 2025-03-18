//// [tests/cases/compiler/parameterPropertyOutsideConstructor.ts] ////

//// [parameterPropertyOutsideConstructor.ts]
class C {
    foo(public x) {
    }
}

//// [parameterPropertyOutsideConstructor.js]
class C {
    foo(x) {
    }
}
