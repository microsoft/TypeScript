//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace11.ts] ////

//// [main.ts]
import * as intermediate from './intermediate'
const ghost: intermediate.Ghost = new intermediate.Ghost()

//// [intermediate.ts]
export type * from './ghost'

//// [ghost.ts]
export class Ghost {}

//// [ghost.js]
export class Ghost {
}
//// [intermediate.js]
export {};
//// [main.js]
import * as intermediate from './intermediate';
const ghost = new intermediate.Ghost();
