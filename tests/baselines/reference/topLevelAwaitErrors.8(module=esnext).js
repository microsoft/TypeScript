//// [tests/cases/conformance/externalModules/topLevelAwaitErrors.8.ts] ////

//// [index.ts]
// await disallowed in default import
import await from "./other";

//// [other.ts]
declare const _await: any;
export default _await;


//// [other.js]
export default _await;
//// [index.js]
export {};
