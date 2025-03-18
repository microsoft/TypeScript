//// [tests/cases/compiler/destructuringWithNewExpression.ts] ////

//// [destructuringWithNewExpression.ts]
class C {
    x = 0;
}

var { x } = new C;

//// [destructuringWithNewExpression.js]
class C {
    x = 0;
}
var { x } = new C;
