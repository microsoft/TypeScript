//// [inheritSameNamePrivatePropertiesFromSameOrigin.ts]
class B {
    private x: number;
}
class C extends B { }

class C2 extends B { }

interface A extends C, C2 { // ok
    y: string;
}

//// [inheritSameNamePrivatePropertiesFromSameOrigin.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var B = (function () {
    function B() {
    }
    return B;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(B);

var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(B);
