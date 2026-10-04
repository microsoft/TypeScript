//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration12_es5.ts] ////

//// [asyncFunctionDeclaration12_es5.ts]
var v = async function await(): Promise<void> { }

//// [asyncFunctionDeclaration12_es5.js]
"use strict";
var v = function await() {
    return __awaiter(this, void 0, void 0, function* () { });
};
