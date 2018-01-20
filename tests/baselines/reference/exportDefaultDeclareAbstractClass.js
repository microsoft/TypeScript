//// [tests/cases/compiler/exportDefaultDeclareAbstractClass.ts] ////

//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792
export default declare abstract class A {
    foo(): number
 }

//// [b.ts]
import A from "./a";

class B extends A {
    foo() {
        return 0;
    }
}

//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var a_1 = require("./a");
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.foo = function () {
        return 0;
    };
    return B;
}(a_1["default"]));
