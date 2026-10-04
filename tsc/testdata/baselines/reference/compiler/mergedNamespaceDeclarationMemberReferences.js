//// [tests/cases/compiler/mergedNamespaceDeclarationMemberReferences.ts] ////

//// [mergedNamespaceDeclarationMemberReferences.ts]
// Unqualified namespace member references across merged namespace declarations
namespace N {
    export const x = 1;
    export function fn() {
        return 42;
    }
    export class A {
        method() {
            console.log("A.method");
        }
    }
}

namespace N {
    export const y = x;
    fn();
    export class B extends A {
        override method() {
            console.log("B.method");
        }
    }
    const a = new A();
}


//// [mergedNamespaceDeclarationMemberReferences.js]
"use strict";
// Unqualified namespace member references across merged namespace declarations
var N;
(function (N) {
    N.x = 1;
    function fn() {
        return 42;
    }
    N.fn = fn;
    class A {
        method() {
            console.log("A.method");
        }
    }
    N.A = A;
})(N || (N = {}));
(function (N) {
    N.y = N.x;
    N.fn();
    class B extends N.A {
        method() {
            console.log("B.method");
        }
    }
    N.B = B;
    const a = new N.A();
})(N || (N = {}));
