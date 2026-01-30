//// [tests/cases/compiler/switchAssignmentCompat.ts] ////

//// [switchAssignmentCompat.ts]
class Foo { }

switch (0) {
    case Foo: break; // Error expected
}


//// [switchAssignmentCompat.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
switch (0) {
    case Foo: break; // Error expected
}
