//// [computedPropertyNames29.ts]
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

//// [computedPropertyNames29.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
        (() => {
            var obj = {
                [this.bar()]() {
                } // needs capture
            };
        });
        return 0;
    };
    return C;
})();
