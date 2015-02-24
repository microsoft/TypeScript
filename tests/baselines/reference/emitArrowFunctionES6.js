//// [emitArrowFunctionES6.ts]
var f1 = () => { }
var f2 = (x: string, y: string) => { }
var f3 = (x: string, y: number, ...rest) => { }
var f4 = (x: string, y: number, z=10) => { }
function foo(func: () => boolean) { }
foo(() => true);
foo(() => { return false; });


//// [emitArrowFunctionES6.js]
var f1 = () => { };
var f2 = (x, y) => { };
var f3 = (x, y, ...rest) => { };
var f4 = (x, y, z = 10) => { };
function foo(func) { }
foo(() => true);
foo(() => { return false; });
