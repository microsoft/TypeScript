//// [tests/cases/conformance/externalModules/topLevelAwaitErrors.9.ts] ////

//// [index.ts]
// await disallowed in un-alised named import
import { await } from "./other";

//// [other.ts]
declare const _await: any;
export { _await as await };


//// [other.js]
export { _await as await };
//// [index.js]
export {};
