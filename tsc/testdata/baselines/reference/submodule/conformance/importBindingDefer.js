//// [tests/cases/conformance/importDefer/importBindingDefer.ts] ////

//// [a.ts]
export default 2;

//// [b.ts]
import defer from "./a.js";


//// [a.js]
export default 2;
//// [b.js]
export {};
