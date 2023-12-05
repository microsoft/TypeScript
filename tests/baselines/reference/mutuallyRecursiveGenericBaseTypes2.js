//// [tests/cases/compiler/mutuallyRecursiveGenericBaseTypes2.ts] ////

//// [mutuallyRecursiveGenericBaseTypes2.ts]
class foo<T>
{
    bar(): foo2<T[]> { return null; }
}
 
class foo2<T> extends foo<T> {
}
 
var test = new foo<string>();


//// [mutuallyRecursiveGenericBaseTypes2.js]
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
var foo = /** @class */ (function () {
    function foo() {
    }
    foo.prototype.bar = function () { return null; };
    return foo;
}());
var foo2 = /** @class */ (function (_super) {
    __extends(foo2, _super);
    function foo2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return foo2;
}(foo));
var test = new foo();
