//// [emitRestParametersFunction.ts]
function bar(...rest) { }
function foo(x: number, y: string, ...rest) { }

//// [emitRestParametersFunction.js]
function bar() { }
function foo(x, y) { }
