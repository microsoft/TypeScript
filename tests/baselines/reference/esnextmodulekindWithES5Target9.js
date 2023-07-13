//// [tests/cases/conformance/externalModules/esnext/esnextmodulekindWithES5Target9.ts] ////

//// [esnextmodulekindWithES5Target9.ts]
import d from "mod";

import {a} from "mod";

import * as M from "mod";

export {a};

export {M};

export {d};

export * from "mod";

export {b} from "mod"

export default d;


//// [esnextmodulekindWithES5Target9.js]
import d from "mod";
import { a } from "mod";
import * as M from "mod";
export { a };
export { M };
export { d };
export * from "mod";
export { b } from "mod";
export default d;
