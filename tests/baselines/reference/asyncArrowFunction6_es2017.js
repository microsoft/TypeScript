//// [tests/cases/conformance/async/es2017/asyncArrowFunction/asyncArrowFunction6_es2017.ts] ////

//// [asyncArrowFunction6_es2017.ts]
var foo = async (a = await): Promise<void> => {
}

//// [asyncArrowFunction6_es2017.js]
var foo = async (a = await ) => {
};
