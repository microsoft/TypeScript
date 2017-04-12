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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = (function () {
    function A(map) {
        this.map = map;
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    // Ensure 'value' is of type 'number (and not '{}') by using its 'toExponential()' method.
    function B() {
        return _super.call(this, function (value) { return String(value.toExponential()); }) || this;
    }
    return B;
}(A));
