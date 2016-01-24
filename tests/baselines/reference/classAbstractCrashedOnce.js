//// [classAbstractCrashedOnce.ts]
abstract class foo {
    protected abstract test();
}

class bar extends foo {
    test() {
        this.
    }
}
var x = new bar();

//// [classAbstractCrashedOnce.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var foo = (function () {
    function foo() {
    }
    return foo;
}());
var bar = (function (_super) {
    __extends(bar, _super);
    function bar() {
        _super.apply(this, arguments);
    }
    bar.prototype.test = function () {
        this.
        ;
    };
    return bar;
}(foo));
var x = new bar();
