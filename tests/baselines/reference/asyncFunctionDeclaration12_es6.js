//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration12_es6.ts] ////

//// [asyncFunctionDeclaration12_es6.ts]
var v = async function await(): Promise<void> { }

//// [asyncFunctionDeclaration12_es6.js]
var v = function await() {
    return __awaiter(this, void 0, void 0, function* () { });
};
