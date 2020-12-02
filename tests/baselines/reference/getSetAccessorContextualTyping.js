//// [getSetAccessorContextualTyping.ts]
// In the body of a get accessor with no return type annotation,
// if a matching set accessor exists and that set accessor has a parameter type annotation,
// return expressions are contextually typed by the type given in the set accessor's parameter type annotation.

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

    set Z(z: number) { }
    get Z() {
        return 1;
    }
}

//// [getSetAccessorContextualTyping.js]
// In the body of a get accessor with no return type annotation,
// if a matching set accessor exists and that set accessor has a parameter type annotation,
// return expressions are contextually typed by the type given in the set accessor's parameter type annotation.
var C = /** @class */ (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "X", {
        get: function () {
            return "string"; // Error; get contextual type by set accessor parameter type annotation
        },
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "Y", {
        get: function () {
            return true;
        },
        set: function (y) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "W", {
        get: function () {
            return true;
        },
        set: function (w) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "Z", {
        get: function () {
            return 1;
        },
        set: function (z) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
