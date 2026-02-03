//// [tests/cases/compiler/narrowByInstanceof.ts] ////

//// [narrowByInstanceof.ts]
interface A { a: string }
interface B { b: string }
interface C { c: string }

type AA = {
    (): void;
    prototype: A;
}

type BB = {
    new(): B;
}

function foo(x: A | B | C, A: AA, B: BB, AB: AA | BB) {
    if (x instanceof A) {
        x;  // A
    }
    else {
        x;  // B | C
    }
    if (x instanceof B) {
        x;  // B
    }
    else {
        x;  // A | C
    }
    if (x instanceof AB) {
        x;  // A | B
    }
    else {
        x;  // A | B | C
    }
}

function bar(target: any, Promise: any) {
    if (target instanceof Promise) {
        target.__then();
    }
}

// Repro from #52571

class PersonMixin extends Function {
    public check(o: any) {
        return typeof o === "object" && o !== null && o instanceof Person;
    }    
}

const cls = new PersonMixin();

class Person {
    work(): void { console.log("work") }
    sayHi(): void { console.log("Hi") }
}

class Car {
    sayHi(): void { console.log("Wof Wof") }
}

function test(o: Person | Car) {
    if (o instanceof cls) {
        console.log("Is Person");
        (o as Person).work()
    }
    else {
        console.log("Is Car")
        o.sayHi();
    }
}


//// [narrowByInstanceof.js]
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
function foo(x, A, B, AB) {
    if (x instanceof A) {
        x; // A
    }
    else {
        x; // B | C
    }
    if (x instanceof B) {
        x; // B
    }
    else {
        x; // A | C
    }
    if (x instanceof AB) {
        x; // A | B
    }
    else {
        x; // A | B | C
    }
}
function bar(target, Promise) {
    if (target instanceof Promise) {
        target.__then();
    }
}
// Repro from #52571
var PersonMixin = /** @class */ (function (_super) {
    __extends(PersonMixin, _super);
    function PersonMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonMixin.prototype.check = function (o) {
        return typeof o === "object" && o !== null && o instanceof Person;
    };
    return PersonMixin;
}(Function));
var cls = new PersonMixin();
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.work = function () { console.log("work"); };
    Person.prototype.sayHi = function () { console.log("Hi"); };
    return Person;
}());
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.sayHi = function () { console.log("Wof Wof"); };
    return Car;
}());
function test(o) {
    if (o instanceof cls) {
        console.log("Is Person");
        o.work();
    }
    else {
        console.log("Is Car");
        o.sayHi();
    }
}
