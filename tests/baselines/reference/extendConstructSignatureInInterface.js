//// [extendConstructSignatureInInterface.ts]
interface C {
    new(x: number): C;
}

var CStatic: C;
class E extends CStatic {
}

var e: E = new E(1);


//// [extendConstructSignatureInInterface.js]
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
var CStatic;
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return E;
}(CStatic));
var e = new E(1);
