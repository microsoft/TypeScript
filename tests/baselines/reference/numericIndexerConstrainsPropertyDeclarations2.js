//// [numericIndexerConstrainsPropertyDeclarations2.ts]
// String indexer providing a constraint of a user defined type

class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string { return ''; }
}

class Foo {
    [x: number]: A;
    1.0: A; // ok
    2.0: B; // ok
    "2.5": B // ok
    3.0: number; // error
    "4.0": string; // error
}

interface Foo2 {
    [x: number]: A;
    1.0: A; // ok
    2.0: B; // ok
    "2.5": B // ok
    3.0: number; // error
    "4.0": string; // error
}

var a: {
    [x: number]: A;
    1.0: A; // ok
    2.0: B; // ok
    "2.5": B // ok
    3.0: number; // error
    "4.0": string; // error
};

// error
var b: { [x: number]: A } = {
    1.0: new A(), 
    2.0: new B(), 
    "2.5": new B(),
    3.0: 1,
    "4.0": ''
}

//// [numericIndexerConstrainsPropertyDeclarations2.js]
// String indexer providing a constraint of a user defined type
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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { return ''; };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.bar = function () { return ''; };
    return B;
}(A));
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var a;
// error
var b = {
    1.0: new A(),
    2.0: new B(),
    "2.5": new B(),
    3.0: 1,
    "4.0": ''
};
