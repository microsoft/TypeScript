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
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
path_1.default.resolve("", "../");
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo2 = void 0;
var tslib_1 = require("tslib");
var path = tslib_1.__importStar(require("path"));
path.resolve("", "../");
var Foo2 = /** @class */ (function () {
    function Foo2() {
    }
    return Foo2;
}());
exports.Foo2 = Foo2;
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo3 = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
(0, path_1.default)("", "../");
var Foo3 = /** @class */ (function () {
    function Foo3() {
    }
    return Foo3;
}());
exports.Foo3 = Foo3;
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importStar(require("path"));
Object.defineProperty(exports, "Bar", { enumerable: true, get: function () { return path_1.Bar; } });
(0, path_1.default)("", "../");
