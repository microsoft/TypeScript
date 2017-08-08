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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo(x, y) {
        var _this = this;
        return _this;
    }
    Foo.prototype.bar1 = function () { };
    __names(Foo.prototype, ["bar1"]);
    return Foo;
}(FooBase));
var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1, f2, f3]);
f1.bar1();
