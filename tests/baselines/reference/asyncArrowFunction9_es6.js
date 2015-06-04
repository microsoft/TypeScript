//// [asyncArrowFunction9_es6.ts]
var foo = async (a = await => await): Promise<void> => {
}

//// [asyncArrowFunction9_es6.js]
var foo = (a = await => await) => __awaiter(function* () {
}, this, void 0, Promise);
