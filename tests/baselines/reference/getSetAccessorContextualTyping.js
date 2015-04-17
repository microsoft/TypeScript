//// [getSetAccessorContextualTyping.ts]
class C {
    set X(x: number) { }
    get X() {
        return "string";  // Error; get contextual type by set accessor parameter type annotation
    }

    set Y(y) { }
    get Y() {
        return true;
    }

    set W(w) { }
    get W(): boolean {
        return true;
    }
}

//// [getSetAccessorContextualTyping.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        get: function () {
            return "string"; // Error; get contextual type by set accessor parameter type annotation
        },
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, "Y", {
        get: function () {
            return true;
        },
        set: function (y) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, "W", {
        get: function () {
            return true;
        },
        set: function (w) { },
        enumerable: true,
        configurable: true
    });
    return C;
})();
