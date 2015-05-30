//// [asOperator1.ts]
var as = 43;
var x = undefined as number;
var y = (null as string).length;
var z = Date as any as string;


//// [asOperator1.js]
var as = 43;
var x = undefined;
var y = null.length;
var z = Date;
