//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendingOptionalChain.ts] ////

//// [classExtendingOptionalChain.ts]
namespace A {
    export class B {}
}

// ok
class C1 extends A?.B {}

// error
class C2 implements A?.B {}


//// [classExtendingOptionalChain.js]
var A;
(function (A) {
    class B {
    }
    A.B = B;
})(A || (A = {}));
// ok
class C1 extends (A?.B) {
}
// error
class C2 {
}
