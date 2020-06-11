//// [tests/cases/compiler/es6ImportEqualsExportModuleEs2015Error.ts] ////

//// [a.ts]
class a { }
export = a;

//// [main.ts]
import * as a from "./a";
a;




//// [a.js]
var a = /** @class */ (function () {
    function a() {
    }
    return a;
}());
export {};
//// [main.js]
import * as a from "./a";
a;
