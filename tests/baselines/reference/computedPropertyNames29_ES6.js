//// [computedPropertyNames29_ES6.ts]
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

//// [computedPropertyNames29_ES6.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
        (() => {
            var obj = {
                [this.bar()]() { } // needs capture
            };
        });
        return 0;
    };
    return C;
})();
