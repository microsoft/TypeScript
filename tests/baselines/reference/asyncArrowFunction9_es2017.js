//// [tests/cases/conformance/async/es2017/asyncArrowFunction/asyncArrowFunction9_es2017.ts] ////

//// [asyncArrowFunction9_es2017.ts]
var foo = async (a = await => await): Promise<void> => {
}

//// [asyncArrowFunction9_es2017.js]
var foo = async(a = await => await), Promise;
;
{
}
