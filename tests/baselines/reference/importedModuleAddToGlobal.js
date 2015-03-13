//// [importedModuleAddToGlobal.ts]
// Binding for an import statement in a typeref position is being added to the global scope
// Shouldn't compile b.B is not defined in C
module A {
    import b = B;
    import c = C;
}

module B {
    import a = A;
    export class B { }
}

module C {
    import a = A;
    function hello(): b.B { return null; }
}

//// [importedModuleAddToGlobal.js]
var B;
(function (_B) {
    var B = (function () {
        function B() {
        }
        return B;
    })();
    _B.B = B;
})(B || (B = {}));
var C;
(function (C) {
    function hello() {
        return null;
    }
})(C || (C = {}));
