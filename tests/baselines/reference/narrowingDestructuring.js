//// [tests/cases/compiler/narrowingDestructuring.ts] ////

//// [narrowingDestructuring.ts]
type X = { kind: "a", a: string } | { kind: "b", b: string }

function func<T extends X>(value: T) {
    if (value.kind === "a") {
        value.a;
        const { a } = value;
    } else {
        value.b;
        const { b } = value;
    }
}

type Z = { kind: "f", f: { a: number, b: string, c: number } }
    | { kind: "g", g: { a: string, b: number, c: string }};

function func2<T extends Z>(value: T) {
    if (value.kind === "f") {
        const { f: f1 } = value;
        const { f: { a, ...spread } } = value;
        value.f;
    } else {
        const { g: { c, ...spread } } = value;
        value.g;
    }
}

function func3<T extends { kind: "a", a: string } | { kind: "b", b: number }>(t: T) {
    if (t.kind === "a") {
        const { kind, ...r1 } = t;
        const r2 = (({ kind, ...rest }) => rest)(t);
    }
}

function farr<T extends [number, string, string] | [string, number, number]>(x: T) {
    const [head, ...tail] = x;
    if (typeof x[0] === 'number') {
        const [head, ...tail] = x;
    }
}


//// [narrowingDestructuring.js]
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
function func(value) {
    if (value.kind === "a") {
        value.a;
        var a = value.a;
    }
    else {
        value.b;
        var b = value.b;
    }
}
function func2(value) {
    if (value.kind === "f") {
        var f1 = value.f;
        var _a = value.f, a = _a.a, spread = __rest(_a, ["a"]);
        value.f;
    }
    else {
        var _b = value.g, c = _b.c, spread = __rest(_b, ["c"]);
        value.g;
    }
}
function func3(t) {
    if (t.kind === "a") {
        var kind = t.kind, r1 = __rest(t, ["kind"]);
        var r2 = (function (_a) {
            var kind = _a.kind, rest = __rest(_a, ["kind"]);
            return rest;
        })(t);
    }
}
function farr(x) {
    var head = x[0], tail = x.slice(1);
    if (typeof x[0] === 'number') {
        var head_1 = x[0], tail_1 = x.slice(1);
    }
}
