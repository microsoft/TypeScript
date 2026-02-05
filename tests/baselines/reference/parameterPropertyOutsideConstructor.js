//// [tests/cases/compiler/parameterPropertyOutsideConstructor.ts] ////

//// [parameterPropertyOutsideConstructor.ts]
class C {
    foo(public x) {
    }
}

//// [parameterPropertyOutsideConstructor.js]
"use strict";
class C {
    foo(x) {
    }
}
