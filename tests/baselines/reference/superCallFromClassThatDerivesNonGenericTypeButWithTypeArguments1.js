//// [superCallFromClassThatDerivesNonGenericTypeButWithTypeArguments1.ts]

class A {
    constructor(private map: (value: number) => string) {

    }
}

class B extends A<number, string> {
    constructor() { super(value => String(value)); }
}

//// [superCallFromClassThatDerivesNonGenericTypeButWithTypeArguments1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A(map) {
        this.map = map;
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.call(this, function (value) { return String(value); });
    }
    return B;
})(A);
