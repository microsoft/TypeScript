//// [tests/cases/conformance/es6/destructuring/destructuringParameterProperties3.ts] ////

//// [destructuringParameterProperties3.ts]
class C1<T, U, V> {
    constructor(private k: T, private [a, b, c]: [T,U,V]) {
        if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
            this.a = a || k;
        }
    }

    public getA() {
        return this.a
    }

    public getB() {
        return this.b
    }

    public getC() {
        return this.c;
    }
}

var x = new C1(undefined, [0, true, ""]);
var [x_a, x_b, x_c] = [x.getA(), x.getB(), x.getC()];

var y = new C1(10, [0, true, true]);
var [y_a, y_b, y_c] = [y.getA(), y.getB(), y.getC()];

var z = new C1(10, [undefined, "", ""]);
var [z_a, z_b, z_c] = [z.getA(), z.getB(), z.getC()];

var w = new C1(10, [undefined, undefined, undefined]);
var [z_a, z_b, z_c] = [z.getA(), z.getB(), z.getC()];


//// [destructuringParameterProperties3.js]
class C1 {
    k;
    constructor(k, [a, b, c]) {
        this.k = k;
        if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
            this.a = a || k;
        }
    }
    getA() {
        return this.a;
    }
    getB() {
        return this.b;
    }
    getC() {
        return this.c;
    }
}
var x = new C1(undefined, [0, true, ""]);
var [x_a, x_b, x_c] = [x.getA(), x.getB(), x.getC()];
var y = new C1(10, [0, true, true]);
var [y_a, y_b, y_c] = [y.getA(), y.getB(), y.getC()];
var z = new C1(10, [undefined, "", ""]);
var [z_a, z_b, z_c] = [z.getA(), z.getB(), z.getC()];
var w = new C1(10, [undefined, undefined, undefined]);
var [z_a, z_b, z_c] = [z.getA(), z.getB(), z.getC()];
