//// [optionalClassGetters.ts]
const test1 = {
    get a?() { // Object literal getters may not be marked optional
        return 2;
    }
}

class Foo {
    get a? () {
        return 1;
    }
    set a? (v: number) { } // Setters may not be marked optional
}

class Bar {
    get a() {
        return 1;
    }
    get b?(): string;  // Body of optional getter can be omitted
    get c?() {
        return 'foo';
    }
    get d?() {
        return 'bar';
    }
}

function test2(x: Bar) {
    x.a;
    x.b;
    x.c;
    x.d;
    let a1 = x.a;
    let b1 = x.b;
    let c1 = x.c.toString();
    let d1 = x.d && x.d.toString();
}

class Base {
    get f?(): number;
}

class Derived extends Base {
    get f(): number { return 1; }
}

class Person {
    firstName: string;
    lastName: string;

    get fullName?() {
        return this.firstName + ' ' + this.lastName;
    }
}

const person: Person = {
    firstName: 'foo',
    lastName: 'bar'
}


//// [optionalClassGetters.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var test1 = {
    get a() { }
}(), // Object literal getters may not be marked optional
_a = (void 0)["return"], // Object literal getters may not be marked optional
 = _a === void 0 ? 2 : _a;
var Foo = (function () {
    function Foo() {
    }
    Object.defineProperty(Foo.prototype, "a", {
        get: function () {
            return 1;
        },
        set: function () { },
        enumerable: true,
        configurable: true
    });
    return Foo;
}());
(function (v) { }); // Setters may not be marked optional
var Bar = (function () {
    function Bar() {
    }
    Object.defineProperty(Bar.prototype, "a", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bar.prototype, "b", {
        get: function () { } // Body of optional getter can be omitted
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bar.prototype, "c", {
        get: function () {
            return 'foo';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bar.prototype, "d", {
        get: function () {
            return 'bar';
        },
        enumerable: true,
        configurable: true
    });
    return Bar;
}());
function test2(x) {
    x.a;
    x.b;
    x.c;
    x.d;
    var a1 = x.a;
    var b1 = x.b;
    var c1 = x.c.toString();
    var d1 = x.d && x.d.toString();
}
var Base = (function () {
    function Base() {
    }
    Object.defineProperty(Base.prototype, "f", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Derived.prototype, "f", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return Derived;
}(Base));
var Person = (function () {
    function Person() {
    }
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            return this.firstName + ' ' + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var person = {
    firstName: 'foo',
    lastName: 'bar'
};


//// [optionalClassGetters.d.ts]
declare const test1: any, : number;
declare class Foo {
    a?: number | undefined;
}
declare class Bar {
    readonly a: number;
    readonly b?: string;
    readonly c?: string | undefined;
    readonly d?: string | undefined;
}
declare function test2(x: Bar): void;
declare class Base {
    readonly f?: number;
}
declare class Derived extends Base {
    readonly f: number;
}
declare class Person {
    firstName: string;
    lastName: string;
    readonly fullName?: string | undefined;
}
declare const person: Person;
