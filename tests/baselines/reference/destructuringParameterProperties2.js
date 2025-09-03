//// [tests/cases/conformance/es6/destructuring/destructuringParameterProperties2.ts] ////

//// [destructuringParameterProperties2.ts]
class C1 {
    constructor(private k: number, private [a, b, c]: [number, string, boolean]) {
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

var x = new C1(undefined, [0, undefined, ""]);
var [x_a, x_b, x_c] = [x.getA(), x.getB(), x.getC()];

var y = new C1(10, [0, "", true]);
var [y_a, y_b, y_c] = [y.getA(), y.getB(), y.getC()];

var z = new C1(10, [undefined, "", null]);
var [z_a, z_b, z_c] = [z.getA(), z.getB(), z.getC()];


//// [destructuringParameterProperties2.js]
class C1 {
    k;
    [a, b, c];
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
var x = new C1(undefined, [0, undefined, ""]);
var [x_a, x_b, x_c] = [x.getA(), x.getB(), x.getC()];
var y = new C1(10, [0, "", true]);
var [y_a, y_b, y_c] = [y.getA(), y.getB(), y.getC()];
var z = new C1(10, [undefined, "", null]);
var [z_a, z_b, z_c] = [z.getA(), z.getB(), z.getC()];
