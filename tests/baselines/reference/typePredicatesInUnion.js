//// [tests/cases/compiler/typePredicatesInUnion.ts] ////

//// [typePredicatesInUnion.ts]
interface A {
    pred(x: {}): x is boolean;
}
interface B {
    pred(x: {}): x is string;
}

type Or = A | B;

function f(o: Or, x: {}) {
    if (o.pred(x)) {
        x;
    }
}


//// [typePredicatesInUnion.js]
function f(o, x) {
    if (o.pred(x)) {
        x;
    }
}
