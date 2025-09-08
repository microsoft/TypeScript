//// [tests/cases/conformance/classes/classExpressions/classExpression3.ts] ////

//// [classExpression3.ts]
let C = class extends class extends class { a = 1 } { b = 2 } { c = 3 };
let c = new C();
c.a;
c.b;
c.c;


//// [classExpression3.js]
let C = class extends class extends class {
    a = 1;
} {
    b = 2;
} {
    c = 3;
};
let c = new C();
c.a;
c.b;
c.c;
