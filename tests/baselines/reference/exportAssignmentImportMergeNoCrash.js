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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    foo: 12
};
//// [user.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obj = void 0;
const assignment_1 = __importDefault(require("./assignment"));
exports.Obj = void exports.Obj;
