//// [asyncArrowFunction6_es6.ts]

var foo = async (a = await): Promise<void> => {
}

//// [asyncArrowFunction6_es6.js]
var foo = (...arguments_1) => __awaiter(function *(a = await) {
}.apply(this, arguments_1), Promise);
