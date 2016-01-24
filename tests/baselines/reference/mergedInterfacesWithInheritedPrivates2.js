//// [mergedInterfacesWithInheritedPrivates2.ts]
class C {
    private x: number;
}

class C2 {
    private w: number;
}

interface A extends C {
    y: string;
}

interface A extends C2 {
    z: string;
}

class D extends C implements A { // error
    private w: number;
    y: string;
    z: string;
}

class E extends C2 implements A { // error
    w: number;
    y: string;
    z: string;
}

var a: A;
var r = a.x; // error
var r2 = a.w; // error

//// [mergedInterfacesWithInheritedPrivates2.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    return C2;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
}(C));
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        _super.apply(this, arguments);
    }
    return E;
}(C2));
var a;
var r = a.x; // error
var r2 = a.w; // error
