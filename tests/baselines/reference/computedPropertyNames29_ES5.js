//// [computedPropertyNames29_ES5.ts]
class C {
    bar() {
        () => {
            var obj = {
                [this.bar()]() { } // needs capture
            };
        }
        return 0;
    }
}

//// [computedPropertyNames29_ES5.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var _this = this;
        (function () {
            var obj = {
                [_this.bar()]: function () {
                } // needs capture
            };
        });
        return 0;
    };
    return C;
})();
