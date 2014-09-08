//// [arrayLiteralInNonVarArgParameter.ts]
function panic(val: string[], ...opt: string[]) { }

panic([], 'one', 'two');


//// [arrayLiteralInNonVarArgParameter.js]
function panic(val) {
}
panic([], 'one', 'two');
