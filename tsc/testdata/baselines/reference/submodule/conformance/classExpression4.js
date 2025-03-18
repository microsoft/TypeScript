//// [tests/cases/conformance/classes/classExpressions/classExpression4.ts] ////

//// [classExpression4.ts]
let C = class {
    foo() {
        return new C();
    }
};
let x = (new C).foo();


//// [classExpression4.js]
let C = class {
    foo() {
        return new C();
    }
};
let x = (new C).foo();
