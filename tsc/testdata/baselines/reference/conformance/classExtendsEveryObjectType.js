//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsEveryObjectType.ts] ////

//// [classExtendsEveryObjectType.ts]
interface I {
    foo: string;
}
class C extends I { } // error

class C2 extends { foo: string; } { } // error
declare var x: { foo: string; }
class C3 extends x { } // error

namespace M { export var x = 1; }
class C4 extends M { } // error

function foo() { }
class C5 extends foo { } // error

class C6 extends []{ } // error

//// [classExtendsEveryObjectType.js]
"use strict";
class C extends I {
} // error
class C2 extends { foo: string, } {
} // error
class C3 extends x {
} // error
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
class C4 extends M {
} // error
function foo() { }
class C5 extends foo {
} // error
class C6 extends [] {
} // error
