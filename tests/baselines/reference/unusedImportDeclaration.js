//// [unusedImportDeclaration_testerA.ts]
import B = require("unusedImportDeclaration_testerB");
var thingy: B = {
    me: "A"
};
declare function foo(a: string): void;
foo("IN " + thingy.me + "!");


//// [unusedImportDeclaration_testerB.js]
var TesterB = (function () {
    function TesterB() {
    }
    return TesterB;
})();
module.exports = TesterB;
//// [unusedImportDeclaration_testerA.js]
var thingy = {
    me: "A"
};

foo("IN " + thingy.me + "!");
