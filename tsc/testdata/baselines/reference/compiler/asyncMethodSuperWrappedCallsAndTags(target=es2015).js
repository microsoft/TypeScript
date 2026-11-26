//// [tests/cases/compiler/asyncMethodSuperWrappedCallsAndTags.ts] ////

//// [asyncMethodSuperWrappedCallsAndTags.ts]
// https://github.com/microsoft/TypeScript/issues/65641
// Inside a lowered async body, a `super` member call or tag keeps `this` as its receiver,
// and a `super` member written through any outer expression gets a setter, whatever
// parentheses, type assertions or non-null assertions wrap the reference. A super access
// inside the argument of `super[...]` is replaced too.

class B {
    m(..._: unknown[]): any { }
    get x(): any { return 0; }
    set x(v: any) { }
    get k(): "m" { return "m"; }
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

    async elementArgumentWithSuper() {
        super[super.k]();
        super[super.k]`t`;
        return super[(super.k as "m")];
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
// parentheses, type assertions or non-null assertions wrap the reference. A super access
// inside the argument of `super[...]` is replaced too.
class B {
    m(..._) { }
    get x() { return 0; }
    set x(v) { }
    get k() { return "m"; }
    static sm(..._) { }
}
class C extends B {
    calls() {
        const _superIndex = name => super[name];
        const _super = Object.create(null, {
            m: { get: () => super.m }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.m.call(this);
            (_super.m).call(this);
            ((_super.m)).call(this);
            _super.m.call(this);
            _super.m.call(this);
            _super.m.call(this);
            _super.m.call(this);
            _super.m.call(this, yield 0);
            _superIndex("m").call(this);
            (_superIndex("m")).call(this);
            _superIndex("m").call(this);
            _superIndex("m").call(this);
        });
    }
    tags() {
        const _superIndex = name => super[name];
        const _super = Object.create(null, {
            m: { get: () => super.m }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.m.bind(this) `t`;
            (_super.m).bind(this) `t`;
            _super.m.bind(this) `t${yield 0}`;
            _super.m.bind(this) `t`;
            _superIndex("m").bind(this) `t`;
            _superIndex("m").bind(this) `t`;
        });
    }
    assignAs() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.x = 1;
        });
    }
    assignSatisfies() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.x = 1;
        });
    }
    assignNonNull() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.x = 1;
        });
    }
    assignTypeAssertion() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.x = 1;
        });
    }
    compoundAs() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.x += 1;
        });
    }
    incrementNonNull() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.x++;
        });
    }
    destructuringWrapped() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            [_super.x] = [1];
            ({ a: _super.x } = { a: 1 });
        });
    }
    elementAssignAs() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        return __awaiter(this, void 0, void 0, function* () {
            _superIndex("x").value = 1;
        });
    }
    elementArgumentWithSuper() {
        const _superIndex = name => super[name];
        const _super = Object.create(null, {
            k: { get: () => super.k }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _superIndex(_super.k).call(this);
            _superIndex(_super.k).bind(this) `t`;
            return _superIndex(_super.k);
        });
    }
    asyncGenerator() {
        const _super = Object.create(null, {
            m: { get: () => super.m }
        });
        return __asyncGenerator(this, arguments, function* asyncGenerator_1() {
            _super.m.call(this);
            _super.m.bind(this) `t`;
        });
    }
    assignAsyncGenerator() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __asyncGenerator(this, arguments, function* assignAsyncGenerator_1() {
            _super.x = 1;
        });
    }
    static staticCalls() {
        const _super = Object.create(null, {
            sm: { get: () => super.sm }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.sm.call(this);
            _super.sm.bind(this) `t`;
        });
    }
}
