// @strict: true
// @declaration: true

declare function isString(value: unknown): value is string;
declare function isArrayOfStrings(value: unknown): value is string[];

const assert: (value: unknown) => asserts value = value => {}

declare function assertIsString(value: unknown): asserts value is string;
declare function assertIsArrayOfStrings(value: unknown): asserts value is string[];
declare function assertDefined<T>(value: T): asserts value is NonNullable<T>;

function f01(x: unknown) {
    if (!!true) {
        assert(typeof x === "string");
        x.length;
    }
    if (!!true) {
        assert(x instanceof Error);
        x.message;
    }
    if (!!true) {
        assert(typeof x === "boolean" || typeof x === "number");
        x.toLocaleString;
    }
    if (!!true) {
        assert(isArrayOfStrings(x));
        x[0].length;
    }
    if (!!true) {
        assertIsArrayOfStrings(x);
        x[0].length;
    }
    if (!!true) {
        assert(x === undefined || typeof x === "string");
        x;  // string | undefined
        assertDefined(x);
        x;  // string
    }
}

function f02(x: string | undefined) {
    if (!!true) {
        assert(x);
        x.length;
    }
    if (!!true) {
        assert(x !== undefined);
        x.length;
    }
    if (!!true) {
        assertDefined(x);
        x.length;
    }
}

function f03(x: string | undefined, assert: (value: unknown) => asserts value) {
    assert(x);
    x.length;
}

namespace Debug {
    export declare function assert(value: unknown, message?: string): asserts value;
    export declare function assertDefined<T>(value: T): asserts value is NonNullable<T>;
}

function f10(x: string | undefined) {
    if (!!true) {
        Debug.assert(x);
        x.length;
    }
    if (!!true) {
        Debug.assert(x !== undefined);
        x.length;
    }
    if (!!true) {
        Debug.assertDefined(x);
        x.length;
    }
}

class Test {
    assert(value: unknown): asserts value {
        if (value) return;
        throw new Error();
    }
    isTest2(): this is Test2 {
        return this instanceof Test2;
    }
    assertIsTest2(): asserts this is Test2 {
        if (this instanceof Test2) return;
        throw new Error();
    }
    assertThis(): asserts this {
        if (!this) return;
        throw new Error();
    }
    bar() {
        this.assertThis();
        this;
    }
    foo(x: unknown) {
        this.assert(typeof x === "string");
        x.length;
        if (this.isTest2()) {
            this.z;
        }
        this.assertIsTest2();
        this.z;
    }
}

class Test2 extends Test {
    z = 0;
}

// Invalid constructs

declare let Q1: new (x: unknown) => x is string;
declare let Q2: new (x: boolean) => asserts x;
declare let Q3: new (x: unknown) => asserts x is string;

declare class Wat {
    get p1(): this is string;
    set p1(x: this is string);
    get p2(): asserts this is string;
    set p2(x: asserts this is string);
}
