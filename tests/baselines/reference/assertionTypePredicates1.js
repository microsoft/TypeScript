//// [assertionTypePredicates1.ts]
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


//// [assertionTypePredicates1.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var assert = function (value) { };
function f01(x) {
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
        x; // string | undefined
        assertDefined(x);
        x; // string
    }
}
function f02(x) {
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
function f03(x, assert) {
    assert(x);
    x.length;
}
var Debug;
(function (Debug) {
})(Debug || (Debug = {}));
function f10(x) {
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
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.assert = function (value) {
        if (value)
            return;
        throw new Error();
    };
    Test.prototype.isTest2 = function () {
        return this instanceof Test2;
    };
    Test.prototype.assertIsTest2 = function () {
        if (this instanceof Test2)
            return;
        throw new Error();
    };
    Test.prototype.assertThis = function () {
        if (!this)
            return;
        throw new Error();
    };
    Test.prototype.bar = function () {
        this.assertThis();
        this;
    };
    Test.prototype.foo = function (x) {
        this.assert(typeof x === "string");
        x.length;
        if (this.isTest2()) {
            this.z;
        }
        this.assertIsTest2();
        this.z;
    };
    return Test;
}());
var Test2 = /** @class */ (function (_super) {
    __extends(Test2, _super);
    function Test2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.z = 0;
        return _this;
    }
    return Test2;
}(Test));


//// [assertionTypePredicates1.d.ts]
declare function isString(value: unknown): value is string;
declare function isArrayOfStrings(value: unknown): value is string[];
declare const assert: (value: unknown) => asserts value;
declare function assertIsString(value: unknown): asserts value is string;
declare function assertIsArrayOfStrings(value: unknown): asserts value is string[];
declare function assertDefined<T>(value: T): asserts value is NonNullable<T>;
declare function f01(x: unknown): void;
declare function f02(x: string | undefined): void;
declare function f03(x: string | undefined, assert: (value: unknown) => asserts value): void;
declare namespace Debug {
    function assert(value: unknown, message?: string): asserts value;
    function assertDefined<T>(value: T): asserts value is NonNullable<T>;
}
declare function f10(x: string | undefined): void;
declare class Test {
    assert(value: unknown): asserts value;
    isTest2(): this is Test2;
    assertIsTest2(): asserts this is Test2;
    assertThis(): asserts this;
    bar(): void;
    foo(x: unknown): void;
}
declare class Test2 extends Test {
    z: number;
}
declare let Q1: new (x: unknown) => x is string;
declare let Q2: new (x: boolean) => asserts x;
declare let Q3: new (x: unknown) => asserts x is string;
declare class Wat {
    get p1(): this is string;
    set p1(x: this is string);
    get p2(): asserts this is string;
    set p2(x: asserts this is string);
}
