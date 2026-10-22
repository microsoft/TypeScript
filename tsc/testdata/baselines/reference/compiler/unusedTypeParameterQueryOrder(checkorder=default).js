//// [tests/cases/compiler/unusedTypeParameterQueryOrder.ts] ////

//// [unusedTypeParameterQueryOrder.ts]
class A {
    f() {
        return <T>() => {};
    }
}


//// [unusedTypeParameterQueryOrder.js]
"use strict";
class A {
    f() {
        return () => { };
    }
}
