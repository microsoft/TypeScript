//// [tests/cases/conformance/classes/classExpressions/extendClassExpressionFromModule.ts] ////

//// [foo1.ts]
class x{}

export = x; 

//// [foo2.ts]
import foo1 = require('./foo1');
var x = foo1;
class y extends x {}


//// [foo1.js]
"use strict";
var x = /** @class */ (function () {
    function x() {
    }
    return x;
}());
module.exports = x;
//// [foo2.js]
"use strict";
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
exports.__esModule = true;
var foo1 = require("./foo1");
var x = foo1;
var y = /** @class */ (function (_super) {
    __extends(y, _super);
    function y() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return y;
}(x));
