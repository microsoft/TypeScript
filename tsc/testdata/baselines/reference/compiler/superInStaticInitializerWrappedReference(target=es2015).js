//// [tests/cases/compiler/superInStaticInitializerWrappedReference.ts] ////

//// [superInStaticInitializerWrappedReference.ts]
// A `super` property wrapped in parentheses, `!`, `as`, `satisfies` or a type assertion is still
// the same reference: calls must keep `this` and assignments must still go through `Reflect.set`.

class B {
    static x: any = 0;
    static m(): any { return this; }
    static t(..._: any[]): any { return this; }
}

class D extends B {
    static a = super.m();
    static b = (super.m)();
    static c = (super.m as any)();
    static d = super.m!();
    static e = (super.m satisfies any)();
    static f = (<any>super.m)();
    static g = (super.m)?.();
    static h = super.m?.();
    static i = (super["m"] as any)();
    static j = (super.t)`x`;
    static k = (super.t as any)`x`;
    static l = ((super.x) = 1);
    static {
        (super.x as any) = 1;
        super.x! = 2;
        (super["x"] satisfies any) = 3;
        (super.x as any) += 1;
        (super.x as any)++;
        --(super.x as any);
        [(super.x)] = [1];
        [super.x!] = [2];
        ({ a: (super.x as any) } = { a: 3 });
        [(super.x) = 4] = [];
        ({ a: (super["x"] as any) = 5 } = {});
        [, ...(super.x as any)] = [0, 1];
        ({ ...(super.x as any) } = {});
    }
}


//// [superInStaticInitializerWrappedReference.js]
"use strict";
// A `super` property wrapped in parentheses, `!`, `as`, `satisfies` or a type assertion is still
// the same reference: calls must keep `this` and assignments must still go through `Reflect.set`.
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
var _a, _b;
var _c, _d, _e;
class B {
    static m() { return this; }
    static t(..._) { return this; }
}
Object.defineProperty(B, "x", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
});
class D extends (_d = B) {
}
_c = D;
Object.defineProperty(D, "a", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_d, "m", _c).call(_c)
});
Object.defineProperty(D, "b", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.get(_d, "m", _c)).call(_c)
});
Object.defineProperty(D, "c", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_d, "m", _c).call(_c)
});
Object.defineProperty(D, "d", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_d, "m", _c).call(_c)
});
Object.defineProperty(D, "e", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_d, "m", _c).call(_c)
});
Object.defineProperty(D, "f", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_d, "m", _c).call(_c)
});
Object.defineProperty(D, "g", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (_a = (Reflect.get(_d, "m", _c))) === null || _a === void 0 ? void 0 : _a.call(_c)
});
Object.defineProperty(D, "h", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (_b = Reflect.get(_d, "m", _c)) === null || _b === void 0 ? void 0 : _b.call(_c)
});
Object.defineProperty(D, "i", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_d, "m", _c).call(_c)
});
Object.defineProperty(D, "j", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.get(_d, "t", _c)).bind(_c) `x`
});
Object.defineProperty(D, "k", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_d, "t", _c).bind(_c) `x`
});
Object.defineProperty(D, "l", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.set(_d, "x", _e = 1, _c), _e)
});
(() => {
    var _a, _b;
    Reflect.set(_d, "x", 1, _c);
    Reflect.set(_d, "x", 2, _c);
    Reflect.set(_d, "x", 3, _c);
    Reflect.set(_d, "x", Reflect.get(_d, "x", _c) + 1, _c);
    Reflect.set(_d, "x", (_a = Reflect.get(_d, "x", _c), _a++, _a), _c);
    Reflect.set(_d, "x", (_b = Reflect.get(_d, "x", _c), --_b), _c);
    [({ set value(_a) { Reflect.set(_d, "x", _a, _c); } }).value] = [1];
    [({ set value(_a) { Reflect.set(_d, "x", _a, _c); } }).value] = [2];
    ({ a: ({ set value(_a) { Reflect.set(_d, "x", _a, _c); } }).value } = { a: 3 });
    [({ set value(_a) { Reflect.set(_d, "x", _a, _c); } }).value = 4] = [];
    ({ a: ({ set value(_a) { Reflect.set(_d, "x", _a, _c); } }).value = 5 } = {});
    [, ...({ set value(_a) { Reflect.set(_d, "x", _a, _c); } }).value] = [0, 1];
    (({ set value(_a) { Reflect.set(_d, "x", _a, _c); } }).value = __rest({}, []));
})();
