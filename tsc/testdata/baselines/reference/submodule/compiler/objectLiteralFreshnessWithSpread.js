//// [tests/cases/compiler/objectLiteralFreshnessWithSpread.ts] ////

//// [objectLiteralFreshnessWithSpread.ts]
let x = { b: 1, extra: 2 }
let xx: { a, b }  = { a: 1, ...x, z: 3 } // error for 'z', no error for 'extra'


//// [objectLiteralFreshnessWithSpread.js]
let x = { b: 1, extra: 2 };
let xx = { a: 1, ...x, z: 3 }; // error for 'z', no error for 'extra'
