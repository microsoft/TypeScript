//// [privateProtectedMembersAreNotAccessibleDestructuring.ts]
class K {
    private priv;
    protected prot;
    private privateMethod() { }
    m() {
        let { priv: a, prot: b } = this; // ok
        let { priv, prot } = new K(); // ok
    }
}
class C extends K {
    m2() {
        let { priv: a } = this; // error
        let { prot: b } = this; // ok
    }
}
let k = new K();
let { priv } = k; // error
let { prot } = k; // error
let { privateMethod } = k; // error
let { priv: a, prot: b, privateMethod: pm } = k; // error
function f({ priv, prot, privateMethod }: K) {

}


//// [privateProtectedMembersAreNotAccessibleDestructuring.js]
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
var K = /** @class */ (function () {
    function K() {
    }
    K.prototype.privateMethod = function () { };
    K.prototype.m = function () {
        var _a = this, a = _a.priv, b = _a.prot; // ok
        var _b = new K(), priv = _b.priv, prot = _b.prot; // ok
    };
    return K;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.m2 = function () {
        var a = this.priv; // error
        var b = this.prot; // ok
    };
    return C;
}(K));
var k = new K();
var priv = k.priv; // error
var prot = k.prot; // error
var privateMethod = k.privateMethod; // error
var a = k.priv, b = k.prot, pm = k.privateMethod; // error
function f(_a) {
    var priv = _a.priv, prot = _a.prot, privateMethod = _a.privateMethod;
}
