//// [computedPropertyNames12_ES6.ts]
var s: string;
var n: number;
var a: any;
class C {
    [s]: number;
    [n] = n;
    static [s + s]: string;
    [s + n] = 2;
    [+s]: typeof s;
    static [""]: number;
    [0]: number;
    [a]: number;
    static [<any>true]: number;
    [`hello bye`] = 0;
    static [`hello ${a} bye`] = 0
}

//// [computedPropertyNames12_ES6.js]
var s;
var n;
var a;
const C = /** @class */ (() => {
    var _a, _b, _c;
    class C {
        constructor() {
            this[_a] = n;
            this[_b] = 2;
            this[`hello bye`] = 0;
        }
    }
    _a = n, s + s, _b = s + n, +s, _c = `hello ${a} bye`;
    C[_c] = 0;
    return C;
})();
