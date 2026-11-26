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
class B {
    static x = 0;
    static m() { return this; }
    static t(..._) { return this; }
}
class D extends B {
    static a = super.m();
    static b = (super.m)();
    static c = super.m();
    static d = super.m();
    static e = super.m();
    static f = super.m();
    static g = (super.m)?.();
    static h = super.m?.();
    static i = super["m"]();
    static j = (super.t) `x`;
    static k = super.t `x`;
    static l = ((super.x) = 1);
    static {
        super.x = 1;
        super.x = 2;
        super["x"] = 3;
        super.x += 1;
        super.x++;
        --super.x;
        [(super.x)] = [1];
        [super.x] = [2];
        ({ a: super.x } = { a: 3 });
        [(super.x) = 4] = [];
        ({ a: super["x"] = 5 } = {});
        [, ...super.x] = [0, 1];
        ({ ...super.x } = {});
    }
}
