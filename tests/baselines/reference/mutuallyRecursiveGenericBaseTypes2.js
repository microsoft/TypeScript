//// [mutuallyRecursiveGenericBaseTypes2.ts]
class foo<T>
{
    bar(): foo2<T[]> { return null; }
}
 
class foo2<T> extends foo<T> {
}
 
var test = new foo<string>();


//// [mutuallyRecursiveGenericBaseTypes2.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var foo = (function () {
    function foo() {
    }
    foo.prototype.bar = function () { return null; };
    return foo;
})();
var foo2 = (function (_super) {
    __extends(foo2, _super);
    function foo2() {
        _super.apply(this, arguments);
    }
    return foo2;
})(foo);
var test = new foo();
