//// [tests/cases/compiler/arrayLiteralInNonVarArgParameter.ts] ////

//// [arrayLiteralInNonVarArgParameter.ts]
function panic(val: string[], ...opt: string[]) { }

panic([], 'one', 'two');


//// [arrayLiteralInNonVarArgParameter.js]
function panic(val, ...opt) { }
panic([], 'one', 'two');
