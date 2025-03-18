//// [tests/cases/compiler/typeReferenceDirectives9.ts] ////

//// [index.d.ts]
interface Lib { x }

//// [main.ts]
export class Cls {
    x
}

//// [mod1.ts]
/// <reference types="lib" />

import {Cls} from "./main";
Cls.prototype.foo = function() { return undefined; }

declare module "./main" {
    interface Cls {
        foo(): Lib;
    }
    namespace Cls {
        function bar(): Lib;
    }
}

//// [mod2.ts]
import { Cls } from "./main";
import "./mod1";

export const cls = Cls;
export const foo = new Cls().foo();
export const bar = Cls.bar();

//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cls = void 0;
class Cls {
    x;
}
exports.Cls = Cls;
//// [mod1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
main_1.Cls.prototype.foo = function () { return undefined; };
//// [mod2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = exports.foo = exports.cls = void 0;
const main_1 = require("./main");
require("./mod1");
exports.cls = main_1.Cls;
exports.foo = new main_1.Cls().foo();
exports.bar = main_1.Cls.bar();
