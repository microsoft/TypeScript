//// [declarationEmitAmdModuleDefault.ts]
export default class DefaultClass { }

//// [file.js]
define("declarationEmitAmdModuleDefault", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var DefaultClass = /** @class */ (function () {
        function DefaultClass() {
        }
        return DefaultClass;
    }());
    exports["default"] = DefaultClass;
});


//// [file.d.ts]
declare module "declarationEmitAmdModuleDefault" {
    export default class DefaultClass {
    }
}
