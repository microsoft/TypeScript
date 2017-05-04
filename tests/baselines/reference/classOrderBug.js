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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return foo;
}(baz));
