//// [classOrderBug.ts]
class bar {
    public baz: foo;
    constructor() {

        this.baz = new foo();

    }

}

class baz {}
class foo extends baz {}




//// [classOrderBug.js]
var __extends = (this && this.__extends) || function (d, b) {
    Object.setPrototypeOf(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bar = (function () {
    function bar() {
        this.baz = new foo();
    }
    return bar;
}());
var baz = (function () {
    function baz() {
    }
    return baz;
}());
var foo = (function (_super) {
    __extends(foo, _super);
    function foo() {
        return _super.apply(this, arguments) || this;
    }
    return foo;
}(baz));
