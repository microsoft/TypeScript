//// [tests/cases/compiler/overloadsWithComputedNames.ts] ////

//// [overloadsWithComputedNames.ts]
// https://github.com/microsoft/TypeScript/issues/52329
class Person {
    ["B"](a: number): string;
    ["A"](a: string|number): number | string {
      return 0;
    }
}
let p = new Person();
p.A(0)
p.B(0)

// https://github.com/microsoft/TypeScript/issues/17345
class C {
    ["foo"](): void
    ["bar"](): void;
    ["foo"]() {
        return 0;
    }
}

declare const uniqueSym: unique symbol;
declare const uniqueSym2: unique symbol;
declare const sym: symbol;

declare const strUnion: 'foo' | 'bar';

class C1 {
    [sym](): void;  // should error
    [uniqueSym2](): void;   // should error
    [uniqueSym](): void;
    [uniqueSym]() { }
}

interface I1 {
    [sym](): void;  // should error
    [uniqueSym2](): void;
    [uniqueSym](): void;
    [uniqueSym](): void;
}

class C2 {
    [strUnion](): void; // should error
    [strUnion]() { }
}

class I2 {
    [strUnion](): void; // should error
    [strUnion]() { }
}

class C3 {
    [1](): void;  // should error
    [2](): void;
    [2]() { }
}

interface I3 {
    [1](): void;
    [2](): void;
    [2](): void;
}

//// [overloadsWithComputedNames.js]
// https://github.com/microsoft/TypeScript/issues/52329
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype["A"] = function (a) {
        return 0;
    };
    return Person;
}());
var p = new Person();
p.A(0);
p.B(0);
// https://github.com/microsoft/TypeScript/issues/17345
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype["foo"] = function () {
        return 0;
    };
    return C;
}());
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype[uniqueSym] = function () { };
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype[strUnion] = function () { };
    return C2;
}());
var I2 = /** @class */ (function () {
    function I2() {
    }
    I2.prototype[strUnion] = function () { };
    return I2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.prototype[2] = function () { };
    return C3;
}());
