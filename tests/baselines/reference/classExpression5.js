//// [tests/cases/conformance/classes/classExpressions/classExpression5.ts] ////

//// [classExpression5.ts]
new class {
    hi() {
        return "Hi!";
    }
}().hi();

//// [classExpression5.js]
"use strict";
new class {
    hi() {
        return "Hi!";
    }
}().hi();
