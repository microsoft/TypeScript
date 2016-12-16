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
            var obj = (_a = {},
                _a[_this.bar()] = function () { } // needs capture
            ,
                _a);
            var _a;
        });
        return 0;
    };
    return C;
}());
