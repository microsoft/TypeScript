//// [tests/cases/compiler/declarationEmitAmdModuleDefault.ts] ////

//// [declarationEmitAmdModuleDefault.ts]
export default class DefaultClass { }

//// [file.js]
define("declarationEmitAmdModuleDefault", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultClass = /** @class */ (function () {
        function DefaultClass() {
        }
        return DefaultClass;
    }());
    exports.default = DefaultClass;
});


//// [file.d.ts]
declare module "declarationEmitAmdModuleDefault" {
    export default class DefaultClass {
    }
}
