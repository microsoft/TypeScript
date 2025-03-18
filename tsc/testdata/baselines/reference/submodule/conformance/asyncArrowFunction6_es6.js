//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncArrowFunction6_es6.ts] ////

//// [asyncArrowFunction6_es6.ts]
var foo = async (a = await): Promise<void> => {
}

//// [asyncArrowFunction6_es6.js]
var foo = async (a = await ) => {
};
