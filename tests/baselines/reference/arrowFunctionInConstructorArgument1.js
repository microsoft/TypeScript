//// [tests/cases/compiler/arrowFunctionInConstructorArgument1.ts] ////

//// [arrowFunctionInConstructorArgument1.ts]
class C {
    constructor(x: () => void) { }
}
var c = new C(() => { return asdf; } ) // should error


//// [arrowFunctionInConstructorArgument1.js]
"use strict";
class C {
    constructor(x) { }
}
var c = new C(() => { return asdf; }); // should error
