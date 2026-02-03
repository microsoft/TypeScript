//// [tests/cases/conformance/constEnums/importElisionConstEnumMerge1.ts] ////

//// [enum.ts]
export const enum Enum {
  One = 1,
}

//// [merge.ts]
import { Enum } from "./enum";
namespace Enum {
  export type Foo = number;
}
export { Enum };

//// [index.ts]
import { Enum } from "./merge";
Enum.One;


//// [enum.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [merge.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = require("./merge");
1 /* Enum.One */;
