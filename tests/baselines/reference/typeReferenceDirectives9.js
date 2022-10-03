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
exports.__esModule = true;
exports.Cls = void 0;
var Cls = /** @class */ (function () {
    function Cls() {
    }
    return Cls;
}());
exports.Cls = Cls;
//// [mod1.js]
"use strict";
/// <reference types="lib" />
exports.__esModule = true;
var main_1 = require("./main");
main_1.Cls.prototype.foo = function () { return undefined; };
//// [mod2.js]
"use strict";
exports.__esModule = true;
exports.bar = exports.foo = exports.cls = void 0;
var main_1 = require("./main");
require("./mod1");
exports.cls = main_1.Cls;
exports.foo = new main_1.Cls().foo();
exports.bar = main_1.Cls.bar();


//// [main.d.ts]
export declare class Cls {
    x: any;
}
//// [mod1.d.ts]
/// <reference types="lib" />
declare module "./main" {
    interface Cls {
        foo(): Lib;
    }
    namespace Cls {
        function bar(): Lib;
    }
}
export {};
//// [mod2.d.ts]
/// <reference types="lib" />
import { Cls } from "./main";
import "./mod1";
export declare const cls: typeof Cls;
export declare const foo: Lib;
export declare const bar: Lib;
