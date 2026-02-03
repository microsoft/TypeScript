//// [tests/cases/compiler/targetTypeBaseCalls.ts] ////

//// [targetTypeBaseCalls.ts]
function foo(x: (s: string) => void) { }
 
 
 
class Foo { constructor(x: (s: string) => void){} }
 
 
 
foo(function(s) { s = 5 });  // Error, can’t assign number to string
 
 
 
new Foo(function(s) { s = 5 });  // error, if types are applied correctly
 
 
 
class Bar extends Foo { constructor() { super(function(s) { s = 5 }) } }  // error, if types are applied correctly


//// [targetTypeBaseCalls.js]
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
function foo(x) { }
var Foo = /** @class */ (function () {
    function Foo(x) {
    }
    return Foo;
}());
foo(function (s) { s = 5; }); // Error, can’t assign number to string
new Foo(function (s) { s = 5; }); // error, if types are applied correctly
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super.call(this, function (s) { s = 5; }) || this;
    }
    return Bar;
}(Foo)); // error, if types are applied correctly
