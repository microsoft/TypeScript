//// [tests/cases/compiler/assignmentToReferenceTypes.ts] ////

//// [assignmentToReferenceTypes.ts]
// Should all be allowed

namespace M {
}
M = null;

class C {
}
C = null;

enum E {
}
E = null;

function f() { }
f = null;

var x = 1;
x = null;

function g(x) {
    x = null;
}

//// [assignmentToReferenceTypes.js]
"use strict";
// Should all be allowed
M = null;
class C {
}
C = null;
var E;
(function (E) {
})(E || (E = {}));
E = null;
function f() { }
f = null;
var x = 1;
x = null;
function g(x) {
    x = null;
}
