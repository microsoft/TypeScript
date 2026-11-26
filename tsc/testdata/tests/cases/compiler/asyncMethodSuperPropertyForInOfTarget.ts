// @target: es2015,es2017
// @lib: esnext
// @noEmitHelpers: true
// @noTypesAndSymbols: true

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
