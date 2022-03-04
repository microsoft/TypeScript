//// [superCallParameterContextualTyping1.ts]
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class B extends A<number, string> {
    // Ensure 'value' is of type 'number (and not '{}') by using its 'toExponential()' method.
    constructor() { super(value => String(value.toExponential())); }
}


//// [superCallParameterContextualTyping1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A(map) {
        this.map = map;
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    // Ensure 'value' is of type 'number (and not '{}') by using its 'toExponential()' method.
    function B() {
        return _super.call(this, function (value) { return String(value.toExponential()); }) || this;
    }
    return B;
}(A));
