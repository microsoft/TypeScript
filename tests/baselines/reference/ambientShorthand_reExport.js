//// [tests/cases/conformance/ambient/ambientShorthand_reExport.ts] ////

//// [declarations.d.ts]
declare module "jquery";

//// [reExportX.ts]
export {x} from "jquery";

//// [reExportAll.ts]
export * from "jquery";

//// [reExportUser.ts]
import {x} from "./reExportX";
import * as $ from "./reExportAll";
// '$' is not callable, it is an object.
x($);


//// [reExportX.js]
export { x } from "jquery";
//// [reExportAll.js]
export * from "jquery";
//// [reExportUser.js]
import { x } from "./reExportX";
import * as $ from "./reExportAll";
// '$' is not callable, it is an object.
x($);
