//// [primitiveMembers.ts]
var x = 5;
var r = /yo/;
r.source;

x.toBAZ();
x.toString();

var n = 0;
var N: Number;

n = N;  // should not work, as 'number' has a different brand
N = n; // should work

var o: Object = {}
var f: Function = (x: string) => x.length;
var r2: RegExp = /./g;
var n2: Number = 34;
var s: String = "yo";
var b: Boolean = true;

var n3 = 5 || {};


class baz { public bar(): void { }; }
class foo extends baz { public bar(){ return undefined}; }



 



//// [primitiveMembers.js]
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
var x = 5;
var r = /yo/;
r.source;
x.toBAZ();
x.toString();
var n = 0;
var N;
n = N; // should not work, as 'number' has a different brand
N = n; // should work
var o = {};
var f = function (x) { return x.length; };
var r2 = /./g;
var n2 = 34;
var s = "yo";
var b = true;
var n3 = 5 || {};
var baz = /** @class */ (function () {
    function baz() {
    }
    baz.prototype.bar = function () { };
    ;
    return baz;
}());
var foo = /** @class */ (function (_super) {
    __extends(foo, _super);
    function foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    foo.prototype.bar = function () { return undefined; };
    ;
    return foo;
}(baz));
