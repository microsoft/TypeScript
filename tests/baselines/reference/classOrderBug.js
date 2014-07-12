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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
