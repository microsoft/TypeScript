//// [tests/cases/compiler/blockScopedClassDeclarationAcrossFiles.ts] ////

//// [c.ts]
let foo: typeof C;
//// [b.ts]
class C { }


//// [foo.js]
var foo;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
