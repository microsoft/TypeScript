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
        var obj = {
            [this.bar()]: function () {
            }
        };
        return 0;
    };
    return C;
})();
