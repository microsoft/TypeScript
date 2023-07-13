//// [tests/cases/conformance/override/override1.ts] ////

//// [override1.ts]
class B {
    foo (v: string) {}
    fooo (v: string) {}
}

class D extends B {
    override foo (v: string) {}

    fooo (v: string) {}

    override bar(v: string) {}
}

class C {
    override foo(v: string) {}
}

function f () {
    return class extends B {
        override foo (v: string) {}
    
        fooo (v: string) {}
    
        override bar(v: string) {}
    }
}

class E extends (class {
    foo () { }
    bar () { }
}) {
    override foo () { }
    bar () { }

    baz() {}

    override bazz () {}
}

function ff () {
    return class {
        override foo () {}
    }
}

//// [override1.js]
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
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function (v) { };
    B.prototype.fooo = function (v) { };
    return B;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.prototype.foo = function (v) { };
    D.prototype.fooo = function (v) { };
    D.prototype.bar = function (v) { };
    return D;
}(B));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (v) { };
    return C;
}());
function f() {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.foo = function (v) { };
        class_1.prototype.fooo = function (v) { };
        class_1.prototype.bar = function (v) { };
        return class_1;
    }(B));
}
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    E.prototype.foo = function () { };
    E.prototype.bar = function () { };
    E.prototype.baz = function () { };
    E.prototype.bazz = function () { };
    return E;
}((/** @class */ (function () {
    function class_2() {
    }
    class_2.prototype.foo = function () { };
    class_2.prototype.bar = function () { };
    return class_2;
}()))));
function ff() {
    return /** @class */ (function () {
        function class_3() {
        }
        class_3.prototype.foo = function () { };
        return class_3;
    }());
}


//// [override1.d.ts]
declare class B {
    foo(v: string): void;
    fooo(v: string): void;
}
declare class D extends B {
    foo(v: string): void;
    fooo(v: string): void;
    bar(v: string): void;
}
declare class C {
    foo(v: string): void;
}
declare function f(): {
    new (): {
        foo(v: string): void;
        fooo(v: string): void;
        bar(v: string): void;
    };
};
declare const E_base: {
    new (): {
        foo(): void;
        bar(): void;
    };
};
declare class E extends E_base {
    foo(): void;
    bar(): void;
    baz(): void;
    bazz(): void;
}
declare function ff(): {
    new (): {
        foo(): void;
    };
};
