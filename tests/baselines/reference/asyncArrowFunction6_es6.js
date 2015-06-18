//// [asyncArrowFunction6_es6.ts]

var foo = async (a = await): Promise<void> => {
}

//// [asyncArrowFunction6_es6.js]
var foo = (a = yield ) => __awaiter([this, Promise], function* () {
});
