//// [tests/cases/compiler/moduleSameValueDuplicateExportedBindings2.ts] ////

//// [a.ts]
export * from "./b";
export * from "./c";

//// [b.ts]
export {Animals} from "./c";

//// [c.ts]
export enum Animals {
	Cat,
	Dog
};

//// [c.js]
"use strict";
exports.__esModule = true;
var Animals;
(function (Animals) {
    Animals[Animals["Cat"] = 0] = "Cat";
    Animals[Animals["Dog"] = 1] = "Dog";
})(Animals = exports.Animals || (exports.Animals = {}));
;
//// [b.js]
"use strict";
exports.__esModule = true;
var c_1 = require("./c");
exports.Animals = c_1.Animals;
//// [a.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k) {
    Object.defineProperty(o, k, {
        enumerable: true,
        get: function() { return m[k]; }
    });
}) : (function(o, m, k) {
    o[k] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
exports.__esModule = true;
__exportStar(require("./b"), exports);
__exportStar(require("./c"), exports);
