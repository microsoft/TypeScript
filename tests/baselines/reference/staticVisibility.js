//// [staticVisibility.js]
var C1 = (function () {
    function C1() {
        var v = 0;

        s = 1; // should be error
        C1.s = 1; // should be ok

        b(); // should be error
        C1.b(); // should be ok
    }
    C1.b = function () {
        v = 1; // should be error
        this.p = 0; // should be error
        C1.s = 1; // should be ok
    };
    return C1;
})();

var C2 = (function () {
    function C2() {
        this.barback = "";
    }
    Object.defineProperty(C2, "Bar", {
        get: function () {
            return "bar";
        },
        set: function (bar) {
            barback = bar;
        },
        enumerable: true,
        configurable: true
    });

    return C2;
})();
