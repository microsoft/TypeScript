//// [missingPropertiesOfClassExpression.ts]
class George extends class { reset() { return this.y; } } {
    constructor() {
        super();
    }
}


//// [missingPropertiesOfClassExpression.js]
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
var George = /** @class */ (function (_super) {
    __extends(George, _super);
    function George() {
        return _super.call(this) || this;
    }
    return George;
}(/** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.reset = function () { return this.y; };
    return class_1;
}())));
