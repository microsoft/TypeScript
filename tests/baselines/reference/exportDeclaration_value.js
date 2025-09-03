//// [tests/cases/conformance/externalModules/typeOnly/exportDeclaration_value.ts] ////

//// [a.ts]
const A = {};
export type { A };
export const AA = {};

//// [b.ts]
export type { AA } from './a';


//// [a.js]
const A = {};
export const AA = {};
//// [b.js]
export {};
