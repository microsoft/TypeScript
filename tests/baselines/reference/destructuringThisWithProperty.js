//// [destructuringThisWithProperty.ts]
class A {
    constructor(public foo: string) {}

    get bar(): number {
        return 1;
    }

    func() {
        const {           ...rest1 } = this;
        const {           ...rest2 } = this as A;
        const { foo: _f1, ...rest3 } = this;
        const { foo: _f2, ...rest4 } = this as A;

        // Rest destructuring drops properties provided by getters.
        // "bar" should not be present in any of these.
        rest1.bar;
        rest2.bar;
        rest3.bar;
        rest4.bar;
    }
}

function destructure<T extends A>(x: T) {
    const {           ...rest1 } = x;
    const {           ...rest2 } = x as A;
    const { foo: _f1, ...rest3 } = x;
    const { foo: _f2, ...rest4 } = x as A;

    // Rest destructuring drops properties provided by getters.
    // "bar" should not be present in any of these.
    rest1.bar;
    rest2.bar;
    rest3.bar;
    rest4.bar;
}


//// [destructuringThisWithProperty.js]
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
    function A(foo) {
        this.foo = foo;
    }
    Object.defineProperty(A.prototype, "bar", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    A.prototype.func = function () {
        var rest1 = __rest(this, []);
        var rest2 = __rest(this, []);
        var _a = this, _f1 = _a.foo, rest3 = __rest(_a, ["foo"]);
        var _b = this, _f2 = _b.foo, rest4 = __rest(_b, ["foo"]);
        // Rest destructuring drops properties provided by getters.
        // "bar" should not be present in any of these.
        rest1.bar;
        rest2.bar;
        rest3.bar;
        rest4.bar;
    };
    return A;
}());
function destructure(x) {
    var rest1 = __rest(x, []);
    var rest2 = __rest(x, []);
    var _f1 = x.foo, rest3 = __rest(x, ["foo"]);
    var _a = x, _f2 = _a.foo, rest4 = __rest(_a, ["foo"]);
    // Rest destructuring drops properties provided by getters.
    // "bar" should not be present in any of these.
    rest1.bar;
    rest2.bar;
    rest3.bar;
    rest4.bar;
}
