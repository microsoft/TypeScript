//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithInheritedPrivates2.ts] ////

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
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return E;
}(C2));
var a;
var r = a.x; // error
var r2 = a.w; // error
