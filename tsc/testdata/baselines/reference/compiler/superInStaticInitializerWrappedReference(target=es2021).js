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
var _a, _b;
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
    value: (Reflect.get(_b, "m", _a))()
});
Object.defineProperty(D, "c", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a)()
});
Object.defineProperty(D, "d", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a)()
});
Object.defineProperty(D, "e", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a)()
});
Object.defineProperty(D, "f", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a)()
});
Object.defineProperty(D, "g", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.get(_b, "m", _a))?.()
});
Object.defineProperty(D, "h", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a).call(_a)
});
Object.defineProperty(D, "i", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "m", _a)()
});
Object.defineProperty(D, "j", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.get(_b, "t", _a)) `x`
});
Object.defineProperty(D, "k", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "t", _a) `x`
});
Object.defineProperty(D, "l", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: ((Reflect.get(_b, "x", _a)) = 1)
});
(() => {
    Reflect.get(_b, "x", _a) = 1;
    Reflect.get(_b, "x", _a) = 2;
    Reflect.get(_b, "x", _a) = 3;
    Reflect.get(_b, "x", _a) += 1;
    Reflect.get(_b, "x", _a)++;
    --Reflect.get(_b, "x", _a);
    [(Reflect.get(_b, "x", _a))] = [1];
    [Reflect.get(_b, "x", _a)] = [2];
    ({ a: Reflect.get(_b, "x", _a) } = { a: 3 });
    [(Reflect.get(_b, "x", _a)) = 4] = [];
    ({ a: Reflect.get(_b, "x", _a) = 5 } = {});
    [, ...Reflect.get(_b, "x", _a)] = [0, 1];
    ({ ...Reflect.get(_b, "x", _a) } = {});
})();
