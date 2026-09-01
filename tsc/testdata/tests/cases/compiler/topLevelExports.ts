// @target: es2015
// @strict: false
//@module: commonjs
export var foo = 3;

function log(n:number) { return n;}

void log(foo).toString();