//// [destructuringUnspreadableIntoRest.ts]
class A {
    constructor(public normal: string) {}

    get getter(): number {
        return 1;
    }

    set setter(_v: number) {}

    method() {
        const {           ...rest1 } = this;
        const {           ...rest2 } = this as A;
        const { normal: _1, ...rest3 } = this;
        const { normal: _2, ...rest4 } = this as A;

        rest1.getter;
        rest2.getter;
        rest3.getter;
        rest4.getter;

        rest1.setter;
        rest2.setter;
        rest3.setter;
        rest4.setter;

        rest1.method;
        rest2.method;
        rest3.method;
        rest4.method;
    }
}

function destructure<T extends A>(x: T) {
    const {           ...rest1 } = x;
    const {           ...rest2 } = x as A;
    const { normal: _1, ...rest3 } = x;
    const { normal: _2, ...rest4 } = x as A;

    rest1.getter;
    rest2.getter;
    rest3.getter;
    rest4.getter;

    rest1.setter;
    rest2.setter;
    rest3.setter;
    rest4.setter;

    rest1.method;
    rest2.method;
    rest3.method;
    rest4.method;
}


//// [destructuringUnspreadableIntoRest.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var A = /** @class */ (function () {
    function A(normal) {
        this.normal = normal;
    }
    Object.defineProperty(A.prototype, "getter", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(A.prototype, "setter", {
        set: function (_v) { },
        enumerable: false,
        configurable: true
    });
    A.prototype.method = function () {
        var rest1 = __rest(this, []);
        var rest2 = __rest(this, []);
        var _a = this, _1 = _a.normal, rest3 = __rest(_a, ["normal"]);
        var _b = this, _2 = _b.normal, rest4 = __rest(_b, ["normal"]);
        rest1.getter;
        rest2.getter;
        rest3.getter;
        rest4.getter;
        rest1.setter;
        rest2.setter;
        rest3.setter;
        rest4.setter;
        rest1.method;
        rest2.method;
        rest3.method;
        rest4.method;
    };
    return A;
}());
function destructure(x) {
    var rest1 = __rest(x, []);
    var rest2 = __rest(x, []);
    var _1 = x.normal, rest3 = __rest(x, ["normal"]);
    var _a = x, _2 = _a.normal, rest4 = __rest(_a, ["normal"]);
    rest1.getter;
    rest2.getter;
    rest3.getter;
    rest4.getter;
    rest1.setter;
    rest2.setter;
    rest3.setter;
    rest4.setter;
    rest1.method;
    rest2.method;
    rest3.method;
    rest4.method;
}
