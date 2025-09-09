//// [tests/cases/compiler/importedModuleAddToGlobal.ts] ////

//// [importedModuleAddToGlobal.ts]
// Binding for an import statement in a typeref position is being added to the global scope
// Shouldn't compile b.B is not defined in C
namespace A {
    import b = B;
    import c = C;
}

namespace B {
    import a = A;
    export class B { }
}

namespace C {
    import a = A;
    function hello(): b.B { return null; }
}

//// [importedModuleAddToGlobal.js]
var B;
(function (B_1) {
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    B_1.B = B;
})(B || (B = {}));
var C;
(function (C) {
    function hello() { return null; }
})(C || (C = {}));
