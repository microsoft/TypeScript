//// [tests/cases/compiler/incompleteKeyofType.ts] ////

//// [incompleteKeyofType.ts]
// Incomplete keyof operator should report syntax error
const x: keyof = { a: 1 };

// Incomplete readonly operator should report syntax error  
const y: readonly = [1, 2, 3];

// Incomplete unique operator should report syntax error
const z: unique = Symbol();


//// [incompleteKeyofType.js]
"use strict";
// Incomplete keyof operator should report syntax error
var x = { a: 1 };
// Incomplete readonly operator should report syntax error  
var y = [1, 2, 3];
// Incomplete unique operator should report syntax error
var z = Symbol();
