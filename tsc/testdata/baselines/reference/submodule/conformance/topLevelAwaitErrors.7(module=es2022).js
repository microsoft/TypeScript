//// [tests/cases/conformance/externalModules/topLevelAwaitErrors.7.ts] ////

//// [index.ts]
// await disallowed in namespace import
import * as await from "./other";

//// [other.ts]
declare const _await: any;
export { _await as await };


//// [other.js]
export { _await as await };
//// [index.js]
export {};
