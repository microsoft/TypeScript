//// [asyncArrowFunction9_es6.ts]
var foo = async (a = await => await): Promise<void> => {
}

//// [asyncArrowFunction9_es6.js]
var foo = (...arguments_1) => __awaiter(function *(a = await => await) {
}.apply(this, arguments_1), Promise);
