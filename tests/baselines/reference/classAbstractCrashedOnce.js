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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var foo = (function () {
    function foo() {
    }
    return foo;
}());
var bar = (function (_super) {
    __extends(bar, _super);
    function bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bar.prototype.test = function () {
        this.
        ;
    };
    __names(bar.prototype, ["test"]);
    return bar;
}(foo));
var x = new bar();
