//// [objectRestParameter.ts]
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


//// [objectRestParameter.js]
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
    var { a } = _a, clone = __rest(_a, ["a"]);
}
suddenly((_a) => {
    var { x: a } = _a, rest = __rest(_a, ["x"]);
    return rest.y;
});
suddenly((_a = { x: { z: 1, ka: 1 }, y: 'noo' }) => {
    var _b = _a.x, { z = 12 } = _b, nested = __rest(_b, ["z"]), rest = __rest(_a, ["x"]);
    return rest.y + nested.ka;
});
class C {
    m(_a) {
        var { a } = _a, clone = __rest(_a, ["a"]);
        // actually, never mind, don't clone
    }
    set p(_a) {
        var { a } = _a, clone = __rest(_a, ["a"]);
        // actually, never mind, don't clone
    }
}
function foobar(_a = {}) {
    var { bar = {} } = _a, opts = __rest(_a, ["bar"]);
}
foobar();
foobar({ baz: 'hello' });
foobar({ bar: { greeting: 'hello' } });
