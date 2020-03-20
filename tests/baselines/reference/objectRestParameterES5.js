//// [objectRestParameterES5.ts]
function cloneAgain({ a, ...clone }: { a: number, b: string }): void {
}

declare function suddenly(f: (a: { x: { z, ka }, y: string }) => void);
suddenly(({ x: a, ...rest }) => rest.y);
suddenly(({ x: { z = 12, ...nested }, ...rest } = { x: { z: 1, ka: 1 }, y: 'noo' }) => rest.y + nested.ka);

class C {
    m({ a, ...clone }: { a: number, b: string}): void {
        // actually, never mind, don't clone
    }
    set p({ a, ...clone }: { a: number, b: string}) {
        // actually, never mind, don't clone
    }
}
function foobar({ bar={}, ...opts }: any = {}) {
}
foobar();
foobar({ baz: 'hello' });
foobar({ bar: { greeting: 'hello' } });


//// [objectRestParameterES5.js]
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
function cloneAgain(_a) {
    var a = _a.a, clone = __rest(_a, ["a"]);
}
suddenly(function (_b) {
    var a = _b.x, rest = __rest(_b, ["x"]);
    return rest.y;
});
suddenly(function (_c) {
    if (_c === void 0) { _c = { x: { z: 1, ka: 1 }, y: 'noo' }; }
    var _d = _c.x, _e = _d.z, z = _e === void 0 ? 12 : _e, nested = __rest(_d, ["z"]), rest = __rest(_c, ["x"]);
    return rest.y + nested.ka;
});
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function (_f) {
        var a = _f.a, clone = __rest(_f, ["a"]);
        // actually, never mind, don't clone
    };
    Object.defineProperty(C.prototype, "p", {
        set: function (_g) {
            var a = _g.a, clone = __rest(_g, ["a"]);
            // actually, never mind, don't clone
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
function foobar(_h) {
    if (_h === void 0) { _h = {}; }
    var _j = _h.bar, bar = _j === void 0 ? {} : _j, opts = __rest(_h, ["bar"]);
}
foobar();
foobar({ baz: 'hello' });
foobar({ bar: { greeting: 'hello' } });
