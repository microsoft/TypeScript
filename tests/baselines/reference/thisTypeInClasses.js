//// [tests/cases/conformance/types/thisType/thisTypeInClasses.ts] ////

//// [thisTypeInClasses.ts]
class C1 {
    x: this;
    f(x: this): this { return undefined; }
}

class C2 {
    [x: string]: this;
}

interface Foo<T> {
    x: T;
    y: this;
}

class C3 {
    a: this[];
    b: [this, this];
    c: this | Date;
    d: this & Date;
    e: (((this)));
    f: (x: this) => this;
    g: new (x: this) => this;
    h: Foo<this>;
    i: Foo<this | (() => this)>;
    j: (x: any) => x is this;
}

declare class C4 {
    x: this;
    f(x: this): this;
}

class C5 {
    foo() {
        let f1 = (x: this): this => this;
        let f2 = (x: this) => this;
        let f3 = (x: this) => (y: this) => this;
        let f4 = (x: this) => {
            let g = (y: this) => {
                return () => this;
            }
            return g(this);
        }
    }
    bar() {
        let x1 = <this>undefined;
        let x2 = undefined as this;
    }
}


//// [thisTypeInClasses.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype.f = function (x) { return undefined; };
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var C5 = /** @class */ (function () {
    function C5() {
    }
    C5.prototype.foo = function () {
        var _this = this;
        var f1 = function (x) { return _this; };
        var f2 = function (x) { return _this; };
        var f3 = function (x) { return function (y) { return _this; }; };
        var f4 = function (x) {
            var g = function (y) {
                return function () { return _this; };
            };
            return g(_this);
        };
    };
    C5.prototype.bar = function () {
        var x1 = undefined;
        var x2 = undefined;
    };
    return C5;
}());
