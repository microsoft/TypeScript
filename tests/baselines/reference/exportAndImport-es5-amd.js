//// [tests/cases/conformance/es6/modules/exportAndImport-es5-amd.ts] ////

//// [m1.ts]
export default function f1() {
}

//// [m2.ts]
import f1 from "./m1";
export default function f2() {
    f1();
}


//// [m1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = f1;
    function f1() {
    }
});
//// [m2.js]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./m1"], function (require, exports, m1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = f2;
    m1_1 = __importDefault(m1_1);
    function f2() {
        (0, m1_1.default)();
    }
});
