//// [tests/cases/compiler/asyncMethodSuperPropertyForInOfTarget.ts] ////

//// [asyncMethodSuperPropertyForInOfTarget.ts]
// https://github.com/microsoft/TypeScript/issues/65655
// A `super` property in the head of a `for-of` or `for-in` statement is an assignment
// target, so `_super` needs a setter (and `_superIndex` a `value` accessor).

class B {
    get x(): any { return 0; }
    set x(v: any) { }
    static get x(): any { return 0; }
    static set x(v: any) { }
}

class C extends B {
    async forOfProperty() {
        for (super.x of [1]);
    }

    async forInProperty() {
        for (super.x in { k: 0 });
    }

    async forOfElement() {
        for (super["x"] of [1]);
    }

    async forInElement() {
        for (super["x"] in { k: 0 });
    }

    async forOfParenthesized() {
        for ((super.x) of [1]);
    }

    async forOfArrayPattern() {
        for ([super.x] of [[1]]);
    }

    async forOfObjectPattern() {
        for ({ a: super.x } of [{ a: 1 }]);
    }

    async forInAsyncArrow() {
        return async () => { for (super.x in { k: 0 }); };
    }

    async *forOfAsyncGenerator() {
        for (super.x of [1]);
    }

    async *forInElementAsyncGenerator() {
        for (super["x"] in { k: 0 });
    }

    static async forOfStatic() {
        for (super.x of [1]);
    }
}


//// [asyncMethodSuperPropertyForInOfTarget.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/65655
// A `super` property in the head of a `for-of` or `for-in` statement is an assignment
// target, so `_super` needs a setter (and `_superIndex` a `value` accessor).
class B {
    get x() { return 0; }
    set x(v) { }
    static get x() { return 0; }
    static set x(v) { }
}
class C extends B {
    forOfProperty() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            for (_super.x of [1])
                ;
        });
    }
    forInProperty() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            for (_super.x in { k: 0 })
                ;
        });
    }
    forOfElement() {
        const _superIndex = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            for (_superIndex("x") of [1])
                ;
        });
    }
    forInElement() {
        const _superIndex = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            for (_superIndex("x") in { k: 0 })
                ;
        });
    }
    forOfParenthesized() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            for ((_super.x) of [1])
                ;
        });
    }
    forOfArrayPattern() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            for ([_super.x] of [[1]])
                ;
        });
    }
    forOfObjectPattern() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            for ({ a: _super.x } of [{ a: 1 }])
                ;
        });
    }
    forInAsyncArrow() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return () => __awaiter(this, void 0, void 0, function* () { for (_super.x in { k: 0 })
                ; });
        });
    }
    forOfAsyncGenerator() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __asyncGenerator(this, arguments, function* forOfAsyncGenerator_1() {
            for (_super.x of [1])
                ;
        });
    }
    forInElementAsyncGenerator() {
        const _superIndex = name => super[name];
        return __asyncGenerator(this, arguments, function* forInElementAsyncGenerator_1() {
            for (_superIndex("x") in { k: 0 })
                ;
        });
    }
    static forOfStatic() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            for (_super.x of [1])
                ;
        });
    }
}
