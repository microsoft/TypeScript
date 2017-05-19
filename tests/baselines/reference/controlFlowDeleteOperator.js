//// [controlFlowDeleteOperator.ts]
function f() {
    let x: { a?: number | string, b: number | string } = { b: 1 };
    x.a;
    x.b;
    x.a = 1;
    x.b = 1;
    x.a;
    x.b;
    delete x.a;
    delete x.b;
    x.a;
    x.b;
    x;
    delete x;  // No effect
    x;
}

//// [controlFlowDeleteOperator.js]
function f() {
    var x = { b: 1 };
    x.a;
    x.b;
    x.a = 1;
    x.b = 1;
    x.a;
    x.b;
    delete x.a;
    delete x.b;
    x.a;
    x.b;
    x;
    delete x; // No effect
    x;
}
