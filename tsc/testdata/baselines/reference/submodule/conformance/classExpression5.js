//// [tests/cases/conformance/classes/classExpressions/classExpression5.ts] ////

//// [classExpression5.ts]
new class {
    hi() {
        return "Hi!";
    }
}().hi();

//// [classExpression5.js]
new class {
    hi() {
        return "Hi!";
    }
}().hi();
