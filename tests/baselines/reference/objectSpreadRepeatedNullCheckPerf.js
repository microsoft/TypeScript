//// [tests/cases/conformance/types/spread/objectSpreadRepeatedNullCheckPerf.ts] ////

//// [objectSpreadRepeatedNullCheckPerf.ts]
interface Props {
    readonly a?: string
    readonly b?: string
    readonly c?: string
    readonly d?: string
    readonly e?: string
    readonly f?: string
    readonly g?: string
    readonly h?: string
    readonly i?: string
    readonly j?: string
    readonly k?: string
    readonly l?: string
    readonly m?: string
    readonly n?: string
    readonly o?: string
    readonly p?: string
    readonly q?: string
    readonly r?: string
    readonly s?: string
    readonly t?: string
    readonly u?: string
    readonly v?: string
    readonly w?: string
    readonly x?: string
    readonly y?: string
    readonly z?: string
}

function parseWithSpread(config: Record<string, number>): Props {
    return {
        ...config.a !== undefined && { a: config.a.toString() },
        ...config.b !== undefined && { b: config.b.toString() },
        ...config.c !== undefined && { c: config.c.toString() },
        ...config.d !== undefined && { d: config.d.toString() },
        ...config.e !== undefined && { e: config.e.toString() },
        ...config.f !== undefined && { f: config.f.toString() },
        ...config.g !== undefined && { g: config.g.toString() },
        ...config.h !== undefined && { h: config.h.toString() },
        ...config.i !== undefined && { i: config.i.toString() },
        ...config.j !== undefined && { j: config.j.toString() },
        ...config.k !== undefined && { k: config.k.toString() },
        ...config.l !== undefined && { l: config.l.toString() },
        ...config.m !== undefined && { m: config.m.toString() },
        ...config.n !== undefined && { n: config.n.toString() },
        ...config.o !== undefined && { o: config.o.toString() },
        ...config.p !== undefined && { p: config.p.toString() },
        ...config.q !== undefined && { q: config.q.toString() },
        ...config.r !== undefined && { r: config.r.toString() },
        ...config.s !== undefined && { s: config.s.toString() },
        ...config.t !== undefined && { t: config.t.toString() },
        ...config.u !== undefined && { u: config.u.toString() },
        ...config.v !== undefined && { v: config.v.toString() },
        ...config.w !== undefined && { w: config.w.toString() },
        ...config.x !== undefined && { x: config.x.toString() },
        ...config.y !== undefined && { y: config.y.toString() },
        ...config.z !== undefined && { z: config.z.toString() }
    }
}

parseWithSpread({ a: 1, b: 2, z: 26 })

//// [objectSpreadRepeatedNullCheckPerf.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function parseWithSpread(config) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, config.a !== undefined && { a: config.a.toString() }), config.b !== undefined && { b: config.b.toString() }), config.c !== undefined && { c: config.c.toString() }), config.d !== undefined && { d: config.d.toString() }), config.e !== undefined && { e: config.e.toString() }), config.f !== undefined && { f: config.f.toString() }), config.g !== undefined && { g: config.g.toString() }), config.h !== undefined && { h: config.h.toString() }), config.i !== undefined && { i: config.i.toString() }), config.j !== undefined && { j: config.j.toString() }), config.k !== undefined && { k: config.k.toString() }), config.l !== undefined && { l: config.l.toString() }), config.m !== undefined && { m: config.m.toString() }), config.n !== undefined && { n: config.n.toString() }), config.o !== undefined && { o: config.o.toString() }), config.p !== undefined && { p: config.p.toString() }), config.q !== undefined && { q: config.q.toString() }), config.r !== undefined && { r: config.r.toString() }), config.s !== undefined && { s: config.s.toString() }), config.t !== undefined && { t: config.t.toString() }), config.u !== undefined && { u: config.u.toString() }), config.v !== undefined && { v: config.v.toString() }), config.w !== undefined && { w: config.w.toString() }), config.x !== undefined && { x: config.x.toString() }), config.y !== undefined && { y: config.y.toString() }), config.z !== undefined && { z: config.z.toString() });
}
parseWithSpread({ a: 1, b: 2, z: 26 });
