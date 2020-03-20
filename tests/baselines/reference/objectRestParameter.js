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
suddenly((_b) => {
    var { x: a } = _b, rest = __rest(_b, ["x"]);
    return rest.y;
});
suddenly((_c = { x: { z: 1, ka: 1 }, y: 'noo' }) => {
    var _d = _c.x, { z = 12 } = _d, nested = __rest(_d, ["z"]), rest = __rest(_c, ["x"]);
    return rest.y + nested.ka;
});
class C {
    m(_e) {
        var { a } = _e, clone = __rest(_e, ["a"]);
        // actually, never mind, don't clone
    }
    set p(_f) {
        var { a } = _f, clone = __rest(_f, ["a"]);
        // actually, never mind, don't clone
    }
}
function foobar(_g = {}) {
    var { bar = {} } = _g, opts = __rest(_g, ["bar"]);
}
foobar();
foobar({ baz: 'hello' });
foobar({ bar: { greeting: 'hello' } });
