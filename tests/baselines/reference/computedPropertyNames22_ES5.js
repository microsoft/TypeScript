//// [computedPropertyNames22_ES5.ts]
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames22_ES5.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var obj = function () { }(_a = {}, _a[this.bar()] = , _a);
        return 0;
        var _a;
    };
    return C;
})();
