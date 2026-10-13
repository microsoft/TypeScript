// @target: es2022, es2021
// https://github.com/microsoft/TypeScript/issues/64733

// Inside a downleveled `static {}` block, `this` refers to the class and is rewritten
// to the class alias, but `this` inside a regular function nested in the block refers
// to the function's own receiver and must be kept.
class Foo {
    declare static count: number;
    declare toObject: () => number;
    declare getBar: () => () => number;
    declare getIndexed: () => number;

    bar() {
        return 1;
    }

    static {
        // Referencing the class by name makes the downleveled block use a class alias.
        Foo.count = 0;
        this.count++;
        Foo.prototype.toObject = function (this: Foo) {
            return this.bar();
        };
        Foo.prototype.getBar = function (this: Foo) {
            return () => this.bar();
        };
        this.prototype.getIndexed = function (this: Foo) {
            return this["bar"]();
        };
    }
}

new Foo().toObject();
