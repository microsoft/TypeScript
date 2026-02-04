//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration14_es6.ts] ////

//// [asyncFunctionDeclaration14_es6.ts]
async function foo(): Promise<void> {
  return;
}

//// [asyncFunctionDeclaration14_es6.js]
"use strict";
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}
