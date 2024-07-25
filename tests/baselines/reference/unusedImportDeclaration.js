//// [tests/cases/compiler/unusedImportDeclaration.ts] ////

//// [unusedImportDeclaration_testerB.ts]
class TesterB {
    me: string;
}
export = TesterB;

//// [unusedImportDeclaration_testerA.ts]
import B = require("./unusedImportDeclaration_testerB");
var thingy: B = {
    me: "A"
};
declare function foo(a: string): void;
foo("IN " + thingy.me + "!");


//// [unusedImportDeclaration_testerB.js]
"use strict";
var TesterB = /** @class */ (function () {
    function TesterB() {
    }
    return TesterB;
}());
module.exports = TesterB;
//// [unusedImportDeclaration_testerA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thingy = {
    me: "A"
};
foo("IN " + thingy.me + "!");


//// [unusedImportDeclaration_testerB.d.ts]
declare class TesterB {
    me: string;
}
export = TesterB;
//// [unusedImportDeclaration_testerA.d.ts]
export {};
