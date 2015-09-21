//// [exponentiationOperatorWithTypeParameter.ts]
// type parameter type is not valid for arithmetic operand
function foo<T>(t: T) {
    var a: any;
    var b: boolean;
    var c: number;
    var d: string;
    var e: {};

    var r1a1 = a ** t;
    var r2a1 = t ** a;
    var r1b1 = b ** t;
    var r2b1 = t ** b;
    var r1c1 = c ** t;
    var r2c1 = t ** c;
    var r1d1 = d ** t;
    var r2d1 = t ** d;
    var r1e1 = e ** t;
    var r2e1 = t ** d;
    var r1f1 = t ** t;
}

//// [exponentiationOperatorWithTypeParameter.js]
// type parameter type is not valid for arithmetic operand
function foo(t) {
    var a;
    var b;
    var c;
    var d;
    var e;
    var r1a1 = Math.pow(a, t);
    var r2a1 = Math.pow(t, a);
    var r1b1 = Math.pow(b, t);
    var r2b1 = Math.pow(t, b);
    var r1c1 = Math.pow(c, t);
    var r2c1 = Math.pow(t, c);
    var r1d1 = Math.pow(d, t);
    var r2d1 = Math.pow(t, d);
    var r1e1 = Math.pow(e, t);
    var r2e1 = Math.pow(t, d);
    var r1f1 = Math.pow(t, t);
}
