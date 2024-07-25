//// [tests/cases/conformance/async/es2017/asyncArrowFunction/asyncArrowFunction5_es2017.ts] ////

//// [asyncArrowFunction5_es2017.ts]
var foo = async (await): Promise<void> => {
}

//// [asyncArrowFunction5_es2017.js]
var foo = async (await) => {
};
