//// [circularTypeofWithVarOrFunc.ts]
type typeAlias1 = typeof varOfAliasedType1;
var varOfAliasedType1: typeAlias1;

var varOfAliasedType2: typeAlias2;
type typeAlias2 = typeof varOfAliasedType2;

function func(): typeAlias3 { return null; }
var varOfAliasedType3 = func();
type typeAlias3 = typeof varOfAliasedType3;


//// [circularTypeofWithVarOrFunc.js]
var varOfAliasedType1;
var varOfAliasedType2;
function func() { return null; }
var varOfAliasedType3 = func();
