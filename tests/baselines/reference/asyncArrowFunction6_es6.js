//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncArrowFunction6_es6.ts] ////

//// [asyncArrowFunction6_es6.ts]
var foo = async (a = await): Promise<void> => {
}

//// [asyncArrowFunction6_es6.js]
var foo = (...args_1) => __awaiter(this, [...args_1], void 0, function* (a = yield ) {
});
