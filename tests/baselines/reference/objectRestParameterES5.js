//// [tests/cases/conformance/types/rest/objectRestParameterES5.ts] ////

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
suddenly(function (_a) {
    var a = _a.x, rest = __rest(_a, ["x"]);
    return rest.y;
});
suddenly(function (_a) {
    if (_a === void 0) { _a = { x: { z: 1, ka: 1 }, y: 'noo' }; }
    var _b = _a.x, _c = _b.z, z = _c === void 0 ? 12 : _c, nested = __rest(_b, ["z"]), rest = __rest(_a, ["x"]);
    return rest.y + nested.ka;
});
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function (_a) {
        var a = _a.a, clone = __rest(_a, ["a"]);
        // actually, never mind, don't clone
    };
    Object.defineProperty(C.prototype, "p", {
        set: function (_a) {
            var a = _a.a, clone = __rest(_a, ["a"]);
            // actually, never mind, don't clone
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
function foobar(_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.bar, bar = _b === void 0 ? {} : _b, opts = __rest(_a, ["bar"]);
}
foobar();
foobar({ baz: 'hello' });
foobar({ bar: { greeting: 'hello' } });
