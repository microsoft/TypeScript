//// [tests/cases/conformance/externalModules/typeOnly/extendsClause.ts] ////

//// [types.ts]
export interface I {}
export class C {}

//// [ns.ts]
import type * as types from './types';
export { types };

//// [index.ts]
import { types } from './ns';
import type { C, I } from './types';

interface Q extends C {}
interface R extends I {}
interface S extends types.C {}
interface T extends types.I {}

class U extends C {} // Error
class V extends types.C {} // Error


//// [types.js]
export class C {
}
//// [ns.js]
export {};
//// [index.js]
class U extends C {
} // Error
class V extends types.C {
} // Error
export {};
