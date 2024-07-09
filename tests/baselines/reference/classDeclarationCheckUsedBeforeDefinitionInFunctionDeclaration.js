//// [tests/cases/compiler/classDeclarationCheckUsedBeforeDefinitionInFunctionDeclaration.ts] ////

//// [classDeclarationCheckUsedBeforeDefinitionInFunctionDeclaration.ts]
function f() {
    new C2(); // OK
}    
class C2 { }

//// [classDeclarationCheckUsedBeforeDefinitionInFunctionDeclaration.js]
function f() {
    new C2(); // OK
}
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
