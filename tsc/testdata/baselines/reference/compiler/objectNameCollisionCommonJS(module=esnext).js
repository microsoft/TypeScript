//// [tests/cases/compiler/objectNameCollisionCommonJS.ts] ////

//// [objectNameCollisionCommonJS.ts]
let Object = 0;
export const x = 1;


//// [objectNameCollisionCommonJS.js]
let Object = 0;
export const x = 1;
