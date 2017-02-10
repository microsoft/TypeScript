//// [tests/cases/compiler/moduleImportedForTypeArgumentPosition.ts] ////

//// [moduleImportedForTypeArgumentPosition_0.ts]
export interface M2C { }

//// [moduleImportedForTypeArgumentPosition_1.ts]
/**This is on import declaration*/
import M2 = require("moduleImportedForTypeArgumentPosition_0");
class C1<T>{ }
class Test1 extends C1<M2.M2C> {
}


//// [moduleImportedForTypeArgumentPosition_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [moduleImportedForTypeArgumentPosition_1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var C1 = (function () {
        function C1() {
        }
        return C1;
    }());
    var Test1 = (function (_super) {
        __extends(Test1, _super);
        function Test1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Test1;
    }(C1));
});
