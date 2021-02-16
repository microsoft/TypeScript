//// [constructorOverloads3.ts]
declare class FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(x: any);
}


 class Foo extends FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(a: any);
    constructor(x: any, y?: any) { }
    bar1() { /*WScript.Echo("Yo");*/}
}

var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1,f2,f3]);

f1.bar1();


//// [constructorOverloads3.js]
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
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo(x, y) {
        var _this = this;
        return _this;
    }
    Foo.prototype.bar1 = function () { };
    return Foo;
}(FooBase));
var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1, f2, f3]);
f1.bar1();
