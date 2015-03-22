//// [superWithTypeArgument.ts]
class C {
    
}

class D<T> extends C {
    constructor() {
        super<T>();
    }
}

//// [superWithTypeArgument.js]
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
        _super.prototype..call(this);
    }
    return D;
})(C);
