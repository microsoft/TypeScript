//// [tests/cases/conformance/es6/modules/exportsAndImports4-amd.ts] ////

//// [t1.ts]
export default "hello";

//// [t2.ts]
import a = require("./t1");
a.default;
import b from "./t1";
b;
import * as c from "./t1";
c.default;
import { default as d } from "./t1";
d;
import e1, * as e2 from "./t1";
e1;
e2.default;
import f1, { default as f2 } from "./t1";
f1;
f2;
import "./t1";

//// [t3.ts]
import a = require("./t1");
a.default;
import b from "./t1";
b;
import * as c from "./t1";
c.default;
import { default as d } from "./t1";
d;
import e1, * as e2 from "./t1";
e1;
e2.default;
import f1, { default as f2 } from "./t1";
f1;
f2;
export { a, b, c, d, e1, e2, f1, f2 };


//// [t1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "hello";
});
//// [t3.js]
define(["require", "exports", "./t1", "./t1", "./t1", "./t1", "./t1", "./t1"], function (require, exports, a, t1_1, c, t1_2, t1_3, t1_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.f2 = exports.f1 = exports.e2 = exports.e1 = exports.d = exports.c = exports.b = exports.a = void 0;
    exports.a = a;
    a.default;
    exports.b = t1_1.default;
    t1_1.default;
    exports.c = c;
    c.default;
    Object.defineProperty(exports, "d", { enumerable: true, get: function () { return t1_2.default; } });
    t1_2.default;
    var e2 = t1_3;
    exports.e1 = t1_3.default;
    exports.e2 = e2;
    t1_3.default;
    e2.default;
    exports.f1 = t1_4.default;
    Object.defineProperty(exports, "f2", { enumerable: true, get: function () { return t1_4.default; } });
    t1_4.default;
    t1_4.default;
});
