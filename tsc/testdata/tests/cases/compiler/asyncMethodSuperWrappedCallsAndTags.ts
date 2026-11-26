// @target: es2015,es2017
// @lib: esnext
// @noEmitHelpers: true
// @noTypesAndSymbols: true

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
