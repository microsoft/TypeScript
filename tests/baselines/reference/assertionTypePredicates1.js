//// [tests/cases/conformance/controlFlow/assertionTypePredicates1.ts] ////

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
        assertIsArrayOfStrings(false);
        x;
    }
    if (!!true) {
        assert(x === undefined || typeof x === "string");
        x;  // string | undefined
        assertDefined(x);
        x;  // string
    }
    if (!!true) {
        assert(false);
        x;  // Unreachable
    }
    if (!!true) {
        assert(false && x === undefined);
        x;  // Unreachable
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
    if (!!true) {
        Debug.assert(false);
        x;  // Unreachable
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
    baz(x: number) {
        this.assert(false);
        x;  // Unreachable
    }
}

class Test2 extends Test {
    z = 0;
}

class Derived extends Test {
    foo(x: unknown) {
        super.assert(typeof x === "string");
        x.length;
    }
    baz(x: number) {
        super.assert(false);
        x;  // Unreachable
    }
}

function f11(items: Test[]) {
    for (let item of items) {
        if (item.isTest2()) {
            item.z;
        }
        item.assertIsTest2();
        item.z;
    }
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

function f20(x: unknown) {
    const assert = (value: unknown): asserts value => {}
    assert(typeof x === "string");  // Error
    const a = [assert];
    a[0](typeof x === "string");  // Error
    const t1 = new Test();
    t1.assert(typeof x === "string");  // Error
    const t2: Test = new Test();
    t2.assert(typeof x === "string");
}

// Repro from #35940

interface Thing {
    good: boolean;
    isGood(): asserts this is GoodThing;
}

interface GoodThing {
    good: true;
}

function example1(things: Thing[]) {
    for (let thing of things) {
        thing.isGood();
        thing.good;
    }
}

class TestPropertyDeclaration1 {
  assert = (value: unknown): asserts value => {};
  other(x: unknown) {
    this.assert(x); // error
    x;
  }
}

class TestPropertyDeclaration2 {
  assert: (v: unknown) => asserts v = (value) => {};
  other(x: unknown) {
    this.assert(x); // ok
    x;
  }
}

declare class ParentInheritedPropertyDeclaration {
  assert: (value: unknown) => asserts value;
}
class ChildInheritedPropertyDeclaration extends ParentInheritedPropertyDeclaration {
  other(x: unknown) {
    this.assert(x); // ok
    x;
  }
}

interface TestPropertySignature {
  assert: (value: unknown) => asserts value;
}
function testPropertySignature(
  x: TestPropertySignature,
  y: unknown,
) {
  x.assert(y); // ok
  x;
}
function testFunctionThisParameter1(
  this: TestPropertySignature,
  x: unknown,
) {
  this.assert(x); // ok
  x;
}

interface TestMethodSignature {
  assert(value: unknown): asserts value;
}
function testMethodSignature(
  x: TestMethodSignature,
  y: unknown,
) {
  x.assert(y); // ok
  x;
}
function testFunctionThisParameter2(
  this: TestMethodSignature,
  x: unknown,
) {
  this.assert(x); // ok
  x;
}


//// [assertionTypePredicates1.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        assertIsArrayOfStrings(false);
        x;
    }
    if (!!true) {
        assert(x === undefined || typeof x === "string");
        x; // string | undefined
        assertDefined(x);
        x; // string
    }
    if (!!true) {
        assert(false);
        x; // Unreachable
    }
    if (!!true) {
        assert(false && x === undefined);
        x; // Unreachable
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
    if (!!true) {
        Debug.assert(false);
        x; // Unreachable
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
    Test.prototype.baz = function (x) {
        this.assert(false);
        x; // Unreachable
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
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.prototype.foo = function (x) {
        _super.prototype.assert.call(this, typeof x === "string");
        x.length;
    };
    Derived.prototype.baz = function (x) {
        _super.prototype.assert.call(this, false);
        x; // Unreachable
    };
    return Derived;
}(Test));
function f11(items) {
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (item.isTest2()) {
            item.z;
        }
        item.assertIsTest2();
        item.z;
    }
}
function f20(x) {
    var assert = function (value) { };
    assert(typeof x === "string"); // Error
    var a = [assert];
    a[0](typeof x === "string"); // Error
    var t1 = new Test();
    t1.assert(typeof x === "string"); // Error
    var t2 = new Test();
    t2.assert(typeof x === "string");
}
function example1(things) {
    for (var _i = 0, things_1 = things; _i < things_1.length; _i++) {
        var thing = things_1[_i];
        thing.isGood();
        thing.good;
    }
}
var TestPropertyDeclaration1 = /** @class */ (function () {
    function TestPropertyDeclaration1() {
        this.assert = function (value) { };
    }
    TestPropertyDeclaration1.prototype.other = function (x) {
        this.assert(x); // error
        x;
    };
    return TestPropertyDeclaration1;
}());
var TestPropertyDeclaration2 = /** @class */ (function () {
    function TestPropertyDeclaration2() {
        this.assert = function (value) { };
    }
    TestPropertyDeclaration2.prototype.other = function (x) {
        this.assert(x); // ok
        x;
    };
    return TestPropertyDeclaration2;
}());
var ChildInheritedPropertyDeclaration = /** @class */ (function (_super) {
    __extends(ChildInheritedPropertyDeclaration, _super);
    function ChildInheritedPropertyDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildInheritedPropertyDeclaration.prototype.other = function (x) {
        this.assert(x); // ok
        x;
    };
    return ChildInheritedPropertyDeclaration;
}(ParentInheritedPropertyDeclaration));
function testPropertySignature(x, y) {
    x.assert(y); // ok
    x;
}
function testFunctionThisParameter1(x) {
    this.assert(x); // ok
    x;
}
function testMethodSignature(x, y) {
    x.assert(y); // ok
    x;
}
function testFunctionThisParameter2(x) {
    this.assert(x); // ok
    x;
}


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
    baz(x: number): void;
}
declare class Test2 extends Test {
    z: number;
}
declare class Derived extends Test {
    foo(x: unknown): void;
    baz(x: number): void;
}
declare function f11(items: Test[]): void;
declare let Q1: new (x: unknown) => x is string;
declare let Q2: new (x: boolean) => asserts x;
declare let Q3: new (x: unknown) => asserts x is string;
declare class Wat {
    get p1(): this is string;
    set p1(x: this is string);
    get p2(): asserts this is string;
    set p2(x: asserts this is string);
}
declare function f20(x: unknown): void;
interface Thing {
    good: boolean;
    isGood(): asserts this is GoodThing;
}
interface GoodThing {
    good: true;
}
declare function example1(things: Thing[]): void;
declare class TestPropertyDeclaration1 {
    assert: (value: unknown) => asserts value;
    other(x: unknown): void;
}
declare class TestPropertyDeclaration2 {
    assert: (v: unknown) => asserts v;
    other(x: unknown): void;
}
declare class ParentInheritedPropertyDeclaration {
    assert: (value: unknown) => asserts value;
}
declare class ChildInheritedPropertyDeclaration extends ParentInheritedPropertyDeclaration {
    other(x: unknown): void;
}
interface TestPropertySignature {
    assert: (value: unknown) => asserts value;
}
declare function testPropertySignature(x: TestPropertySignature, y: unknown): void;
declare function testFunctionThisParameter1(this: TestPropertySignature, x: unknown): void;
interface TestMethodSignature {
    assert(value: unknown): asserts value;
}
declare function testMethodSignature(x: TestMethodSignature, y: unknown): void;
declare function testFunctionThisParameter2(this: TestMethodSignature, x: unknown): void;
