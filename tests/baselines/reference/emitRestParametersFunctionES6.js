//// [emitRestParametersFunctionES6.ts]
function bar(...rest) { }
function foo(x: number, y: string, ...rest) { }

//// [emitRestParametersFunctionES6.js]
function bar(...rest) { }
function foo(x, y, ...rest) { }
