//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncArrowFunction5_es6.ts] ////

//// [asyncArrowFunction5_es6.ts]
var foo = async (await): Promise<void> => {
}

//// [asyncArrowFunction5_es6.js]
var foo = (await) => __awaiter(this, void 0, void 0, function* () {
});
