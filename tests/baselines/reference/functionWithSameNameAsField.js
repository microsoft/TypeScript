//// [functionWithSameNameAsField.ts]
class TestProgressBar {
    public total: number;
    public total(total: number) {
        this.total = total;
        return this;
    }
}


//// [functionWithSameNameAsField.js]
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
var TestProgressBar = (function () {
    function TestProgressBar() {
    }
    TestProgressBar.prototype.total = function (total) {
        this.total = total;
        return this;
    };
    __names(TestProgressBar.prototype, ["total"]);
    return TestProgressBar;
}());
