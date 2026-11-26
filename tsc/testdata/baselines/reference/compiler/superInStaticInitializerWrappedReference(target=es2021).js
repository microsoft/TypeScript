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
var _a, _b, _c;
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
class D extends (_b = B) {
}
_a = D;
Object.defineProperty(D, "a", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a).call(_a)
});
Object.defineProperty(D, "b", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.get(_b, "m", _a)).call(_a)
});
Object.defineProperty(D, "c", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a).call(_a)
});
Object.defineProperty(D, "d", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a).call(_a)
});
Object.defineProperty(D, "e", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a).call(_a)
});
Object.defineProperty(D, "f", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a).call(_a)
});
Object.defineProperty(D, "g", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.get(_b, "m", _a))?.call(_a)
});
Object.defineProperty(D, "h", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a)?.call(_a)
});
Object.defineProperty(D, "i", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a).call(_a)
});
Object.defineProperty(D, "j", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.get(_b, "t", _a)).bind(_a) `x`
});
Object.defineProperty(D, "k", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "t", _a).bind(_a) `x`
});
Object.defineProperty(D, "l", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.set(_b, "x", _c = 1, _a), _c)
});
(() => {
    var _c, _d;
    Reflect.set(_b, "x", 1, _a);
    Reflect.set(_b, "x", 2, _a);
    Reflect.set(_b, "x", 3, _a);
    Reflect.set(_b, "x", Reflect.get(_b, "x", _a) + 1, _a);
    Reflect.set(_b, "x", (_c = Reflect.get(_b, "x", _a), _c++, _c), _a);
    Reflect.set(_b, "x", (_d = Reflect.get(_b, "x", _a), --_d), _a);
    [({ set value(_c) { Reflect.set(_b, "x", _c, _a); } }).value] = [1];
    [({ set value(_c) { Reflect.set(_b, "x", _c, _a); } }).value] = [2];
    ({ a: ({ set value(_c) { Reflect.set(_b, "x", _c, _a); } }).value } = { a: 3 });
    [({ set value(_c) { Reflect.set(_b, "x", _c, _a); } }).value = 4] = [];
    ({ a: ({ set value(_c) { Reflect.set(_b, "x", _c, _a); } }).value = 5 } = {});
    [, ...({ set value(_c) { Reflect.set(_b, "x", _c, _a); } }).value] = [0, 1];
    ({ ...({ set value(_c) { Reflect.set(_b, "x", _c, _a); } }).value } = {});
})();
