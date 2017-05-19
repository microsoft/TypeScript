// @module: commonjs
// @declaration: true
// @Filename: unusedImportDeclaration_testerB.ts
class TesterB {
    me: string;
}
export = TesterB;

// @Filename: unusedImportDeclaration_testerA.ts
import B = require("./unusedImportDeclaration_testerB");
var thingy: B = {
    me: "A"
};
declare function foo(a: string): void;
foo("IN " + thingy.me + "!");
