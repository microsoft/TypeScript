//// [tests/cases/compiler/classDeclarationCheckUsedBeforeDefinitionInFunctionDeclaration.ts] ////

//// [classDeclarationCheckUsedBeforeDefinitionInFunctionDeclaration.ts]
function f() {
    new C2(); // OK
}    
class C2 { }

//// [classDeclarationCheckUsedBeforeDefinitionInFunctionDeclaration.js]
"use strict";
function f() {
    new C2(); // OK
}
class C2 {
}
