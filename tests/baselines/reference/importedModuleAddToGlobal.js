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
var B = B || (B = {});
(function (B_1) {
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    B_1.B = B;
})(B);
var C = C || (C = {});
(function (C) {
    function hello() { return null; }
})(C);
