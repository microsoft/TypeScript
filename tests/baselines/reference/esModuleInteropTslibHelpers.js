//// [tests/cases/compiler/esModuleInteropTslibHelpers.ts] ////

//// [refs.d.ts]
declare module "path";
//// [file.ts]
import path from "path";
path.resolve("", "../");
export class Foo { }
//// [file2.ts]
import * as path from "path";
path.resolve("", "../");
export class Foo2 { }
//// [file3.ts]
import {default as resolve} from "path";
resolve("", "../");
export class Foo3 { }
//// [file4.ts]
import {Bar, default as resolve} from "path";
resolve("", "../");
export { Bar }

//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
path_1.default.resolve("", "../");
class Foo {
}
exports.Foo = Foo;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo2 = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
path.resolve("", "../");
class Foo2 {
}
exports.Foo2 = Foo2;
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo3 = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
(0, path_1.default)("", "../");
class Foo3 {
}
exports.Foo3 = Foo3;
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importStar(require("path"));
Object.defineProperty(exports, "Bar", { enumerable: true, get: function () { return path_1.Bar; } });
(0, path_1.default)("", "../");
