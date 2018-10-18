interface A {
    pred(x: {}, y: {}): x is boolean;
}
interface B {
    pred(x: {}, y: {}): y is string;
}

type Or = A | B;

function f(o: Or, x: {}, y: {}) {
    if (o.pred(x, y)) {
        x;
        y;
    }
}
