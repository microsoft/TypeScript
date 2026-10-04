//// [tests/cases/conformance/importDefer/importDeferFromInvalid.ts] ////

//// [a.ts]
export default 2;

//// [b.ts]
import defer from from "./a.js";


//// [a.js]
export default 2;
//// [b.js]
export {};
