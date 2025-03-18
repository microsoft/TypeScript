//// [tests/cases/compiler/systemModule15.ts] ////

//// [file1.ts]
import * as moduleB from "./file2"

declare function use(v: any): void;

use(moduleB.value);
use(moduleB.moduleC);
use(moduleB.moduleCStar);

//// [file2.ts]
import * as moduleCStar from "./file3"
import {value2} from "./file4"
import moduleC from "./file3"
import {value} from "./file3"

export {
    moduleCStar,
    moduleC,
    value
}

//// [file3.ts]
export var value = "youpi";
export default value;

//// [file4.ts]
export var value2 = "v";

//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value = void 0;
exports.value = "youpi";
exports.default = exports.value;
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value2 = void 0;
exports.value2 = "v";
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value = exports.moduleC = exports.moduleCStar = void 0;
const moduleCStar = require("./file3");
exports.moduleCStar = moduleCStar;
const file3_1 = require("./file3");
exports.moduleC = file3_1.default;
const file3_2 = require("./file3");
Object.defineProperty(exports, "value", { enumerable: true, get: function () { return file3_2.value; } });
//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleB = require("./file2");
use(moduleB.value);
use(moduleB.moduleC);
use(moduleB.moduleCStar);
