//// [classIndexer3.ts]
class C123 {
    [s: string]: number;
    constructor() {
    }
}

class D123 extends C123 {
    x: number;
    y: string;
}

//// [classIndexer3.js]
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
var C123 = /** @class */ (function () {
    function C123() {
    }
    return C123;
}());
var D123 = /** @class */ (function (_super) {
    __extends(D123, _super);
    function D123() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D123;
}(C123));
