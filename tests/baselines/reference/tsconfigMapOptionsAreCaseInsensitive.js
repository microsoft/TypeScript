//// [tests/cases/compiler/tsconfigMapOptionsAreCaseInsensitive.ts] ////

//// [other.ts]
export default 42;

//// [index.ts]
import Answer from "./other.js";
const x = 10 + Answer;
export {
    x
};

//// [other.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = 42;
});
//// [index.js]
define(["require", "exports", "./other.js"], function (require, exports, other_js_1) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    var x = 10 + other_js_1["default"];
    exports.x = x;
});
