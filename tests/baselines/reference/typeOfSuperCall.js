//// [typeOfSuperCall.ts]
class C {
}

class D extends C {
    constructor() {
        var x: void = super();
    }
}

//// [typeOfSuperCall.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    return C;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var x = _super.call(this);
    }
    return D;
})(C);
