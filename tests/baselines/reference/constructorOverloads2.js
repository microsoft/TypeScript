//// [tests/cases/compiler/constructorOverloads2.ts] ////

//// [constructorOverloads2.ts]
class FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(x: any) {
    }
    bar1() {  /*WScript.Echo("base bar1");*/ }
}

class Foo extends FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(a:any);
    constructor(x: any, y?: any) {
        super(x);
    }
    bar1() {  /*WScript.Echo("bar1");*/ }
}

var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1,f2,f3]);

f1.bar1();


//// [constructorOverloads2.js]
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
var FooBase = /** @class */ (function () {
    function FooBase(x) {
    }
    FooBase.prototype.bar1 = function () { };
    return FooBase;
}());
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo(x, y) {
        return _super.call(this, x) || this;
    }
    Foo.prototype.bar1 = function () { };
    return Foo;
}(FooBase));
var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1, f2, f3]);
f1.bar1();
