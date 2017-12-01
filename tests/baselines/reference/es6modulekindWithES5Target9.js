//// [es6modulekindWithES5Target9.ts]
import d from "mod";

import {a} from "mod";

import * as M from "mod";

export {a};

export {M};

export {d};

export * from "mod";

export {b} from "mod"

export default d;


//// [es6modulekindWithES5Target9.js]
import d from "mod";
import { a } from "mod";
import * as M from "mod";
export { a };
export { M };
export { d };
export * from "mod";
export { b } from "mod";
export default d;
