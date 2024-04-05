//// [tests/cases/compiler/genericFunctionSpecializations1.ts] ////

//// [genericFunctionSpecializations1.ts]
function foo3<T>(test: string); // error
function foo3<T>(test: T) { }

function foo4<T>(test: string); // valid
function foo4<T extends String>(test: T) { }

//// [genericFunctionSpecializations1.js]
function foo3(test) { }
function foo4(test) { }
