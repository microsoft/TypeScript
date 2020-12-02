//// [mergedInterfacesWithInheritedPrivates3.ts]
class C {
    private x: number;
}

class C2 {
    private x: number;
}

interface A extends C { // error
    y: string;
}

interface A extends C2 { 
    z: string;
}

class D extends C implements A { // error
    y: string;
    z: string;
}

module M {
    class C {
        private x: string;
    }

    class C2 {
        private x: number;
    }

    interface A extends C { // error, privates conflict
        y: string;
    }

    interface A extends C2 {
        z: string;
    }
}

//// [mergedInterfacesWithInheritedPrivates3.js]
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
var M;
(function (M) {
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
})(M || (M = {}));
