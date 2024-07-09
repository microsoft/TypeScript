//// [tests/cases/conformance/expressions/asOperator/asOperator1.ts] ////

//// [asOperator1.ts]
var as = 43;
var x = undefined as number;
var y = (null as string).length;
var z = Date as any as string;

// Should parse as a union type, not a bitwise 'or' of (32 as number) and 'string'
var j = 32 as number|string;
j = '';


//// [asOperator1.js]
var as = 43;
var x = undefined;
var y = null.length;
var z = Date;
// Should parse as a union type, not a bitwise 'or' of (32 as number) and 'string'
var j = 32;
j = '';
