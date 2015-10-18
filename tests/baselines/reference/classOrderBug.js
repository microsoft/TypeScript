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
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bar = (function () {
    function bar() {
        this.baz = new foo();
    }
    return bar;
})();
var baz = (function () {
    function baz() {
    }
    return baz;
})();
var foo = (function (_super) {
    __extends(foo, _super);
    function foo() {
        _super.apply(this, arguments);
    }
    return foo;
})(baz);
