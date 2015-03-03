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
var C1 = (function () {
    function C1(k, _a) {
        var a = _a[0], b = _a[1], c = _a[2];
        this.k = k;
        this.[a, b, c] = [a, b, c];
        if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
            this.a = a || k;
        }
    }
    C1.prototype.getA = function () {
        return this.a;
    };
    C1.prototype.getB = function () {
        return this.b;
    };
    C1.prototype.getC = function () {
        return this.c;
    };
    return C1;
})();
var x = new C1(undefined, [0, true, ""]);
var _a = [x.getA(), x.getB(), x.getC()], x_a = _a[0], x_b = _a[1], x_c = _a[2];
var y = new C1(10, [0, true, true]);
var _a_1 = [y.getA(), y.getB(), y.getC()], y_a = _a_1[0], y_b = _a_1[1], y_c = _a_1[2];
var z = new C1(10, [undefined, "", ""]);
var _a_2 = [z.getA(), z.getB(), z.getC()], z_a = _a_2[0], z_b = _a_2[1], z_c = _a_2[2];
var w = new C1(10, [undefined, undefined, undefined]);
var _a_3 = [z.getA(), z.getB(), z.getC()], z_a = _a_3[0], z_b = _a_3[1], z_c = _a_3[2];
