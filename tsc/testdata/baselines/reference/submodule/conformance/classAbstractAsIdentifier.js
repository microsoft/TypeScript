//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractAsIdentifier.ts] ////

//// [classAbstractAsIdentifier.ts]
class abstract {
    foo() { return 1; }
}

new abstract;

//// [classAbstractAsIdentifier.js]
class abstract {
    foo() { return 1; }
}
new abstract;
