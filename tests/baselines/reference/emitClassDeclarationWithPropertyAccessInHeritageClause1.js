//// [tests/cases/conformance/es6/classDeclaration/emitClassDeclarationWithPropertyAccessInHeritageClause1.ts] ////

//// [emitClassDeclarationWithPropertyAccessInHeritageClause1.ts]
class B {}
function foo() {
    return {B: B};
}
class C extends (foo()).B {}

//// [emitClassDeclarationWithPropertyAccessInHeritageClause1.js]
class B {
}
function foo() {
    return { B: B };
}
class C extends (foo()).B {
}
