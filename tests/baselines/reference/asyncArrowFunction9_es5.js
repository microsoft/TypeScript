//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction9_es5.ts] ////

//// [asyncArrowFunction9_es5.ts]
var foo = async (a = await => await): Promise<void> => {
}

//// [asyncArrowFunction9_es5.js]
var foo = async(a = function (await) { return await; }), Promise;
;
{
}
