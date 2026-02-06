//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractAsIdentifier.ts] ////

//// [classAbstractAsIdentifier.ts]
class abstract {
    foo() { return 1; }
}

new abstract;

//// [classAbstractAsIdentifier.js]
"use strict";
class abstract {
    foo() { return 1; }
}
new abstract;
