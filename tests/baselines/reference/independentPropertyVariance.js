//// [independentPropertyVariance.ts]
// Verify that properties can vary idependently in comparable relationship

declare const x: { a: 1, b: string };
declare const y: { a: number, b: 'a' };

x === y;


//// [independentPropertyVariance.js]
"use strict";
// Verify that properties can vary idependently in comparable relationship
x === y;
