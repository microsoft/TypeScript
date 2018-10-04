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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
var bar = /** @class */ (function (_super) {
    __extends(bar, _super);
    function bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bar.prototype.test = function () {
        this.
        ;
    };
    return bar;
}(foo));
var x = new bar();
