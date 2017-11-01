//// [tests/cases/compiler/es6ImportNameSpaceImport.ts] ////

//// [es6ImportNameSpaceImport_0.ts]
export var a = 10;

//// [es6ImportNameSpaceImport_1.ts]
import * as nameSpaceBinding from "./es6ImportNameSpaceImport_0";
var x = nameSpaceBinding.a;
import * as nameSpaceBinding2 from "./es6ImportNameSpaceImport_0"; // elide this


//// [es6ImportNameSpaceImport_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = 10;
//// [es6ImportNameSpaceImport_1.js]
"use strict";
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const nameSpaceBinding = __importStar(require("./es6ImportNameSpaceImport_0"));
var x = nameSpaceBinding.a;


//// [es6ImportNameSpaceImport_0.d.ts]
export declare var a: number;
//// [es6ImportNameSpaceImport_1.d.ts]
