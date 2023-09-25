//// [tests/cases/compiler/importedModuleClassNameClash.ts] ////

//// [importedModuleClassNameClash.ts]
import foo = m1;
 
export module m1 { }
 
class foo { }


//// [importedModuleClassNameClash.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var foo = /** @class */ (function () {
        function foo() {
        }
        return foo;
    }());
});
