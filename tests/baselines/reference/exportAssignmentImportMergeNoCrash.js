//// [tests/cases/compiler/exportAssignmentImportMergeNoCrash.ts] ////

//// [assignment.ts]
export default {
    foo: 12
};

//// [user.ts]
import Obj from "./assignment";

export const Obj = void Obj;


//// [assignment.js]
"use strict";
exports.__esModule = true;
exports["default"] = {
    foo: 12
};
//// [user.js]
"use strict";
exports.__esModule = true;
exports.Obj = void 0;
var assignment_1 = require("./assignment");
exports.Obj = void exports.Obj;
