//// [tests/cases/conformance/types/specifyingTypes/typeQueries/circularTypeofWithVarOrFunc.ts] ////

//// [circularTypeofWithVarOrFunc.ts]
type typeAlias1 = typeof varOfAliasedType1;
var varOfAliasedType1: typeAlias1;

var varOfAliasedType2: typeAlias2;
type typeAlias2 = typeof varOfAliasedType2;

function func(): typeAlias3 { return null; }
var varOfAliasedType3 = func();
type typeAlias3 = typeof varOfAliasedType3;

// Repro from #26104

interface Input {
  a: number;
  b: number;
}

type R = ReturnType<typeof mul>;
function mul(input: Input): R {
  return input.a * input.b;
}

// Repro from #26104

type R2 = ReturnType<typeof f>;
function f(): R2 { return 0; }


//// [circularTypeofWithVarOrFunc.js]
var varOfAliasedType1;
var varOfAliasedType2;
function func() { return null; }
var varOfAliasedType3 = func();
function mul(input) {
    return input.a * input.b;
}
function f() { return 0; }
