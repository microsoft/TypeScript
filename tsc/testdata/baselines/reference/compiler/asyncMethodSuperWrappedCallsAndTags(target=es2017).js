//// [tests/cases/compiler/asyncMethodSuperWrappedCallsAndTags.ts] ////

//// [asyncMethodSuperWrappedCallsAndTags.ts]
// https://github.com/microsoft/TypeScript/issues/65641
// Inside a lowered async body, a `super` member call or tag keeps `this` as its receiver,
// and a `super` member written through any outer expression gets a setter, whatever
// parentheses, type assertions or non-null assertions wrap the reference.

class B {
    m(..._: unknown[]): any { }
    get x(): any { return 0; }
    set x(v: any) { }
    static sm(..._: unknown[]): any { }
}

class C extends B {
    async calls() {
        super.m();
        (super.m)();
        ((super.m))();
        (super.m as any)();
        (super.m satisfies unknown as any)();
        super.m!();
        (<any>super.m)();
        (super.m as any)(await 0);
        super["m"]();
        (super["m"])();
        (super["m"] as any)();
        super["m"]!();
    }

    async tags() {
        super.m`t`;
        (super.m)`t`;
        (super.m as any)`t${await 0}`;
        super.m!`t`;
        super["m"]`t`;
        (super["m"] as any)`t`;
    }

    async assignAs() {
        (super.x as any) = 1;
    }

    async assignSatisfies() {
        (super.x satisfies any) = 1;
    }

    async assignNonNull() {
        super.x! = 1;
    }

    async assignTypeAssertion() {
        (<any>super.x) = 1;
    }

    async compoundAs() {
        (super.x as any) += 1;
    }

    async incrementNonNull() {
        super.x!++;
    }

    async destructuringWrapped() {
        [(super.x as any)] = [1];
        ({ a: super.x! } = { a: 1 });
    }

    async elementAssignAs() {
        (super["x"] as any) = 1;
    }

    async *asyncGenerator() {
        (super.m as any)();
        super.m`t`;
    }

    async *assignAsyncGenerator() {
        (super.x as any) = 1;
    }

    static async staticCalls() {
        (super.sm as any)();
        super.sm`t`;
    }
}


//// [asyncMethodSuperWrappedCallsAndTags.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/65641
// Inside a lowered async body, a `super` member call or tag keeps `this` as its receiver,
// and a `super` member written through any outer expression gets a setter, whatever
// parentheses, type assertions or non-null assertions wrap the reference.
class B {
    m(..._) { }
    get x() { return 0; }
    set x(v) { }
    static sm(..._) { }
}
class C extends B {
    async calls() {
        super.m();
        (super.m)();
        ((super.m))();
        super.m();
        super.m();
        super.m();
        super.m();
        super.m(await 0);
        super["m"]();
        (super["m"])();
        super["m"]();
        super["m"]();
    }
    async tags() {
        super.m `t`;
        (super.m) `t`;
        super.m `t${await 0}`;
        super.m `t`;
        super["m"] `t`;
        super["m"] `t`;
    }
    async assignAs() {
        super.x = 1;
    }
    async assignSatisfies() {
        super.x = 1;
    }
    async assignNonNull() {
        super.x = 1;
    }
    async assignTypeAssertion() {
        super.x = 1;
    }
    async compoundAs() {
        super.x += 1;
    }
    async incrementNonNull() {
        super.x++;
    }
    async destructuringWrapped() {
        [super.x] = [1];
        ({ a: super.x } = { a: 1 });
    }
    async elementAssignAs() {
        super["x"] = 1;
    }
    asyncGenerator() {
        const _super = Object.create(null, {
            m: { get: () => super.m }
        });
        return __asyncGenerator(this, arguments, function* asyncGenerator_1() {
            _super.m();
            _super.m `t`;
        });
    }
    assignAsyncGenerator() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __asyncGenerator(this, arguments, function* assignAsyncGenerator_1() {
            _super.x = 1;
        });
    }
    static async staticCalls() {
        super.sm();
        super.sm `t`;
    }
}
